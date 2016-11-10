var services = {
    "hotels": {
        "document_type_hotel": {
            "title": "Document Type",
            "placeholder": "Enter Document Type",
            "validator_rules": {
                notEmpty: {
                    message: 'The Document Type is required'
                }
            }
        },
        "agency_name_hotel": {
            "title": "Agency Name",
            "placeholder": "Enter Agency Name",
            "validator_rules": {
                notEmpty: {
                    message: 'The Agency Name is required'
                }
            }
        },
        "phone_number_hotel": {
            "title": "Phone Number",
            "placeholder": "Enter Phone Number",
            "validator_rules": {
                notEmpty: {
                    message: 'The Phone Number is required'
                }
            }
        },
        "email_hotel": {
            "title": "E-mail",
            "placeholder": "Enter E-mail",
            "validator_rules": {
                notEmpty: {
                    message: 'The E-mail is required'
                },
                emailAddress: {
                    message: 'Incorrect email'
                }
            }
        },
        "ta_block_hotel": {
            "title": "Thank you block",
            "input_type": 'textarea',
            "placeholder": "Enter thank you message",
            "validator_rules": {
                notEmpty: {
                    message: 'The Thank you block is required'
                }
            }
        },
        "delayed_arrival_block_hotel": {
            "title": "Delayed arrival block",
            "input_type": 'textarea',
            "placeholder": "Enter ",
            "validator_rules": {
                notEmpty: {
                    message: 'The Delayed arrival block is required'
                }
            }
        },
        "please_note_block_hotel": {
            "title": "Please note block",
            "input_type": 'textarea',
            "placeholder": "Enter please note message",
            "validator_rules": {
                notEmpty: {
                    message: 'The Please note block is required'
                }
            }
        },
        "terms_conditions_block_hotel": {
            "title": "General terms & conditions block",
            "input_type": 'textarea',
            "placeholder": "Enter general terms & conditions message",
            "validator_rules": {
                notEmpty: {
                    message: 'The General terms & conditions block is required'
                }
            }
        },
        "wishes_block_hotel": {
            "title": "Wishes block",
            "input_type": 'textarea',
            "placeholder": "Enter wishes message",
            "validator_rules": {
                notEmpty: {
                    message: 'The Wishes Block is required'
                }
            }
        }
    },
    "flights": {
        "document_type_flight": {
            "title": "Document Type",
            "placeholder": "Enter Document Type",
            "validator_rules": {
                notEmpty: {
                    message: 'The Document Type is required'
                }
            }
        },
        "agency_name_flight": {
            "title": "Agency Name",
            "placeholder": "Enter Agency Name",
            "validator_rules": {
                notEmpty: {
                    message: 'The Agency Name is required'
                }
            }
        },
        "phone_number_flight": {
            "title": "Phone Number",
            "placeholder": "Enter Phone Number",
            "validator_rules": {
                notEmpty: {
                    message: 'The Phone Number is required'
                }
            }
        },
        "email_flight": {
            "title": "E-mail",
            "placeholder": "Enter E-mail",
            "validator_rules": {
                notEmpty: {
                    message: 'The E-mail is required'
                },
                emailAddress: {
                    message: 'Incorrect email'
                }
            }
        }
    }
};

function createVoucherForm (form_validate, $vouchers_forms, services_categories, voucher_data) {
    for (var key in services_categories) {
        var service_category = services_categories[key],
            $voucher_form = $vouchers_forms[service_category];

        $.each(services[service_category], function(key, value) {
            var inputSettingsForm = '<div class="form-group">'
                + '<label class="control-label">'+ value.title +'</label>';

            if (value.input_type == 'textarea') {
                inputSettingsForm += '<textarea class="form-control" name="' + key + '" placeholder="' + value.placeholder +'"></textarea>';
            } else {
                inputSettingsForm += '<input type="text" class="form-control input-'+ key +' " name="' + key + '" placeholder="' + value.placeholder + '">';
            }

            inputSettingsForm += '</div>';
            $voucher_form.append(inputSettingsForm);

            form_validate.formValidation('addField', key, {
                validators: value['validator_rules']
            });
        });
    }

    for (var key in voucher_data) {
        $('.input-' + key).val(voucher_data[key]);
        $('textarea[name="' + key + '"]').text(voucher_data[key]);
    }
}

