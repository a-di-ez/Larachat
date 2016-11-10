(function(document, window, $) {
    'use strict';

    window.AppForum = App.extend({});

    $(document).ready(function() {
        AppForum.run();

        $(document).on('click', '.sip-account-delete', function(e) {
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

})(document, window, jQuery);

function savePhoneSipAccount (url_request) {
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
        success: function () {
            alertify.success("Phone/Sip account edited success!");
        },
        error: function () {
            alertify.error("Phone/Sip account edited fail!");
        }
    });
}

function createUploadFileLangLinkTab (status_active, link, lang) {
    var active = (status_active) ? 'active' : '';

    return '<li role="presentation" class="' + active + '">'
        + '<a class="padding-vertical-5" role="tab" href="#dropFileTab_' + lang + '_' + link + '" data-toggle="tab">'
        + lang
        + '</a>'
        + '</li>';
}

function createUploadFileLangTab (status_active, link, lang) {
    var active = (status_active) ? 'active' : '';

    return '<div role="tabpanel" id="dropFileTab_' + lang + '_' + link + '" class="tab-pane ' + active + '">'
        + '<div class="row">'
        + '<div class="col-md-6">'
        + '<div class="form-group">'
        + '<label class="control-labe">Greeting sound ' + lang + ':</label> '
        + '<input type="file" data-lang="' + lang + '" data-message="mess_client" name="sip_greeting_sound_file_' + lang + '" class="upload-sound-sip dropify" data-height="80"/>'
        + '</div>'
        + '</div>'
        + '<div class="col-md-6">'
        + '<div class="form-group">'
        + '<label class="control-labe">Non working sound ' + lang + ':</label> '
        + '<input type="file" data-lang="' + lang + '" data-message="work-time" name="sip_non_working_sound_file_' + lang + '" class="upload-sound-sip dropify2" data-height="80"/>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';
}

function createUploadFileLangForm (lang_array, $this) {
    var $upload_file_link_block = $this.parent().find('.upload_file_link_block').empty(),
        $upload_file_tab_block  = $this.parent().find('.upload_file_tab_block').empty(),
        bot_id = $this.parent().attr('data-bot-id');

    for (var lang_key in lang_array) {
        var lang = lang_array[lang_key],
            status_active = ($upload_file_tab_block.is(':empty')),
            upload_file_link = createUploadFileLangLinkTab(status_active, bot_id, lang),
            upload_file_tab = createUploadFileLangTab(status_active, bot_id, lang);

        $upload_file_link_block.append(upload_file_link);
        $upload_file_tab_block.append(upload_file_tab);
    }

    $('.dropify').dropify({
        messages: {
            'default': 'Upload your greeting sound file here',
            'replace': 'Drag and drop or click to replace',
            'remove':  'Remove',
            'error':   'Ooops, something wrong appended.'
        }
    });

    $('.dropify2').dropify({
        messages: {
            'default': 'Upload your non-working hours file here',
            'replace': 'Drag and drop or click to replace',
            'remove':  'Remove',
            'error':   'Ooops, something wrong appended.'
        }
    });
}

function serializeScheduleTime (bot_id) {
    var schedule_list = {};

    $.each($('#schedule_time_' + bot_id).find('input[type="text"]'), function (key, value) {
        var $this_value = $(value),
            time_raw    = $this_value.val(),
            name        = $this_value.attr('data-name-day'),
            time_period = $this_value.attr('data-period'),
            day_period  = time_raw.substr(time_raw.length-2),
            hour        = time_raw.substr(0, 2),
            minute      = time_raw.substr(3, 2);

        if (!schedule_list[name]) {
            schedule_list[name] = {
                'start': false,
                'end': false
            };
        }

        if (time_raw != '' && !$this_value.prop('disabled')) {
            if (day_period == 'AM') {
                if (hour == '12') {
                    hour = '00';
                }
            }

            if (day_period == 'PM') {
                if (hour != '12') {
                    hour = parseInt(hour) + 12;
                }
            }

            schedule_list[name][time_period] = hour + minute;
        }
    });

    return JSON.stringify(schedule_list);
}

function showAccountSettingsBot ($this, lang_array) {
    var $settingsBlock = $('#phone_sip_settings_block_' + $this.parent().attr('data-bot-id'));

    $('.show-account-settings').show();
    $this.hide();
    $('.collapse').hide(400);

    createUploadFileLangForm(lang_array, $this);
    $settingsBlock.show(400);
}

function saveBotAccountSettings (bot_id, request_url) {
    var $account_settings_form = $('#phone_sip_settings_block_' + bot_id),
        request_data = new FormData();

    request_data.append('bot_id', bot_id);
    request_data.append('bot_phone_sip_time_zone', $account_settings_form.find('select[name="bot_phone_sip_time_zone"]').val());
    request_data.append('bot_phone_sip_schedule_time', serializeScheduleTime(bot_id));

    $.each($account_settings_form.find('.upload-sound-sip'), function (key, value) {
        var $this_value = $(value),
            lang = $this_value.attr('data-lang'),
            message = $this_value.attr('data-message');

        request_data.append(message + ',' + lang, $this_value.prop('files')[0]);
    });

    //$.ajax({
    //    type: "POST",
    //    cache: false,
    //    url: request_url,
    //    data: request_data,
    //    contentType: false,
    //    processData: false,
    //    success: function(response) {
    //        console.log(response);
    //        alertify.success('Bot settings account saved success!');
    //    },
    //    error: function() {
    //        alertify.error('Bot settings account saved fail!');
    //    }
    //});
}

$('.schedule-time-weekdays').change(function (e) {
    var $this = $(e.target),
        monday_start = $this.closest('.row').find('input[name="monday_start"]').val(),
        monday_end = $this.closest('.row').find('input[name="monday_end"]').val();

    if (monday_start != '' && monday_end != '') {
        $.each($('.schedule-time-weekdays'), function(key, value) {
            var $this_value = $(value);

            if ($this_value.val() == '') {
                if ($this_value.attr('data-period') == 'start') {
                    $this_value.val(monday_start);
                }

                if ($this_value.attr('data-period') == 'end') {
                    $this_value.val(monday_end);
                }
            }
        });
    }
});

$('.js-check-change').change(function (e) {
    var $this_switch = $(e.target),
        link_tab = '#' + $this_switch.closest('.tab-pane').attr('id');

    if ($this_switch.prop('checked')) {
        $this_switch.closest('.collapse').find('input[type="text"]').prop('disabled', false);
        $('a[href="' + link_tab + '"').parent().removeClass('schedule-weekends');
        $this_switch.parent().find('.day-status').empty().text('Day On');
    } else {
        $this_switch.closest('.collapse').find('input[type="text"]').prop('disabled', true);
        $('a[href="' + link_tab + '"').parent().addClass('schedule-weekends');
        $this_switch.parent().find('.day-status').empty().text('Day Off');
    }
});

$('.hide-account-settings').click(function() {
    $('.show-account-settings').show();
    $('.collapse').hide(400);
});
