$(document).ready(function(){
	$(window).on('resize', function(){
		$('.menu input:checkbox').prop('checked', false)
	})
	$('body').click(function() {
  		$('.menu input:checkbox').prop("checked", false);
		$('.menu').click(function(event) {
		  event.stopPropagation();
		});
	});
})