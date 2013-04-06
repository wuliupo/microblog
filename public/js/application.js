$(document).ready(function(){
	$('#say_form').submit(function(e){
		e.preventDefault();
		var $this = $(this);
		$.post($this.attr('action'), {'post': $this.find('[name=post]').val(), 'inajax': true}, function(rtn){
			$('.more-content').append(rtn);
		});
		return false;
	});
});