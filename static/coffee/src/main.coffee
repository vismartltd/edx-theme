

  # $('.course-holder').hover (->
  #  	$(this).children('.course-pad').animate({height: '100%'}, 500, 'linear')),
  # 	(->
  #   	$(this).children('.course-pad').animate({height: '0'}, 500, 'linear'))

  $('.unenroll').click ->
    $('#unenroll-form-modal').modal('show')
