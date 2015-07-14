$ ->
  $('.login-button-toggle').click ->
    $(this).parent().removeClass().addClass('animated bounceInRight').one 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ->
      $(this).addClass 'hidden'
    $('#logo-top-index').removeClass().addClass('animated fadeOutUp')
    $('.login-container').removeClass('hidden animated bounceOutRight').addClass 'animated bounceInRight'

  $('.login-close-button').click ->
    $('#logo-top-index').removeClass().addClass('animated fadeInBottom')
    $('.login-container').removeClass('animated bounceInRight').addClass('animated bounceOutRight').one 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ->
      $('.login-container').addClass 'hidden'
      $('.login-button-toggle').show()

  # $('.course-holder').hover (->
  #  	$(this).children('.course-pad').animate({height: '100%'}, 500, 'linear')),
  # 	(->
  #   	$(this).children('.course-pad').animate({height: '0'}, 500, 'linear'))

  $('.unenroll').click ->
    $('#unenroll-form-modal').modal('show')
