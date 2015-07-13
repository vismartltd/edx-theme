$ ->
  $('.login-button-toggle').click ->
    $(this).parent().removeClass().addClass('animated bounceInRight').one 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ->
      $(this).parent().addClass 'hidden'
    $('#logo-top-index').removeClass().addClass('animated fadeOutUp')
    $('.login-container').removeClass('hidden animated bounceOutLeft').addClass 'animated bounceInRight'
