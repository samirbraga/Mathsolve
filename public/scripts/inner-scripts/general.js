/* Follow the general functions for all pages */
/*
function prepareData(obj) {
  "use strict";
  if (!obj) obj = {};
  let data = Object.keys(obj).map(key => {
      let v = obj[key];
      let val = v instanceof Date ? v.getTime() / 1000 : v;
      return [key, val].join('=');
  }).join('&');
  return encodeURI(data);
}*/

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

// Create ContextMenu
var onContextMenu = function(json, elem){
  (function(e){
    var ww = $(window).width();
    var wh = $(window).height();
    $('.contextMenu').remove();
    e = e || window.event;
    e = jQuery.event.fix(e);
    var menu = $('<div class="contextMenu"></div>');
    menu.appendTo('body');
    var menuContent = "<ul>";
    json.forEach(function(el, i){
      switch (el.type){
        case "divider":
          menuContent += '<li><span class="marker ' + el.classes + '">'+el.title+'</span>';
          menuContent += '</li>';
          break;
        case "item":
          menuContent += '<li><span class="option ' + el.classes + '">'+el.title+'</span>';
          if(el.doubt){
            menuContent += '<span class="doubt" >?</span>';
          }
          if(el.subDivide){
            menuContent += '<span class="arrow" >></span>';
            menuContent += '<ul class="subDivider" style="display: none">';
            el.subDivide.forEach(function(item, index){
              menuContent += '<li><span class="option subDivide ' + item.classes + '">'+item.title+'</span>';
            })
            menuContent += '</ul>';
          }
          menuContent += '</li>';
          break;
        case "boolean":
          if(el.showed){
            menuContent += '<li><span class="option oper ' + el.classes + '">'+el.title+'</span>';
            if(el.doubt){
              menuContent += '<span class="doubt">?</span>';
            }
            menuContent += '</li>';
          }
          break;
      }
    })
    menuContent += "</ul>";
    menu.append(menuContent);
    
    menu.on('contextmenu', function(e) {
      e.preventDefault();
    });
    var left = e.pageX > ww-250 ? ww-250 : e.pageX;
    var top = e.pageY > wh-menu.outerHeight() ? wh-menu.outerHeight() : e.pageY;
    menu.css({
      background: '#fff',
      padding: '3px 0',
      width: '250px',
      position: 'absolute',
      fontSize: '10pt',
      boxShadow: '0 0 2px 1px rgba(0,0,0,0.3)',
      left: left,
      top: top,
      zIndex: 100
    });
    menu.find('*').css({
      fontSize: '10pt'
    });

    var subList;
    var ul = menu.children('ul');
    var subListLeft = $('.contextMenu').offset().left > ww-(menu.width()+ul.width()) ? -menu.width()+50 : '100%';
    json.forEach(function(el, i){
      if(el.subDivide){
        $('.'+el.classes).parent().bind('mouseenter', function(){
          subList = menu.find('.subDivider');
          subList
          .css({
            position: 'absolute',
            width: '200px',
            height: 'auto',
            left: subListLeft,
            top: $(this).offset().top-menu.offset().top,
            background: '#fff',
            zIndex: 80,
            padding: '3px 0',
            boxShadow: '0 0 2px 1px rgba(0,0,0,0.3)'
          })
          .delay(50)
          .fadeIn('fast');
        });
        $('.'+el.classes).parent().bind('mouseleave', function(){
          subList.fadeOut(50);
        })
        $('.'+el.classes).unbind('mousedown');
        el.subDivide.forEach(function(item, index){
          if(item.functions){
            $('.'+item.classes).bind('mousedown', item.functions);
          }
        });
      }else{
        if(el.functions){
          $('.'+el.classes).bind('mousedown', el.functions);
        }
      }
    })
    ul.css({
      width: '100%',
      padding: '0',
      margin: '3px 0',
      cursor: 'pointer'
    });
    menu.find('li').css({
      'width': '100%',
      'padding': '2px 10px',
      'list-style': 'none',
      'font-family': "'Century Gothic', san-serif",
      'vertical-align': "middle",
      'height': '27px',
      'line-height': '23px',
      'text-align': 'left',
      'float': 'left',
    });
    menu.find('.marker').parent().css({
      'color': '#666'
    });
    menu.find('.option').parent().css({
      'padding': '2px 10px 2px 20px'
    }).hover(function(e) {
      $(this).css("background-color", e.type === "mouseenter" ? "#f1f2f3" : "#fff")
    });
    menu.find('.oper').parent().css({
      'padding': '2px 10px'
    });
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
    });
    menu.find('.arrow').css({
      'display': 'inline-block',
      'color': '#3c948b',
      'text-align': 'right',
      'float': 'right',
    });
    menu.find('.disabled').css({
      'display': 'none'
    });
    menu.find('.remove').parent().css({
      'display': 'none'
    });
  })();
  $(document).bind('click resize', function(e) {
    $('.contextMenu').remove();
  });
  $('body').not('.contextMenu').bind('contextmenu', function(e) {
    $('.contextMenu').remove();
  });
}

