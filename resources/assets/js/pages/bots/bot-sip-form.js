function createUploadFileLangLinkTab (status_active, link, lang) {
    var active = (status_active) ? 'active' : '';

    return '<li role="presentation" class="' + active + '">'
            + '<a class="padding-vertical-5" role="tab" href="#dropFileTab' + link + '" data-toggle="tab">'
                + lang
            + '</a>'
         + '</li>';
}

function createUploadFileLangTab (status_active, link, lang) {
    var active = (status_active) ? 'active' : '';

    return '<div role="tabpanel" id="dropFileTab' + link + '" class="tab-pane ' + active + '">'
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

function createUploadFileLangForm () {
    var $upload_file_link_block = $('#upload_file_link_block'),
        $upload_file_tab_block  = $('#upload_file_tab_block').empty();

    $.each($('input[name="bot_languages_slugs[]"]:checked'), function (key, value) {
        var $this_value = $(value),
            status_active = ($upload_file_tab_block.is(':empty')),
            upload_file_link = createUploadFileLangLinkTab(status_active, key, $this_value.val()),
            upload_file_tab = createUploadFileLangTab(status_active, key, $this_value.val());

        $upload_file_link_block.append(upload_file_link);
        $upload_file_tab_block.append(upload_file_tab);
    });

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

function serializeScheduleTime () {
    var schedule_list = {};

    $.each($('#schedule_time').find('input[type="text"]'), function (key, value) {
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

$('.schedule-time-weekdays').change(function () {
    var monday_start = $('input[name="monday_start"]').val(),
        monday_end = $('input[name="monday_end"]').val();

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
        $this_switch.closest('.row').find('input[type="text"]').prop('disabled', false);
        $('a[href="' + link_tab + '"').parent().removeClass('schedule-weekends');
        $this_switch.parent().find('.day-status').empty().text('Day On');
    } else {
        $this_switch.closest('.row').find('input[type="text"]').prop('disabled', true);
        $('a[href="' + link_tab + '"').parent().addClass('schedule-weekends');
        $this_switch.parent().find('.day-status').empty().text('Day Off');
    }
});

$(document).on('change', 'input[name="bot_phone_sip_account"]', function (e) {
    var $this = $(e.target);

    if ($this.is(':checked')) {
        $('#phone_sip_settings_block').show(400);
    } else {
        $('#phone_sip_settings_block').hide(400);
    }
});

$('#close_create_phone_sip_account').click(function () {
    $('#create_phone_sip_account_form').hide(500);
    $('#phone_sip_settings_block').show(400);
    $('#phone_sip_message_not_yet').show(400);
});







