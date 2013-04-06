!function ($) {

  "use strict"; // jshint ;_;


 /* RM CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="rm"]'
    , RM = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  RM.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , href = $this.attr('href')
      , $parent = selector ? $(selector) : $this.parent();

    e && e.preventDefault()

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
	   $.post(href, {'inajax': true}, function(msg){
			if(msg) {
				msg = $(msg);
				$('body').append(msg);
				setTimeout(function(){
					msg.remove();
				}, 1500);
			}
			$parent.trigger('closed').remove();
	   });
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* RM PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.RM

  $.fn.RM = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('rm')
      if (!data) $this.data('rm', (data = new RM(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.RM.Constructor = RM


 /* RM NO CONFLICT
  * ================= */

  $.fn.RM.noConflict = function () {
    $.fn.RM = old
    return this
  }


 /* RM DATA-API
  * ============== */

  $(document).on('click.rm.data-api', dismiss, RM.prototype.close)

}(window.jQuery);