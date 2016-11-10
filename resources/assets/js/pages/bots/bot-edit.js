(function(document, window, $) {
  'use strict';

  window.AppForum = App.extend({
    run: function(next) {
      next();
    }
  });

  $(document).ready(function() {
    AppForum.run();

    $("#botForm").formValidation({
      framework: 'bootstrap',
      live: "disabled",
      fields: {
        bot_name: {
          validators: {
            notEmpty: {
              message: 'The Bot Name is required'
            }
          }
        },
        'bot_languages_slugs[]': {
          validators: {
            notEmpty: {
              message: 'The Bot languages is required'
            },
            choice: {
              min: 1,
              max: 3,
              message: 'Please choose 1 - 3 bot languages'
            }
          }
        }
      }
    });
  });

  $('.bot-language').on('change',function() {
    if ($('#bot-languages').find(':checked').size() > 3) {
      this.checked = false;
      $(this).button('toggle');
    }
  });

})(document, window, jQuery);

function saveBotSettings (request_url, services_slugs, bot_platform_slug, bot_payments_slugs, tourism) {
  var $botForm = $('#botForm'),
      fv = $botForm.data('formValidation');

  fv.validate();

  if (!fv.isValid()) {
    $('html, body').animate({
      scrollTop: 1
    }, 500);

    return false;
  }

  var disabled = $botForm.find(':input:disabled').removeAttr('disabled');

  var requestData = $('#botForm input, textarea').filter(function(index, element) {
    return $(element).val() != "";
  }).serialize();
  requestData += '&bot_platform_slug=' + bot_platform_slug;

  for (var key in bot_payments_slugs) {
    requestData += '&bot_payments_slugs[]=' + bot_payments_slugs[key];
  }

  for (var key in services_slugs) {
    requestData += '&services_slugs[]=' + services_slugs[key].value;
  }

  disabled.attr('disabled','disabled');

  if (tourism) {
    requestData += '&bot_service_tourism=' + JSON.stringify(tourism);
  }

  $.ajax({
    type: "POST",
    cache: false,
    url: request_url,
    data: requestData,
    success: function() {
      $('#done_saving').show('normal').delay(2000).queue(function (){
        $(this).hide('normal').dequeue();
      });
    },
    error: function(error) {
      var error_response = JSON.parse(error.responseText),
          error_text = '',
          time_show_error = 0;

      for (var key_error in error_response) {
        error_text += '- ' + error_response[key_error] + '<br>';
        time_show_error++;
      }

      $('#error_bot_edit').html(error_text);
      $('#error_bot_edit').parent().show('normal').delay(2000 * time_show_error).queue(function (){
        $(this).hide('normal').dequeue();
      });
    }
  });

  return true;
}

function createModalPage ($this_el, title_modal, page_action_name, page_action){
  var page_name = '',
      page_id = '',
      page_data = '';

  if ($this_el.hasClass('disabled')) {
    return;
  }

  $this_el.find('input').each(function() {
    var $this = $(this);

    switch ($this.attr('id')) {
      case 'page_id':
        page_id = $this.val();
        page_data += '&page_id=' + page_id;
        break;
      case 'page_name':
        page_name = $this.val();
        page_data += '&page_name=' + page_name;
        break;
      case 'page_access_token':
        page_data += '&page_access_token=' + $this.val();
        break;
    }
  });

  if (page_id == '') {
    return;
  }

  $('#title_modal').empty().text(title_modal);
  $('#page_action_modal').empty().text(page_action_name);
  $('#page_name_modal').empty().text(page_name);

  $this_el.button('toggle');
  $('#unlink_page').attr('data-page-id', page_id)
      .attr('data-action-page', page_action)
      .attr('data-page', page_data)
      .modal('show');
}

function action_page() {
  var $unlink_page = $('#unlink_page'),
      page_id = $unlink_page.attr('data-page-id'),
      page_data = $unlink_page.attr('data-page'),
      action_url = $unlink_page.attr('data-action-page'),
      $label = $('#label_' + page_id);

  $.ajax({
    type: "POST",
    cache: false,
    url: action_url,
    data: page_data,
    success: function(data) {
      $unlink_page.attr('data-page-id', page_id).modal('hide');

      if ($label.hasClass('active')) {
        $label.removeClass('active');
      } else {
        $label.addClass('active')
      }
    },
    error: function(error) {
      console.log(error)
    }
  });
}