// Deselect all texts in page
function clearSelection() {
  if ( document.selection ) {
      document.selection.empty();
  } else if ( window.getSelection ) {
      window.getSelection().removeAllRanges();
  }
}

// tooltip
$.fn.tooltip = function(title){
  var el = $(this);
  var tooltip = $('<div class="mt-tooltip"></div>')
  var arrow = $('<div class="mt-tooltip-arrow"></div>')
  var count;
  var position = el.data('title-position') || "center";
  var posStyle = {};
  el.mouseenter(function(){
    count = setTimeout(function(){
      tooltip.html('');
      tooltip.appendTo('body');
      //arrow.appendTo(tooltip);
      tooltip.css({
        position: "absolute",
        padding: "8px",
        fontSize: "10pt",
        background: "rgba(0,0,0,0.7)",
        color: "#fff",
        display: "none",
        zIndex: 90
      })
      .append(el.data('title') || title);

   /*   arrow.css({
        'width': 0,
        'height': 0,
        'border-style': 'solid',
        'border-width': '5px 5px 0 5px',
        'border-color': 'rgba(0,0,0,0.7) transparent transparent transparent',
        'position': 'absolute',
        'bottom': -5,
        'left': tooltip.innerWidth()/2 - 5
      })*/
      switch (position){
        case "right":
          posStyle = {
            left: (el.offset().left + el.outerWidth()) - tooltip.innerWidth(),
            top: (el.offset().top) - tooltip.innerHeight() - 10
          };
          //arrow.css('left', '');
          //arrow.css('right', el.outerWidth()/2) + 5;
          break;
        case "left":
          posStyle = {
            left: el.offset().left,
            top: (el.offset().top) - tooltip.innerHeight() - 10
          };
          //arrow.css('left', 15);
          break;
        case "center":
          posStyle = {
            left: (el.offset().left + el.outerWidth()/2) - tooltip.innerWidth()/2 ,
            top: (el.offset().top) - tooltip.innerHeight() - 10
          };
          break;
      }
      tooltip.css(posStyle)
      .fadeIn('fast');
    }, 350);
  });
  function hideTooltip(){
    clearTimeout(count)
    tooltip.fadeOut('fast', function(){
      tooltip.remove();
    });
  }
  el.mouseleave(hideTooltip);
  $(document).keyup(hideTooltip);
  $(document).resize(hideTooltip);
}

$(document).ready(function(){
  // Create dinamically image legend
  $('[data-img-target]').each(function(){
    var obj = $(this);
    var value = obj.attr('data-img-title');
    var target = obj.attr('data-img-target');
    obj.css({
      'overflow': 'hidden',
      'position': 'relative'
    });
    var alt = $('<div></div>');
    var a = $('<a href="'+target+'" target="_blank"></a>');
    a.appendTo(obj);
    alt.appendTo(a)
    .css({
      background: "rgba(0,0,0,.5)",
      color: '#fff',
      padding: '10px',
      margin: '5px',
      position: 'absolute',
      top: '-60px',
      right: '5px',
      fontSize: '12pt'
    })
    .html(value);
    obj.stop().mouseenter(function(){
      alt.animate({
        top: '8px'
      }, 200);
    });
    obj.stop().mouseleave(function(){
      alt.delay(500).animate({
        top: '-60px'
      }, 200);
    });
  });
  // setTimout important! to elements in include on #calc partials
  setTimeout(function(){
    $('[data-title]').each(function(){
      $(this).tooltip();
    });
  }, 1000);

})