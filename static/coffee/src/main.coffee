$ ->
  $('.course-pad').hover (->
    console.log 'hover new'
   	$(this).animate({opacity: '100%'}, 500, 'ease-out', ->
      $(this).children('div').animate {opacity: '100%'}, 500
    )),
  	(->
      $(this).children('div').animate {opacity: '0'}, 500,
    	$(this).children('.course-pad').animate({opacity: '0'}, 500))

  $('.unenroll').click ->
    $('#unenroll-form-modal').modal('show')
