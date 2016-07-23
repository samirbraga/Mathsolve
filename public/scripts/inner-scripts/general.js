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
    $('.contextMenu').remove();
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
          menuContent += '</li>';
          break;
        case "boolean":
          if(el.showed){
            menuContent += '<li><span class="option oper ' + el.classes + '">'+el.title+'</span>';
            if(el.doubt){
              menuContent += '<span class="doubt" >?</span>';
            }
            menuContent += '</li>';
          }
          break;
      }
    })
    menuContent += "</ul>";
    menu.append(menuContent);

    var ul = menu.children('ul');
    ul.find('li').each(function(i){
      $(this).mousedown(json[i].functions);
    })
    menu.on('contextmenu', function(e) {
      e.preventDefault();
    });
    e = e || window.event;
    e = jQuery.event.fix(e);
    menu.css({
      background: '#fff',
      padding: '3px 0',
      width: '300px',
      position: 'absolute',
      fontSize: '10pt',
      boxShadow: '0 0 2px 1px rgba(0,0,0,0.3)',
      left: e.pageX,
      top: e.pageY
    })
    ul.css({
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
    });
  })();
  $(document).bind('click resize', function(e) {
    $('.contextMenu').remove();
  })
  $('body').not('.contextMenu').bind('contextmenu', function(e) {
    $('.contextMenu').remove();
  })
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
$.fn.tooltip = function(){
  var el = $(this);
  var tooltip = $('<div class="mt-tooltip"></div>')
  var count;
  var position = el.data('title-position') || "center";
  var posStyle = {};
  el.mouseenter(function(){
    count = setTimeout(function(){
      tooltip.appendTo('body')
      .css({
        position: "absolute",
        padding: "8px",
        fontSize: "10pt",
        background: "rgba(0,0,0,0.7)",
        color: "#fff",
        display: "none",
        zIndex: 90
      })
      .html(el.data('title'));
      switch (position){
        case "right":
          posStyle = {
            left: (el.offset().left + el.outerWidth()) - tooltip.innerWidth(),
            top: (el.offset().top) - tooltip.innerHeight() - 10
          }
          break;
        case "left":
          posStyle = {
            left: el.offset().left,
            top: (el.offset().top) - tooltip.innerHeight() - 10
          }
          break;
        case "center":
          posStyle = {
            left: (el.offset().left + el.outerWidth()/2) - tooltip.innerWidth()/2 ,
            top: (el.offset().top) - tooltip.innerHeight() - 10
          }
          break;
      }
      tooltip.css(posStyle)
      .fadeIn('fast');
    }, 350);
  })
  function hideTooltip(){
    clearTimeout(count)
    tooltip.fadeOut('fast', function(){
      tooltip.remove();
    })
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
    .html(value)
    obj.stop().mouseenter(function(){
      alt.animate({
        top: '8px'
      }, 200)
    })
    obj.stop().mouseleave(function(){
      alt.delay(500).animate({
        top: '-60px'
      }, 200)
    })
  });
  // setTimout important! to elements in include on calc pages
  setTimeout(function(){
    $('[data-title]').each(function(){
      $(this).tooltip();
    });
  }, 1000) 
})