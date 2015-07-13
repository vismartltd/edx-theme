$ ->
  $('.login-button-toggle').click ->
    $(this).removeClass('animated fadeInDown').addClass('animated bounceInRight').one 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ->
      $(this).addClass 'hidden'
    $('.login-container').removeClass('hidden animated bounceOutLeft').addClass 'animated bounceInRight'
