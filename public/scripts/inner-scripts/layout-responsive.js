$(document).ready(function(){
	$(window).on('resize', function(){
		$('.menu input').prop('checked', false)
	})
	$('body').not('.menu').click(function() {
  		$('.menu input').prop("checked", false);
	});
	$('.menu').click(function(event) {
	  event.stopPropagation();
	});
})