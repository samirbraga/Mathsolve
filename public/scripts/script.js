$(document).ready(function(){

// Add Matrix markers to this seems a brackets -> [ ]
$('.matrix').prepend('<div class="brackets-before"></div>');
$('.matrix').append('<div class="brackets-after"></div>');
$('#result').prepend('<div class="brackets-before"></div>');
$('#result').append('<div class="brackets-after"></div>');

$('.adsense').html('Aqui meu esforço se fará válido...');

var matrixWidth = $('.matrix').eq(0).width(); // Size of matrix

// Deselect all texts in page
function clearSelection() {
    if ( document.selection ) {
        document.selection.empty();
    } else if ( window.getSelection ) {
        window.getSelection().removeAllRanges();
    }
}

// Info about anything that ti will be showed in top of page
var alertInfo = function(text){
  $('.alert').fadeOut(200, function(){
    $('.alert').remove();
  });
  setTimeout(function(){
    var alert = $('<div class="alert"></div>');
    var message = $('<span class="alert-message"></span>');
    alert.appendTo('body');
    message.appendTo(alert);
    message.html(text)
    alert.animate({
      'top': '20px'
    })
    setTimeout(function(){
      alert.fadeOut();
    }, 5000)
  }, 300)
}

var deleteCount = 0; // count two keydowns to delete a input


$(document).on('mouseenter', '.cell', function(e) {
  var indexMatrix = $(this).closest('.matrix').index('.matrix'); // returns the index of matrix
  var indexRow = $(this).parent().index('.matrix:eq('+indexMatrix+') .row'); // return the index of row
  var indexCell = $(this).index('.matrix:eq('+indexMatrix+') .row:eq('+indexRow+') .cell'); // return the index of cell
  $(this).parent().find('.cell').addClass('showed'); // add class .showed to column and row of this.cell
  $(this).closest('.matrix').find('.row').each(function(i){
    $(this).children('.cell').each(function(i){
      if(i == indexCell){
        $(this).addClass('showed');
      }
    })
  })
})
$(document).on('mouseleave', '.cell', function(e) {
  $('.cell').removeClass('showed');
})
$(document).on('keyup', '.cell', function(e) {

  var matrix = $(this).closest('.matrix');
  var newCell = $('<input type="text" class="cell">');
  var newRow = $('<div class="row row' + (+matrix.children('.row').length + 1) + '"></div>');
  var width = this.value.length * 7 + 4;
  //
  /*matrix.children('.row').each(function(i){
    $(this).children('.cell').eq(index).css({
      width: width
    });
  })*/

  if (e.keyCode == 32) { // Add cell with SpaceBar
    newCell.insertAfter($(this)).focus();
  } else if (e.keyCode == 13) { // Add row with Enter
    newRow = newRow.insertAfter($(this).parent());
    $(this).parent().children('.cell').each(function(i) {
      newCell = $('<input type="text" class="cell">');
      newCell.appendTo(newRow).focus();
    })
  } else if (e.keyCode == 8 && this.value == "" && $(this).closest('.matrix').find('.cell').length > 1) { // Delete cell with backspace
    ++deleteCount;
    if (deleteCount > 1) {
      $('.cell').eq($(this).index('.cell') - 1).focus();
      if($(this).parent().children().length == 1){
          $(this).parent().remove();
      }
      $(this).remove();
      deleteCount = 0;
    }
  } else if (e.keyCode == 37) { // focus on left cell
    $('.cell').eq($(this).index('.cell') - 1).focus();
  } else if (e.keyCode == 39) { // focus on right cell
    $('.cell').eq(+$(this).index('.cell') + 1).focus();
  } else if (e.keyCode == 38) { // focus on top cell
    $('.cell').eq($(this).index('.cell') - $(this).parent().children().length).focus();
  } else if (e.keyCode == 40) { // focus on bottom cell
    $('.cell').eq(+$(this).index('.cell') + $(this).parent().children().length).focus();
  }
  // Change input text size by its length;
  
  if($(this).closest('.matrix').find('.row').length > $(this).parent().find('.cell').length){
    $(this).closest('.matrix').find('.cell').css({
      'width': (250/$(this).closest('.matrix').children('.row').length),
      'height': (250/$(this).closest('.matrix').children('.row').length),
      'font-size': '13pt'
    })
  }else{
    $(this).closest('.matrix').find('.cell').css({
      'width': (250/$(this).parent().children('.cell').length),
      'height': (250/$(this).parent().children('.cell').length),
      'font-size': '13pt'
    })
  }
})


var matrix = {
  'matrix0': [],
  'matrix1': []
};
var copied = [];


/*
$(document).on('dblclick', '.cell', function(e) {
  $(this).addClass('selected');
})*/
var tooltip;

$(document).on('mouseenter', '.matrix', function(e) {
  var self = $(this);
  var name = String.fromCharCode(+65 + self.index('.matrix'));
  tooltip = $('<div class="tooltip tooltip' + self.index('.matrix') + '"></div>');
  tooltip.appendTo($('body'));

  tooltip.html(name + "<sub>(" + self.children('.row').length  + " x " + self.children('.row').eq(0).children('.cell').length +")</sub>" );
  tooltip.css({
    position: 'absolute',
    background: '#000',
    color: '#fff',
    width: '100px',
    padding: '10px',
    display: 'none',
    fontSize: '12pt',
    textAlign: 'center',
    left: (self.offset().left + (self.width()/2)) -40,
    top: self.offset().top -40
  })
  tooltip.find('sup').css({
    fontSize: '8pt'
  })
  setTimeout(function(){
    tooltip.fadeIn(200);
  }, 600)
})
$(document).on('mouseleave', '.matrix', function(e) {
  $('.tooltip'+$(this).index('.matrix')).fadeOut(200);
  setTimeout(function(){
    $('.tooltip'+$(this).index('.matrix')).remove();
  }, 400)
})

$(document).on('contextmenu', '.matrix', function(e) {
  e.preventDefault();
  var self = $(this);

  var anyEmpty = false;
  self.find('.cell').each(function(i){
    if(/\w/.test($(this).val() ) == false) {
        anyEmpty = true;
    }
  })
  var resizeMatrix = function(){
    var arr = []; //populate the length of children into this array.
    self.children('.row').map(function (i) {
        arr[i] = $(this).children().length;
    });
    var maxValue = Math.max.apply(Math, arr);
    if(self.find('.row').length > maxValue){
      self.find('.cell').css({
        'width': (250/self.children('.row').length),
        'height': (250/self.children('.row').length)
      })
    }else{
      self.find('.cell').css({
        'width': (250/maxValue),
        'height': (250/maxValue)
      })
    }
  }
  var loadMatrix = function(){
    matrix['matrix' + self.index('.matrix')] = [];
    self.children('.row').each(function(ind) {
      matrix['matrix' + self.index('.matrix')][ind] = [];
      $(this).children('.cell').each(function(index) {
        matrix['matrix' + self.index('.matrix')][ind][index] = this.value.replace(/ /g, '');
      });
    });
  } 
  var det = function() {
    if(anyEmpty){
      alertInfo('Preencha todas as células corretamente!');
    }else{
      if(self.children('.row').length == self.children('.row').eq(0).children('.cell').length){
        var result;
        loadMatrix();
        if (matrix['matrix' + self.index('.matrix')][0].length == 1 && matrix['matrix' + self.index('.matrix')].length == 1) {
          result = matrix['matrix' + self.index('.matrix')][0][0];
        } else if (matrix['matrix' + self.index('.matrix')][0].length == 2 && matrix['matrix' + self.index('.matrix')].length == 2) {
          result = (matrix['matrix' + self.index('.matrix')][0][0] * matrix['matrix' + self.index('.matrix')][1][1]) - (matrix['matrix' + self.index('.matrix')][0][1] * matrix['matrix' + self.index('.matrix')][1][0]);
        } else if (matrix['matrix' + self.index('.matrix')][0].length == 3 && matrix['matrix' + self.index('.matrix')].length == 3) {
          var d1 = 0, d2 = 0;
          var determinant = [];
          determinant = matrix['matrix' + self.index('.matrix')];
          determinant[0].push(determinant[0][0]);
          determinant[0].push(determinant[0][1]);
          determinant[1].push(determinant[1][0]);
          determinant[1].push(determinant[1][1]);
          determinant[2].push(determinant[2][0]);
          determinant[2].push(determinant[2][1]);
          d1 = +(determinant[0][0]*determinant[1][1]*determinant[2][2])
               +(determinant[0][1]*determinant[1][2]*determinant[2][3])
               +(determinant[0][2]*determinant[1][3]*determinant[2][4]);

          d2 = +(determinant[0][2]*determinant[1][1]*determinant[2][0])
               +(determinant[0][3]*determinant[1][2]*determinant[2][1])
               +(determinant[0][4]*determinant[1][3]*determinant[2][2]);

          result = d1-d2;
        }else{

        }
        alertInfo('O <i>Determinante</i> da respectiva matriz é: <b>' +result+'</b>');

      }else{
        
        alertInfo('Para calcular o <i>Determinante</i> de uma matriz, esta deve ser quadrada.');
      }
    }
    
  }

  var trace = function(){
    if(anyEmpty){
      alertInfo('Preencha todas as células corretamente!');
    }else{
      var result = 0;
      self.children('.row').each(function(ind) {
        $(this).children('.cell').each(function(index) {
          if(ind == index){
            result += parseFloat($(this).val())
          }
        });
      });
      alertInfo('O <i>Traço</i> da respectiva matriz é: <b>' +result+'</b>');
    }
  }
  var copy = function(){
    if(anyEmpty){
      alertInfo('Preencha todas as células corretamente!');
    }else{
      loadMatrix();
      copied = matrix['matrix' + self.index('.matrix')];
      copied.forEach(function(el, i) {
        copied[i] = el.join(" ");
      });
      copied = copied.join('\n');
      $('.toCopy').remove();
      var toCopy = $('<textarea class="toCopy" value=""></textarea>');
      toCopy.appendTo($('body'));
      toCopy.css({
        position: 'fixed',
        left: '-100%'
      })
      clearSelection();
      toCopy.val(copied);
      $(this).click(function(){
        toCopy.select();
        try {
          document.execCommand('copy');
        }
        catch (err) {
          alert('please press Ctrl/Cmd+C to copy');
        }
      })
    }
  };
  var paste = function(){
    copied = copied.split(/\n/);
    copied.forEach( function(el, i) {
      copied[i] = el.split(" ");
    });
    self.children('.row').each(function(ind) {
      $(this).children('.cell').each(function(index) {
        $(this).val(copied[ind][index])
      });
    });
  }
  var nulled = function(){
    self.children('.row').each(function(ind) {
      $(this).children('.cell').each(function(index) {
        $(this).val('0')
      });
    });
  }
  var random = function(){
    self.children('.row').each(function(ind) {
      $(this).children('.cell').each(function(index) {
        $(this).val(Math.floor(Math.random()*10));
      });
    });
  }
  var transpose = function(){
    var transposed = [];
    loadMatrix();
    self.find('.row').remove();
    var row;
    var cell;
    matrix['matrix' + self.index('.matrix')][0].forEach(function(element, index){
      transposed[index] = [];
      row = $('<div class="row row'+index+'"></div>');
      row.appendTo(self);
      matrix['matrix' + self.index('.matrix')].forEach(function(el, i){
        cell = $('<input type="text" class="cell" >');
        cell.appendTo(row)
        transposed[index][i] = matrix['matrix' + self.index('.matrix')][i][index];
        cell.val(transposed[index][i]);
      });
    })
    resizeMatrix();
  }
  var id = function(){
    if(self.children('.row').length == self.children('.row').eq(0).children('.cell').length){
      self.children('.row').each(function(ind) {
        $(this).children('.cell').each(function(index) {
          $(this).val('0')
          if(ind == index){
            $(this).val('1')
          }
        });
      });
    }else{
      alertInfo('Para que uma matriz seja convertida em <i>identidade</i> esta deve ser quadrada.');
    }
  }
  var remove = function(){
    self.find('.selected').remove();
  }
  $('.contextMenu').remove();
  var menu =
    $('<div class="contextMenu"><ul><li><span class="marker calc">Calcular</span></li><li><span class="option det">Determinante</span><span class="doubt" >?</span></li><li><span class="option trace">Traço</span><span class="doubt" >?</span></li><li><span class="marker convert">Conveter em</span></li><li><span class="option null">Matriz nula</span></li><li><span class="option id">Matriz identidade</span></li><li><span class="option transpose">Matriz transposta</span></li><li><span class="option random">Matriz aleatória</span></li><li><span class="option oper copy">Copiar</span></li><li><span class="option oper paste">Colar</span></li><li><span class="option oper remove">Remover</span></li></ul> </div>');
  menu.appendTo('body');
  menu.on('contextmenu', function(e) {
    e.preventDefault();
  });
  menu.css({
    background: '#fff',
    padding: '3px 0',
    width: '300px',
    position: 'absolute',
    fontSize: '10pt',
    boxShadow: '0 0 2px 1px rgba(0,0,0,0.3)'
  })
  e = e || window.event;
  e = jQuery.event.fix(e);
  menu.css({
    left: e.pageX > $(document).width() - 300 ? $(document).width() - 300 : e.pageX,
    top: e.pageY > $(window).height() - menu.height() ? $(window).height() - menu.height() : e.pageY
  })

  if(copied.length == 0){
    menu.find('.paste').parent().addClass('disabled')
  }
  menu.children('ul').css({
    width: '100%',
    padding: '0',
    margin: '3px 0',
    cursor: 'pointer'
  })
  menu.find('li').css({
    'width': '100%',
    'padding': '2px 10px',
    'list-style': 'none',
    'font-family': "'Century Gothic', san-serif",
    'vertical-align': "middle",
    'height': '30px',
    'line-height': '25px',
    'text-align': 'left',
    'float': 'left',
  })
  menu.find('.marker').parent().css({
    'color': '#666'
  })
  menu.find('.option').parent().css({
    'padding': '2px 10px 2px 20px'
  }).hover(function(e) {
    $(this).css("background-color", e.type === "mouseenter" ? "#f1f2f3" : "#fff")
  })
  menu.find('.oper').parent().css({
    'padding': '2px 10px'
  })
  menu.find('.option').css({
      'display': 'inline-block',
      'vertical-align': "middle",
      'width': '80%',
      'list-style': 'none',
    'text-align': 'left',
  });
  menu.find('.doubt').css({
    'display': 'inline-block',
    'width': '25px',
    'height': '25px',
    'background': '#3c948b',
    'color': '#fff',
    'text-align': 'center',
    'float': 'right',
  }).hover(function(e) {
    $(this).css("background-color", e.type === "mouseenter" ? "#2c6d66" : "#3c948b")
  })
  menu.find('.disabled').css({
    'display': 'none'
  })
  menu.find('.remove').parent().css({
    'display': 'none'
  })
  if($('.selected').length > 0){
    menu.find('.remove').parent().css({
      'display': 'block'
    })
  }
  menu.find('.det').mousedown(det);
  menu.find('.trace').mousedown(trace);
  menu.find('.null').mousedown(nulled);
  menu.find('.id').mousedown(id);
  menu.find('.transpose').mousedown(transpose);
  menu.find('.random').mousedown(random);
  menu.find('.copy').mousedown(copy);
  menu.find('.paste').mousedown(paste);
  menu.find('.remove').mousedown(remove);
})
$(document).bind('click', function(e) {
  $('.contextMenu').remove();
})
$('body').not('.contextMenu').bind('contextmenu', function(e) {
  $('.contextMenu').remove();
})
var loadMatrices = function(){
  matrix.matrix0 = [];
  matrix.matrix1 = [];
  $('.matrix').each(function(i) {
    $(this).children('.row').each(function(ind) {
      matrix['matrix' + i][ind] = [];
      $(this).children('.cell').each(function(index) {
        matrix['matrix' + i][ind][index] = this.value;
      });
    });
  });
}

// function calculate matrix result
$('.solve').click(function() {
  var returned; // value returned in text to make a matrix
  var anyEmpty = false; // used to verify if the matrix have a empty cell
  function renderMatrix(matrixResult){
    var matrixRender = "";
    matrixResult.forEach(function(el, i) {
      matrixResult[i].forEach(function(element, index) {
        matrixRender += "<span>" + matrixResult[i][index] + "</span>";
      })
      matrixRender += "<br>";
    })
    $('.result').html('<div class="equation"></div>');
    $('.result .equation').prepend('<span>A ' + $('.operator option:selected').html() + ' B</span> <br>');
    $('.result').append('<div class="resultMatrix"></div><br>');
    $('.result .resultMatrix').prepend('<div class="brackets-before"></div>')
    .append(matrixRender)
    .append('<div class="brackets-after"></div>')
    .fadeIn(300, function(){
      $('.result, .result .resultMatrix').css('display', 'inline-block'),
      $('body, html').animate({
        scrollTop: $('.result').offset().top
      }, 300)
      $('hr').fadeIn();
    });
  }
  // Check if the matrix is filled correctly
  $('.cell').each(function(i){
    if(!(/\w/.test($(this).val()))){
        anyEmpty = true;
    }
  })
  if (anyEmpty){
    alertInfo('Preencha todas as células corretamente!');
  } else {
    loadMatrices();
    if ($('.matrix:eq(0)').find('.cell').length != $('.matrix:eq(1)').find('.cell').length || $('.matrix:eq(0)').children('.row').length !=$('.matrix:eq(1)').children('.row').length) {
      if ($('.operator').val() == "multiply" ) {
        var matrixA = matrix.matrix0;
        var matrixB = matrix.matrix1;
        $.post('/matriz',
        {
          matrixA: JSON.stringify(matrixA),
          matrixB: JSON.stringify(matrixB)
        },
        function(data){
          console.log('done')
        })
        $.get('/matriz/'+$('.operator').val(),
        function(data){
        })
      }else{
        alertInfo('Na <i>Soma</i> e na <i>Subtração</i> as matrizes devem possuir o <b>mesmo número de linhas e colunas<b>!');
      }
    }else{
      loadMatrices();
      $('.result, .result .resultMatrix').css('display', 'inline-block'),
      $('.result .equation').html('');
      $('.result .resultMatrix').html('<img src="http://www.arabianbusiness.com/skins/ab.main/gfx/loading_spinner.gif" style="width: 100px; height: 100px" align="center">');
      var matrixA = matrix.matrix0;
      var matrixB = matrix.matrix1;
      $.post('/matriz', {
          'matrixA': JSON.stringify(matrixA),
          'matrixB': JSON.stringify(matrixB)
        },
      function (data){
        $.get('/matriz/'+$('.operator').val(),
        function(data){
          renderMatrix(JSON.parse(data));
        })
      });
    }
  }
})

$('.welcome .welcome-content .skip').click(function(){
  $('.welcome').fadeOut();
})
$('.welcome .welcome-content .tutorial').click(function(){

  $('.welcome').fadeOut(300, tutorial);
})

})