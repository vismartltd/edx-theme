$ ->
  $('.login-button-toggle').click ->
    console.log 'test'
    $('.login-container').removeClass 'hidden'
    $(this).hide()
