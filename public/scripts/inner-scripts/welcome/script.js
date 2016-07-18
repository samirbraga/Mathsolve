/*$(window).load(function(){
	$('body, html').animate({
		scrollTop: 0
	}, 1)
})*/
$(document).ready(function(){
	$('.scroll-button.next div').click(function(){
		var self = $(this);
		var next = self.closest('.pages').next('.pages');
		$('body, html').animate({
			scrollTop: next.offset().top
		}, 400)
	})	
	$('.scroll-button.prev div').click(function(){
		var self = $(this);
		var next = self.closest('.pages').prev('.pages');
		$('body, html').animate({
			scrollTop: next.offset().top
		}, 400)
	})
	// Parallax Effect
	$('div.pages').each(function(){
		var $obj = $(this);
		$(window).scroll(function() {
			var yPos = -(($(window).scrollTop() - $obj.offset().top) / ($obj.data('speed') || 15)); 
			var bgpos = '0 '+ yPos + 'px';
			$obj.css('background-position', bgpos );
		}); 
	});
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

	var colors = [];
	$('.icons-box .icons').mouseenter(function(){
		var icon = $(this).children('div');
		$('.icons-box .icons').each(function(i){
			colors.push($(this).children('div').css('background-color'));
			$(this).children('div').css('background-color', '#999');
		});	
		icon.css('background-color', colors[$(this).index('.icons-box .icons')]);
		$(this).children('div:last').fadeIn('fast');
	})

	$('.icons-box  .icons').mouseleave(function(){
		$('.icons-box .icons').each(function(i){
			$(this).children('div').css('background-color', colors[i]);
		});	
	})
})
