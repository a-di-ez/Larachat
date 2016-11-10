(function(document, window, $) {
  'use strict';

  window.AppForum = App.extend({
  });

  $(document).ready(function() {
    AppForum.run();

    $(document).on('mouseenter', '.fa-circle-o', function(e) {
      $(e.target).webuiPopover({
        'title': 'Bot Sip account is not connected!',
        'content': 'For bot worked connect it to your Sip account.',
        'style': 'info'
      });
      $(e.target).webuiPopover('show');
    });

    $(document).on('mouseleave', '.fa-circle-o', function(e) {
      $(e.target).webuiPopover('destroy');
    });

    $(document).on('mouseenter', '.red-500', function(e) {
      $(e.target).webuiPopover({
        'title': 'Bot sip account information is empty!',
        'content': 'For bot worked, please enter his Sip account data in edit Sip account.',
        'style': 'danger'
      });
      $(e.target).webuiPopover('show');
    });

    $(document).on('mouseleave', '.red-500', function(e) {
      $(e.target).webuiPopover('destroy');
    });

    $(document).on('mouseenter', '.fa-circle', function(e) {
      $(e.target).webuiPopover({
        'title': 'Bot sip account is working!',
        'content': 'Sip account works. About his work report, see statistics.',
        'style': 'success'
      });
      $(e.target).webuiPopover('show');
    });

    $(document).on('mouseleave', '.fa-circle', function(e) {
      $(e.target).webuiPopover('destroy');
    });

    $(document).on('click', '[data-tag=project-delete]', function(e) {
      var delete_url = $(this).attr('data-url-delete');

      bootbox.dialog({
        message: "Do you want to delete the account?",
        buttons: {
          success: {
            label: "Delete",
            className: "btn-danger",
            callback: function() {
              deleteBot(delete_url);
            }
          }
        }
      });
    });

    $("#phoneSipAccountForm").formValidation({
      framework: 'bootstrap',
      live: "disabled",
      fields: {
        phone_sip_username: {
          validators: {
            notEmpty: {
              message: 'The Username is required'
            }
          }
        },
        phone_sip_secret: {
          validators: {
            notEmpty: {
              message: 'The Secret is required'
            }
          }
        },
        phone_sip_useralias: {
          validators: {
            notEmpty: {
              message: 'The Useralias is required'
            }
          }
        },
        phone_sip_first_name: {
          validators: {
            notEmpty: {
              message: 'The First Name is required'
            }
          }
        },
        phone_sip_last_name: {
          validators: {
            notEmpty: {
              message: 'The Last Name is required'
            }
          }
        },
        phone_sip_email: {
          validators: {
            notEmpty: {
              message: 'The E-mail is required'
            },
            emailAddress: {
              message: 'Incorrect email'
            }
          }
        },
        phone_sip_phone: {
          validators: {
            notEmpty: {
              message: 'The Phone is required'
            }
          }
        },
        phone_sip_languages: {
          validators: {
            notEmpty: {
              message: 'The Languages is required'
            }
          }
        }
      }
    });

    $(document).on('click', '.taskboard-stage-delete', function() {
      var delete_url = $(this).attr('data-url-delete');

      bootbox.dialog({
        message: "Do you want to delete the Phone/SIP account?",
        buttons: {
          success: {
            label: "Delete",
            className: "btn-danger",
            callback: function() {
              deleteBot(delete_url);
            }
          }
        }
      });
    });

    $('.add-item-toggle').click(function() {
      $(document).on('click', function(e) {
        var $target = $(e.target);
        if ($target.closest('.action-open').length === 0) {
          $('.action-open').each(function(key, value){
            $(value).removeClass('action-open');
          });
        }
      });

      $('.action-open').each(function(key, value){
        $(value).removeClass('action-open');
      });

      $(this).parent().addClass('action-open');
    });

    $(document).on('click', '.add-item-add, .add-item-cancel', function() {
      var $this = $(this),
          $wrap = $this.closest('.action-wrap'),
          $input = $('[name="name"]', $wrap);

      $wrap.toggleClass('action-open');
      if ($this.hasClass('add-item-toggle')) {
        $input.val('');
      }

      if ($this.hasClass('add-item-toggle')) {
        $(document).on('click.add-item', function(e) {
          var $target = $(e.target);
          if ($target.closest('.add-item-wrap').length === 0) {
            $wrap.removeClass('action-open');
            $(document).off('click.add-item');
          }
        });
      } else {
        $(document).off('click.add-item');
      }
    });

    $('.bots-disconnect-block-open').click(function() {
      $('.disconnected-bot').each(function(key, value){
        var $this = $(value),
            $status_icon = $(value).find('.icon');

        if (!$this.hasClass('bg-grey-100')) {
          $this.addClass('bg-grey-100 priority-urgent-grey').removeClass('priority-urgent connect-bot');
          $status_icon.addClass('fa-circle-o').removeClass('fa-circle');
        }
      });
    });

    $(document).on('click', '.disconnected-bot', function() {
      var $this = $(this),
          $status_icon = $(this).find('.icon');

      if ($this.hasClass('bg-grey-100')) {
        $this.addClass('priority-urgent connect-bot').removeClass('bg-grey-100 priority-urgent-grey');
        $status_icon.addClass('fa-circle green-300').removeClass('fa-circle-o grey-300');
      } else {
        $this.addClass('bg-grey-100 priority-urgent-grey').removeClass('priority-urgent connect-bot');
        $status_icon.addClass('fa-circle-o grey-300').removeClass('fa-circle green-300');
      }
    });

    $(document).on('click', '.connected-bot', function() {
      var $this = $(this),
          $status_icon = $(this).find('.icon');

      if ($this.hasClass('bg-grey-100')) {
        $this.addClass('priority-urgent').removeClass('bg-grey-100 priority-urgent-grey disconnect-bot');

        if ($this.attr('data-empty') == 'true') {
          $status_icon.addClass('fa-exclamation-triangle red-500').removeClass('fa-circle-o grey-300');
        } else {
          $status_icon.addClass('fa-circle green-300').removeClass('fa-circle-o grey-300');
        }
      } else {
        $this.addClass('bg-grey-100 priority-urgent-grey disconnect-bot').removeClass('priority-urgent');

        if ($this.attr('data-empty') == 'true') {
          $status_icon.addClass('fa-circle-o grey-300').removeClass('fa-exclamation-triangle red-500');
        } else {
          $status_icon.addClass('fa-circle-o grey-300').removeClass('fa-circle green-300');
        }
      }

      var $disconnect_bot = $('.disconnect-bot');
      $disconnect_bot.each(function(key, value) {
        if ($(value).parent().get(0) != $this.parent().get(0)) {
          var $this_value = $(value);

          $this_value.addClass('priority-urgent').removeClass('bg-grey-100 priority-urgent-grey disconnect-bot');
          $this_value.find('.icon').addClass('fa-circle').removeClass('fa-circle-o');
        }
      });

      if ($disconnect_bot.length > 0) {
        $('.btn-bots-disconnect-sip').each(function(key, value) {
          if ($(value).parent().parent().get(0) == $this.parent().parent().get(0)) {
            $(value).show(100);
          } else {
            $(value).hide(100);
          }
        });
      } else {
        $('.btn-bots-disconnect-sip').hide(100);
      }
    });

  });
})(document, window, jQuery);

function sendCreateSipPhoneAccountRequest (url_request) {
  var $phoneSipAccountForm = $("#phoneSipAccountForm"),
      fv = $phoneSipAccountForm.data('formValidation');

  fv.validate();

  if (!fv.isValid()) {
    $('html, body').animate({
      scrollTop: 1
    }, 500);

    return false;
  }

  $.ajax({
    type: "POST",
    cache: false,
    url: url_request,
    data: $phoneSipAccountForm.serialize(),
    success: function(data) {
      $('#done_send_voucher').show(1000);

      setTimeout(function()
      {
        $('#done_send_voucher').hide();
        $('#addProjectForm').modal('hide');
        location.reload(true);
      }, 3000);

    },
    error: function(error) {
      var error_text = JSON.parse(error.responseText),
          error_message = '',
          time = 1;

      for (var key in error_text) {
        error_message += '<div id="error_saving" role="alert" class="alert dark alert-icon alert-danger alert-dismissible">'
            + '<i aria-hidden="true" class="icon wb-close"></i>'
            + error_text[key]
            + '</div>';

        time++;
      }

      $('#error_saving').empty().append(error_message).show('normal').delay(time * 2000).queue(function (){
        $(this).hide('normal').dequeue();
      });
    }
  });

  return true;
}

