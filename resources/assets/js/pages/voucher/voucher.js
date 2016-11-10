(function(document, window, $) {
    'use strict';

    window.AppForum = App.extend({
        run: function(next) {
            next();
        }
    });

    $(document).ready(function() {
        AppForum.run();

        $('.dropify').dropify({
            messages: {
                'default': 'Upload your logo here',
                'replace': 'Drag and drop or click to replace',
                'remove':  'Remove',
                'error':   'Ooops, something wrong appended.'
            }
        });

        $("#voucherForm").formValidation({
            framework: 'bootstrap',
            live: "disabled",
            fields: {
            }
        });

        $("#testVoucherSendForm").formValidation({
            framework: 'bootstrap',
            live: "disabled",
            fields: {
                recipient_email: {
                    validators: {
                        notEmpty: {
                            message: 'The e-mail is required'
                        },
                        emailAddress: {
                            message: 'Incorrect email'
                        }
                    }
                },
                type_voucher: {
                    validators: {
                        notEmpty: {
                            message: 'The type voucher is required'
                        }
                    }
                }
            }
        });

        $('input, textarea').keyup( function() {
            $('.'+ $(this).attr('name')).text($(this).val());
        });

        $('ul[data-plugin="nav-tabs"] li:nth-child(1)').addClass('active');
        $('.voucher .tab-pane:nth-child(1)').addClass('active');

        $('#logo_company').on('change', function () {
            setTimeout(function() {
                var src = $('.dropify-render img').prop('src');

                $('.logo_company_img').empty().append('<img alt="logo" src="' + src + '" width="160" />');
            }, 500);
        });
    });

})(document, window, jQuery);

function saveVoucherData (request_url) {
    var $voucherForm = $("#voucherForm"),
        input_data = $voucherForm.serializeArray(),
        request_data = new FormData(),
        fv = $voucherForm.data('formValidation');

    fv.validate();

    if (!fv.isValid()) {
        $('html, body').animate({
            scrollTop: 1
        }, 500);

        return false;
    }

    request_data.append("logo_company", $('#logo_company').prop('files')[0]);

    for (var key in input_data) {
        request_data.append(input_data[key].name, input_data[key].value);
    }

    $.ajax({
        type: "POST",
        cache: false,
        url: request_url,
        data: request_data,
        contentType: false,
        processData: false,
        success: function() {
            $('#done_saving').show('normal').delay(2000).queue(function (){
                $(this).hide('normal').dequeue();
            });
        },
        error: function() {
            $('#error_saving').show('normal').delay(2000).queue(function (){
                $(this).hide('normal').dequeue();
            });
        }
    });

    return true;
}

function sendVoucherTest(url) {
    var $testVoucherSendForm = $("#testVoucherSendForm"),
        data = $testVoucherSendForm.serialize(),
        ladda = Ladda.create(document.querySelector('#send_voucher_btn')),
        fv = $testVoucherSendForm.data('formValidation');

    fv.validate();

    if (!fv.isValid()) {
        $('html, body').animate({
            scrollTop: 1
        }, 500);

        return false;
    }

    ladda.start();

    $.ajax({
        type: "POST",
        cache: false,
        url: url,
        data: data,
        success: function() {
            ladda.stop();
            $('#done_send_voucher').show('normal').delay(2000).queue(function (){
                $(this).hide('normal').dequeue();
                $('#test_send_voucher').modal('hide').dequeue();
            });
        },
        error: function() {
            ladda.stop();
            $('#error_send_voucher').show('normal').delay(2000).queue(function (){
                $(this).hide('normal').dequeue();
            });
        }
    });
}

