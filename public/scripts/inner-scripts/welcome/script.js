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
	

	var colors = [];
	$('.icons-box .icons').mouseenter(function(){
		var icon = $(this).children('div');
		$('.icons-box .icons').each(function(i){
			colors.push($(this).children('div').css('background-color'));
			$(this).children('div').css('background-color', '#999');
		});	
		icon.css('background-color', colors[$(this).index('.icons-box .icons')]);
		/*$(this).parent().children('div:last')
		.html($(this).data('name'))
		.fadeIn('fast');*/
	})

	$('.icons-box  .icons').mouseleave(function(){
		$('.icons-box .icons').each(function(i){
			$(this).children('div').css('background-color', colors[i]);
		});	
	})
	
})
