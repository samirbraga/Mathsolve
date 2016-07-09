var tutorial = function(){
  var tutorialBox = $('<div class="tutorialBox"></div>');
  var content = $('<div class="content"></div>');
  var title = $('<div class="title"></div>');
  var instruction = $('<div class="tutorial-instruction"></div>');
  var prev = $('<button class="step tutorial-prev">Anterior</button>');
  var next = $('<button class="step tutorial-next">Próximo</button>');
  var close = $('<button class="close">x</button>');
  var stepsCount = $('<div class="stepsCount"></div>');
  tutorialBox.appendTo('body');
  content.appendTo(tutorialBox);
  title.appendTo(content);
  title.append('<h1><span></span><br><div class="title-line1"></div><div class="title-line2"></div></h1>');
  instruction.appendTo(content);
  prev.appendTo(content);
  next.appendTo(content);
  close.appendTo(content);
  stepsCount.appendTo(content);

  tutorialBox.draggable({
    handle: '.title'
  })
  var titles = [
    'Preenchendo a matriz', 
    'Adicionando células', 
    'Adicionando linhas', 
    'Deletando células', 
    'Menu de opções', 
    'Conhecendo as opções', 
    'Menu - Calcular', 
    'Menu - Determinante', 
    'Copiar & Colar',
    'Copiar & Colar', 
    'Executando operações', 
    'Executando operações', 
    'Calculando', 
    'Finalizando', 
  ]
  var messages = [
    'Primeiramente clique na caixa de texto ao lado esquerdo e escreva um número.',
    'Após preencher uma célula, para que se adicione outra à mesma linha, basta pressionar a <b>barra de espaço</b>.',
    'Agora que já temos uma linha, para criar outra, basta pressionar a tecla <b>Enter</b>. Note que a nova linha possui o mesmo número de células da anterior.',
    'Para deletar uma célula, remova todo o seu conteúdo e pressione novamente a tecla <b>backspace. Caso apague alguma célula crie-a novamente para continuar-mos o tutorial</b>',
    'Possuímos um menu de opções bem completo para cada matriz, para acessá-lo basta clicar com o <b>botão direito</b> do mouse. Por favor, faça isso.',
    'Com o menu aberto, note que há várias opções divididas em <b>Calcular</b>, <b>Conveter em</b> e as demais.',
    'As opções da área <b>Calcular</b> irão executar funções já conhecidas nas matrizes, caso não conheça alguma, bastar clica no ponto de interrogação ao lado dela.',
    'O Determinante da matriz, por exemplo, é calculado ao clicar nessa opção. O resultado aparecerá na parte superior da página assim como as outras regras e soluções.',
    'No menu de qualquer matriz, também exite a opção <b>copiar</b>. Preencha a matriz ao lado esquerdo e ao acessar seu menu, clique em copiar.',
    'Agora, acesse o menu da matriz a esquerda e <b>após deixá-la com o mesmo número de linhas e colunas da matriz que você acabou de copiar</b>, clique em <b>colar<b>.',
    'Para realizar operações com as matrizes, primeiramente, deve-se preenchê-las da maneira como já foi mostrado. Faça isso.',
    'Posteriormente, deve-se escolher uma operação no botão de escolha ao lado. Por padrão este está em <b>soma</b>, deixe-o assim.',
    'Clique no botão <b>Calcular</b>.',
    'Neste momento, você já está pronto para manusear nossa ferramenta corretamente. Esperamos que faça um bom uso!'
  ]

  var steps = ""; 
  titles.forEach(function(el, i){
    steps+= '<div class="steps step'+(+i+1)+'">'+(+i+1)+'</div>';
  })
  stepsCount.append(steps);
  var matrix1 = $('.matrix:eq(0)');
  var matrix2 = $('.matrix:eq(1)');
  var operator = $('.operator');
  var calculate = $('.solve');
  var animatePass = function(call){
    content.stop().animate({
      left: '-100%'
    }, 150, call);
    setTimeout(function(){
      content.css('left', '100%');
      content.stop().animate({
        left: '0'
      }, 150);
    }, 300);
  }
  var animateBack = function(call){
    content.stop().animate({
      left: '100%'
    }, 150, call);
    setTimeout(function(){
      content.css('left', '-100%');
      content.stop().animate({
        left: '0'
      }, 150);
    }, 300);
  }
  var animateStep = function(Title, Message, Element, prevStep, nextStep, ind){
    title.find('span').html(Title)
    instruction.html(Message);
    var x = -10, y = 0;
    function move(){
      if(Element == matrix2){
        x = (Element.width()+tutorialBox.width() + 10);
      }else if(Element == operator){
        x = 610;
      }else if(Element == calculate){
        y = (+tutorialBox.height()+10);
        x = -(Element.width()/2)
      }
      tutorialBox.stop().animate({
        'left': +Element.offset().left +matrix1.width() -x,
        'top': +Element.offset().top-y
      })
    }
    $('.tutorialBox .steps').css({
      'border': '0'
    }).click(function(){
      if((+$(this).index('.steps')+1) > ind){
        eval('var execute = function(){ animatePass(step'+(+$(this).index('.steps')+1)+')}');
      }else{
        eval('var execute = function(){ animateBack(step'+(+$(this).index('.steps')+1)+')}');
      }
      execute();
    });
    $('.tutorialBox .step'+ind).css({
      'background': '#255b55',
      'border': '1px solid #333'
    })
    if (prevStep == "none") {
      prev.css('display','none');
    }else{
      prev.css('display','inline-block');
      prev.click(function(){animateBack(prevStep)});
    }
    if (nextStep == "none") {
      prev.css('display','none');
      next.html('Pronto!').click(function(){
        tutorialBox.stop().fadeOut(200);
        tutorialBox.stop().fadeOut(100);
      });
    }else{
      next.click(function(){animatePass(nextStep)});
    }
    move();
    $(window).on('resize', move);
    $('body, html').animate({
      scrollTop: $('.matrices').offset().top - 100
    }, 300)
  }
  var step1 = function(){
    animateStep(titles[0], messages[0], matrix1, "none", step2, 1);
  }
  var step2 = function(){
    animateStep(titles[1], messages[1], matrix1, step1, step3, 2);
  }
  var step3 = function(){
    animateStep(titles[2], messages[2], matrix1, step2, step4, 3);
  }
  var step4 = function(){
    animateStep(titles[3], messages[3], matrix1, step3, step5, 4);
  }
  var step5 = function(){
    animateStep(titles[4], messages[4], matrix1, step4, step6, 5);
  }
  var step6 = function(){
    animateStep(titles[5], messages[5], matrix1, step5, step7, 6);
  }
  var step7 = function(){
    animateStep(titles[6], messages[6], matrix1, step6, step8, 7);
  }
  var step8 = function(){
    animateStep(titles[7], messages[7], matrix1, step7, step9, 8);
  }
  var step9 = function(){
    animateStep(titles[8], messages[8], matrix1, step8, step10, 9);
  }
  var step10 = function(){
    animateStep(titles[9], messages[9], matrix2, step9, step11, 10);
  }
  var step11 = function(){
    animateStep(titles[10], messages[10], matrix2, step10, step12, 11);
  }
  var step12 = function(){
    animateStep(titles[11], messages[11], operator, step11, step13, 12);
  }
  var step13 = function(){
    animateStep(titles[12], messages[12], calculate, step12, step14, 13);
  }
  var step14 = function(){
    animateStep(titles[13], messages[13], matrix2, step13, 'none', 14);
  }
  step1();

  close.click(function(){
    tutorialBox.fadeOut(200);
  })
}