

  $('.course-pad').hover (->
    console.log 'hover'
   	$(this).animate({opacity: '100%'}, 500, 'ease-out', ->
      console.log 'hover'
      $(this).children('div').animate {opacity: '100%'}, 500, 'ease-out'
    )),
  	(->
      $(this).children('div').animate {opacity: '0'}, 500, 'ease-out'
    	$(this).children('.course-pad').animate({opacity: '0'}, 500, 'ease-out'))

  $('.unenroll').click ->
    $('#unenroll-form-modal').modal('show')
