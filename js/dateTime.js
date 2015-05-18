$(document).ready(function(){
	$('.date').datetimepicker();
	$('.time').datetimepicker({
		datepicker:false,
		format:'H:i',
		step:5
	});
});