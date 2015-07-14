$ ->
  $('.course-pad').hover (->
    console.log 'hover new 2'
   	$(this).animate({opacity: '100%'}, 500, 'linear', ( ->
      $(this).children('div').animate({opacity: '100%'}, 500))
    )),
  	(->
      $(this).children('div').animate({opacity: '0'}, 500)
    	$(this).children('.course-pad').animate({opacity: '0'}, 500))

  $('.unenroll').click ->
    $('#unenroll-form-modal').modal('show')
