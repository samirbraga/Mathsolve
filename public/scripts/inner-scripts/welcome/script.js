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
})