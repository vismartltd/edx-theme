<%! from django.utils.translation import ugettext as _ %>

<%! from django.core.urlresolvers import reverse %>
<%inherit file="main.html" />
<%namespace name='static' file='static_content.html'/>

<%! from microsite_configuration import microsite %>
<%! import third_party_auth %>
<%! from third_party_auth import provider, pipeline %>

<%
  homepage_overlay_html = microsite.get_value('homepage_overlay_html')

  ## To display a welcome video, change False to True, and add a YouTube ID (11 chars, eg "123456789xX") in the following line
  show_homepage_promo_video = microsite.get_value('show_homepage_promo_video', False)
  homepage_promo_video_youtube_id = microsite.get_value('homepage_promo_video_youtube_id', "your-youtube-id")

  show_partners = microsite.get_value('show_partners', True)

%>
<%block name="js_extra">
  <script type="text/javascript">

    (function() {
      toggleSubmitButton(true);

      $('#form-login').on('submit', function() {
        toggleSubmitButton(false);
      });

      $('#form-login').on('ajax:error', function(event, request, status_string) {
        toggleSubmitButton(true);

        if (request.status === 403) {
          $('.message.submission-error').removeClass('is-shown');
          $('.third-party-signin.message').addClass('is-shown').focus();
          $('.third-party-signin.message .instructions').html(request.responseText);
        } else {
          $('.third-party-signin.message').removeClass('is-shown');
          $('.message.submission-error').addClass('is-shown').focus();
          $('.message.submission-error').html(gettext("Your request could not be completed.  Please try again."));
        }
      });

      $('#form-login').on('ajax:success', function(event, json, xhr) {
        if(json.success) {
          var u=decodeURI(window.location.search);
          var next = u.split("next=")[1];
          if (next != undefined) {
            // if next is undefined, decodeURI returns "undefined" causing a bad redirect.
            next = decodeURIComponent(next);
          }
          if (next && !isExternal(next)) {
            location.href=next;
          }  else if(json.redirect_url){
            location.href=json.redirect_url;
          } else {
            location.href="${reverse('dashboard')}";
          }
        } else if(json.hasOwnProperty('redirect')) {
          var u=decodeURI(window.location.search);
          if (!isExternal(json.redirect)) { // a paranoid check.  Our server is the one providing json.redirect
              location.href=json.redirect+u;
          } // else we just remain on this page, which is fine since this particular path implies a login failure
            // that has been generated via packet tampering (json.redirect has been messed with).
        } else {
          toggleSubmitButton(true);
          $('.message.submission-error').addClass('is-shown').focus();
          $('.message.submission-error .message-copy').html(json.value);
        }
      });
      $("#forgot-password-link").click(function() {
        $("#forgot-password-modal").show();
        $("#forgot-password-modal .close-modal").focus();
      });

    })(this);

    function toggleSubmitButton(enable) {
      var $submitButton = $('form #submit');

      if(enable) {
        $submitButton.
          removeClass('is-disabled').
          attr('aria-disabled', false).
          removeProp('disabled').
          html("Войти");
      }
      else {
        $submitButton.
          addClass('is-disabled').
          prop('disabled', true).
          text("Обработка");
      }
    }

    function thirdPartySignin(event, url) {
      event.preventDefault();
      window.location.href = url;
    }

    (function post_form_if_pipeline_running(pipeline_running) {
       // If the pipeline is running, the user has already authenticated via a
       // third-party provider. We want to invoke /login_ajax to loop in the
       // code that does logging and sets cookies on the request. It is most
       // consistent to do that by using the same mechanism that is used when
       // the use does first-party sign-in: POSTing the sign-in form.
       if (pipeline_running) {
         $('#form-login').submit();
       }
    })(${pipeline_running})
  </script>
</%block>

<div class="login-wrapper ">
  <!-- START Login Background Pic Wrapper-->
  <div class="bg-pic">
    <!-- START Background Pic-->
    <img src="static/themes/ninenone/assets/new-york-city-buildings-sunrise-morning-hd-wallpaper.jpg" data-src="static/themes/ninenone/assets/new-york-city-buildings-sunrise-morning-hd-wallpaper.jpg" data-src-retina="static/themes/ninenone/assets/new-york-city-buildings-sunrise-morning-hd-wallpaper.jpg" alt="" class="lazy">
    <!-- END Background Pic-->
    <!-- START Background Caption-->
    <div class="bg-caption pull-bottom sm-pull-bottom text-white p-l-20 m-b-20">
      <h2 class="semi-bold text-white">
      Pages make it easy to enjoy what matters the most in the life</h2>
      <p class="small">
        images Displayed are solely for representation purposes only, All work copyright of respective owner, otherwise © 2013-2014 REVOX.
      </p>
    </div>
    <!-- END Background Caption-->
  </div>
  <!-- END Login Background Pic Wrapper-->
  <!-- START Login Right Container-->
  <div class="login-container bg-white">
    <div class="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40">
      <img src="static/themes/ninenone/assets/img/logo.png" alt="logo" data-src="static/themes/ninenone/assets/img/logo.png" data-src-retina="static/themes/ninenone/assets/img/logo_2x.png">
      <p class="p-t-35">Войти в систему обучения</p>
      <!-- START Login Form -->
      <form id="form-login" class="p-t-15" role="form" method="post" data-remote="true" action="/login_ajax">
        <!-- START Form Control-->
        <div class="form-group form-group-default">
          <label>Login</label>
          <div class="controls">
            <input type="text" name="username" placeholder="User Name" class="form-control" required>
          </div>
        </div>
        <!-- END Form Control-->
        <!-- START Form Control-->
        <div class="form-group form-group-default">
          <label>Password</label>
          <div class="controls">
            <input type="password" class="form-control" name="password" placeholder="Credentials" required>
          </div>
        </div>
        <!-- START Form Control-->
        <div class="row">
          <div class="col-md-6 no-padding">
            <div class="checkbox ">
              <input type="checkbox" value="1" id="checkbox1">
              <label for="checkbox1">Keep Me Signed in</label>
            </div>
          </div>
          <div class="col-md-6 text-right">
            <a href="#" class="text-info small">Help? Contact Support</a>
          </div>
        </div>
        <!-- END Form Control-->
        <button id="submit" class="btn btn-primary btn-cons m-t-10" type="submit">Sign in</button>
      </form>
      <!--END Login Form-->
      <div class="pull-bottom sm-pull-bottom">
        <div class="m-b-30 p-r-80 sm-m-t-20 sm-p-r-15 sm-p-b-20 clearfix">
          <div class="col-sm-3 col-md-2 no-padding">
            <img alt="" class="m-t-5" data-src="assets/img/demo/pages_icon.png" data-src-retina="assets/img/demo/pages_icon_2x.png" height="60" src="assets/img/demo/pages_icon.png" width="60">
          </div>
          <div class="col-sm-9 no-padding m-t-10">
            <p><small>
            Create a pages account. If you have a facebook account, log into it for this process. Sign in with <a href="#" class="text-info">Facebook</a> or <a href="#" class="text-info">Google</a></small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END Login Right Container-->
</div>