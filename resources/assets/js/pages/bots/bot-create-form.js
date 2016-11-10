$('#first-step').click(function () {
    $('#botInfoForm').show();
});

$(document).on('click', 'label', function() {
    if ($(this).hasClass('disabled')) {
        $(this).button('toggle');
    }
});

$('#create_btn_phone_sip_account').click(function() {
    $('#phone_sip_message_not_yet').hide();
    $('#create_phone_sip_account_form').show(500);
    $('#phone_sip_settings_block').hide(400);

    $("#newPhoneSipAccountForm").formValidation({
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
});

function sendCreateSipPhoneAccountRequest (url_request) {
    var $phoneSipAccountForm = $("#newPhoneSipAccountForm"),
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
            var sip_number = data['sip_number'],
                sip_account = '<label class="padding-10 font-size-20 btn btn-outline btn-success margin-5 active">'
                    + '<input type="radio" value="' + sip_number + '" autocomplete="off" name="bot_phone_sip_account" checked>'
                    + '<i aria-hidden="true" class="icon fa-phone text-active"></i>'
                    + sip_number
                    + '</label>';

            $('#phone_sip_accounts_list .active').removeClass('active');
            $('#phone_sip_accounts_list').append(sip_account);

            $('#done_create_account').show(1000);
            setTimeout(function()
            {
                $('#done_create_account').hide();
                $('#create_phone_sip_account_form').hide(400);
                $('#phone_sip_settings_block').show(400);
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
