var names_types = {
    "hotels": "Hotel API",
    "flights": "Flight API"
};

var services = {
    "silverbyte": {
        "title" : "Silverbyte",
        "tourism": true,
        "fields": {
            "inc": {
                "silverbyte_auth_login_inc": {
                    "title": "Authorization Login",
                    "placeholder": "Enter authorization login",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The authorization login INC is required'
                        }
                    }
                },
                "silverbyte_auth_password_inc": {
                    "title": "Authorization Password",
                    "placeholder": "Enter authorization password",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The authorization password INC is required'
                        }
                    },
                    "password": true
                },
                "silverbyte_auth_customer_id_inc": {
                    "title": "Customer ID",
                    "placeholder": "Enter customer id",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The customer id INC is required'
                        }
                    }
                }
            },
            "pnim": {
                "silverbyte_auth_login_pnim": {
                    "title": "Authorization Login",
                    "placeholder": "Enter authorization login",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The authorization login PNIM is required'
                        }
                    }
                },
                "silverbyte_auth_password_pnim": {
                    "title": "Authorization Password",
                    "placeholder": "Enter authorization password",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The authorization password PNIM is required'
                        }
                    },
                    "password": true
                },
                "silverbyte_auth_customer_id_pnim": {
                    "title": "Customer ID",
                    "placeholder": "Enter customer id",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The customer id PNIM is required'
                        }
                    }
                }
            }
        }
    },
    "minihotel": {
        "title" : "Mini Hotel",
        "fields": {
            "minihotel_auth_username": {
                "title": "Authorization Username",
                "placeholder": "Enter authorization username",
                "validator_rules": {
                    notEmpty: {
                        message: 'The authorization username is required'
                    }
                }
            },
            "minihotel_auth_password": {
                "title": "Authorization Password",
                "placeholder": "Enter authorization password",
                "validator_rules": {
                    notEmpty: {
                        message: 'The authorization password is required'
                    }
                },
                "password": true
            }
        }
    },
    "arkia": {
        "title" : "Arkia",
        "fields": {
            "arkia_system_id": {
                "title": "System ID",
                "placeholder": "Enter system id",
                "validator_rules": {
                    notEmpty: {
                        message: 'The system id is required'
                    }
                }
            },
            "arkia_agent_id": {
                "title": "Agent ID",
                "placeholder": "Enter agent id",
                "validator_rules": {
                    notEmpty: {
                        message: 'The agent id is required'
                    }
                }
            },
            "arkia_agency_id": {
                "title": "Customer ID",
                "placeholder": "Enter customer id",
                "validator_rules": {
                    notEmpty: {
                        message: 'The customer id is required'
                    }
                }
            }
        }
    },
    "innstant_hotel": {
        "title" : "Innstant Hotel",
        "tourism": true,
        "fields": {
            "inc": {
                "innstant_username_hotel_inc": {
                    "title": "Hotel username",
                    "placeholder": "Enter hotel username",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The hotel username INC is required'
                        }
                    }
                },
                "innstant_password_hotel_inc": {
                    "title": "Hotel password",
                    "placeholder": "Enter hotel password",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The hotel password INC is required'
                        }
                    },
                    "password": true
                },
                "innstant_agent_hotel_inc": {
                    "title": "Hotel agent",
                    "placeholder": "Enter hotel agent",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The hotel agent INC is required'
                        }
                    }
                }
            },
            "out": {
                "innstant_username_hotel_out": {
                    "title": "Hotel username",
                    "placeholder": "Enter hotel username",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The hotel username OUT is required'
                        }
                    }
                },
                "innstant_password_hotel_out": {
                    "title": "Hotel password",
                    "placeholder": "Enter hotel password",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The hotel password OUT is required'
                        }
                    },
                    "password": true
                },
                "innstant_agent_hotel_out": {
                    "title": "Hotel agent",
                    "placeholder": "Enter hotel agent",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The hotel agent OUT is required'
                        }
                    }
                }
            },
            "pnim": {
                "innstant_username_hotel_pnim": {
                    "title": "Hotel username",
                    "placeholder": "Enter hotel username",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The hotel username PNIM is required'
                        }
                    }
                },
                "innstant_password_hotel_pnim": {
                    "title": "Hotel password",
                    "placeholder": "Enter hotel password",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The hotel password PNIM is required'
                        }
                    },
                    "password": true
                },
                "innstant_agent_hotel_pnim": {
                    "title": "Hotel agent",
                    "placeholder": "Enter hotel agent",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The hotel agent PNIM is required'
                        }
                    }
                }
            }
        }
    },
    "innstant_flight": {
        "title" : "Innstant Flight",
        "tourism": true,
        "fields": {
            "inc": {
                "innstant_username_flight_inc": {
                    "title": "Flight username",
                    "placeholder": "Enter flight username",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The flight username INC is required'
                        }
                    }
                },
                "innstant_password_flight_inc": {
                    "title": "Flight password",
                    "placeholder": "Enter flight password",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The flight password INC is required'
                        }
                    },
                    "password": true
                },
                "innstant_agent_flight_inc": {
                    "title": "Flight agent",
                    "placeholder": "Enter flight agent",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The flight agent INC is required'
                        }
                    }
                }
            },
            "out": {
                "innstant_username_flight_out": {
                    "title": "Flight username",
                    "placeholder": "Enter flight username",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The flight username OUT is required'
                        }
                    }
                },
                "innstant_password_flight_out": {
                    "title": "Flight password",
                    "placeholder": "Enter flight password",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The flight password OUT is required'
                        }
                    },
                    "password": true
                },
                "innstant_agent_flight_out": {
                    "title": "Flight agent",
                    "placeholder": "Enter flight agent",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The flight agent OUT is required'
                        }
                    }
                }
            },
            "pnim": {
                "innstant_username_flight_pnim": {
                    "title": "Flight username",
                    "placeholder": "Enter flight username",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The flight username PNIM is required'
                        }
                    }
                },
                "innstant_password_flight_pnim": {
                    "title": "Flight password",
                    "placeholder": "Enter flight password",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The flight password PNIM is required'
                        }
                    },
                    "password": true
                },
                "innstant_agent_flight_pnim": {
                    "title": "Flight agent",
                    "placeholder": "Enter flight agent",
                    "validator_rules": {
                        notEmpty: {
                            message: 'The flight agent PNIM is required'
                        }
                    }
                }
            }
        }
    }

};

var platforms = {
    "facebook": {
        "facebook_page_token": {
            "title": "Facebook page token",
            "placeholder": "Enter Facebook page token",
            "validator_rules": {
                notEmpty: {
                    message: 'The Facebook page token is required'
                }
            }
        },
        "facebook_verify_token": {
            "title": "Facebook verify token",
            "placeholder": "Enter Facebook verify token",
            "validator_rules": {
                notEmpty: {
                    message: 'The Facebook verify token is required'
                }
            }
        }
    },
    "telegram": {
        "telegram_bot_token": {
            "title": "Telegram bot token",
            "placeholder": "Enter Telegram bot token",
            "validator_rules": {
                notEmpty: {
                    message: 'The Telegram bot is required'
                }
            }
        }
    }
};

var payments = {
    "paypal": {
        "title" : "Paypal",
        "fields": {
            "paypal_user": {
                "title": "User",
                "placeholder": "Enter PayPal user",
                "validator_rules": {
                    notEmpty: {
                        message: 'The PayPal user is required'
                    }
                }
            },
            "paypal_password": {
                "title": "Password",
                "placeholder": "Enter PayPal password",
                "validator_rules": {
                    notEmpty: {
                        message: 'The PayPal password is required'
                    }
                },
                "password": true
            },
            "paypal_signature": {
                "title": "Signature",
                "placeholder": "Enter PayPal signature",
                "validator_rules": {
                    notEmpty: {
                        message: 'The PayPal signature is required'
                    }
                }
            }
        }
    },
    "pelecard": {
        "title" : "Pelecard",
        "fields": {
            "pelecard_user": {
                "title": "User",
                "placeholder": "Enter Pelecard user",
                "validator_rules": {
                    notEmpty: {
                        message: 'The Pelecard user is required'
                    }
                }
            },
            "pelecard_password": {
                "title": "Password",
                "placeholder": "Enter Pelecard password",
                "validator_rules": {
                    notEmpty: {
                        message: 'The Pelecard password is required'
                    }
                },
                "password": true
            },
            "pelecard_terminal_number": {
                "title": "Terminal number",
                "placeholder": "Enter Pelecard terminal number",
                "validator_rules": {
                    notEmpty: {
                        message: 'The Pelecard terminal number is required'
                    }
                }
            }
        }
    },
    "payzen": {
        "title" : "Payzen",
        "fields": {
            "payzen_mode": {
                "title": "Mode",
                "placeholder": "Enter Payzen mode",
                "validator_rules": {
                    notEmpty: {
                        message: 'The Payzen mode is required'
                    }
                }
            },
            "payzen_shop_id": {
                "title": "Shop id",
                "placeholder": "Enter Payzen shop id",
                "validator_rules": {
                    notEmpty: {
                        message: 'The Payzen shop id is required'
                    }
                }
            },
            "payzen_certificate": {
                "title": "Certificate",
                "placeholder": "Enter Payzen certificate",
                "validator_rules": {
                    notEmpty: {
                        message: 'The Payzen certificate is required'
                    }
                }
            }
        }
    }
};

var bot_data_own = '';

function createSettings(data_settings) {
    var formValidate      = (data_settings['form_validate']) ? data_settings['form_validate'] : false,
        elementForm       = (data_settings['element_form']) ? data_settings['element_form'] : false,
        types_api         = (data_settings['types_api']) ? data_settings['types_api'] : false,
        bot_platform_slug = (data_settings['bot_platform_slug']) ? data_settings['bot_platform_slug'] : false,
        bot_payment_slugs = (data_settings['bot_payment_slugs']) ? data_settings['bot_payment_slugs'] : false,
        bot_data          = (data_settings['bot_data']) ? data_settings['bot_data'] : false,
        tourism           = (data_settings['tourism']) ? data_settings['tourism'] : false,
        greeting_text     = (data_settings['greeting_text']) ? data_settings['greeting_text'] : [],
        selected_lang     = (data_settings['selected_lang']) ? data_settings['selected_lang'] : false;

    var $settingsForm = elementForm.empty();
    bot_data_own = bot_data;

    createGreetingTextLangBlock($settingsForm, formValidate, selected_lang, greeting_text);

    if (tourism) {
        createApiTourismInput($settingsForm, formValidate, types_api, tourism);
    } else {
        createApiInput($settingsForm, formValidate, types_api);
    }

    createPlatformInput($settingsForm, formValidate, bot_platform_slug);
    createPaymentInput($settingsForm, formValidate, bot_payment_slugs);

    for (var key in bot_data) {
        if (key != 'facebook_pages' || key != 'bot_service_tourism') {
            $('input[name="' + key + '"]').val(bot_data[key]);
        }
    }

    for (var key in greeting_text) {
        $('textarea[name="bot_greeting_text[' + key + ']"]').val(greeting_text[key]);
    }
}

function createGreetingTextLangBlock ($settingsForm, formValidate, selected_lang) {
    var greeting_block = '<div class="row">',
        column_number  = 12 / selected_lang.length;

    $settingsForm.append('<h4>Bot greeting text</h4>');

    for (var key_lang in selected_lang) {
        var lang = selected_lang[key_lang];

        greeting_block += '<div class="form-group col-md-' + column_number + '">'
                                  + '<h6>' + lang.toUpperCase() + ':</h6>'
                                  + '<hr class="margin-top-5">'
                                  + '<textarea name="bot_greeting_text[' + lang + ']" class="maxlength-textarea form-control mb-sm" placeholder="Bot '
                                        + lang + ' greeting text..." rows="2" maxlength="225" data-plugin="maxlength"></textarea>'
                            + '</div>';
    }

    $settingsForm.append(greeting_block + '</div>');

    for (var key_lang in selected_lang) {
        var lang = selected_lang[key_lang];
        formValidate.formValidation('addField', 'bot_greeting_text[' + lang + ']', {
            validators: {
                notEmpty: {
                    message: 'The Bot '+ lang +' greeting text required!'
                }
            }
        });
    }
}

function createApiInput($settingsForm, formValidate, types_api) {
    for (var key in types_api) {
        var type_api = types_api[key];

        $settingsForm.append('<h4>' + names_types[type_api.name] + '</h4>');
        $settingsForm.append('<h5>' + services[type_api.value].title + '</h5>');

        var row = '<div class="row">';
        $.each(services[type_api.value].fields, function(key, value) {
            var inputSettingsForm = '<div class="form-group col-md-4">'
                + '<label class="control-label">'+ value.title +'</label>';

            if (value.password) {
                inputSettingsForm += '<input type="password" class="form-control" name="' + key + '" placeholder="' + value.placeholder +'" autocomplete="off"></div>';
            } else {
                inputSettingsForm += '<input type="text" class="form-control" name="' + key + '" placeholder="' + value.placeholder + '" autocomplete="off"></div>';
            }

            row += inputSettingsForm;
        });

        $settingsForm.append(row + '</div>');

        $.each(services[type_api.value].fields, function(key, value) {
            formValidate.formValidation('addField', key+'34', {
                validators: value['validator_rules']
            });
        });
    }
}

function createApiTourismInput($settingsForm, formValidate, types_api, tourism) {
    for (var key in types_api) {
        var type_api = types_api[key];

        $settingsForm.append('<h4>' + names_types[type_api.name] + '</h4>');
        $settingsForm.append('<h5>' + services[type_api.value].title + '</h5>');

        for (var key_tourism in tourism[type_api.value]) {
            var row = '<div class="row">',
                tourism_value = tourism[type_api.value][key_tourism];

            $settingsForm.append('<h6>' + tourism_value.toUpperCase() + ':</h6><hr class="margin-top-5">');

            for (var field_key in services[type_api.value].fields[tourism_value]) {
                var field = services[type_api.value].fields[tourism_value][field_key];

                var inputSettingsForm = '<div class="form-group col-md-4">'
                    + '<label class="control-label">' + field.title + '</label>';

                if (field.password) {
                    inputSettingsForm += '<input type="password" class="form-control" name="' + field_key + '" placeholder="' + field.placeholder + '" autocomplete="off"></div>';
                } else {
                    inputSettingsForm += '<input type="text" class="form-control" name="' + field_key + '" placeholder="' + field.placeholder + '" autocomplete="off"></div>';
                }

                row = row + inputSettingsForm;
            }

            $settingsForm.append(row + '</div>');

            for (var field_key in services[type_api.value].fields[tourism_value]) {
                var field = services[type_api.value].fields[tourism_value][field_key];
                formValidate.formValidation('addField', field_key, {
                    validators: field['validator_rules']
                });
            }


        }
    }
}

function createPaymentInput($settingsForm, formValidate, bot_payment_slugs) {
    $settingsForm.append('<h4>Payment</h4>');

    for (var key in bot_payment_slugs) {
        var bot_payment_slug = bot_payment_slugs[key];

        $settingsForm.append('<h5>' + payments[bot_payment_slug].title + '</h5>');
        var row = '<div class="row">';
        $.each(payments[bot_payment_slug].fields, function(key, value) {
            var inputSettingsForm = '<div class="form-group col-md-4">'
                + '<label class="control-label">'+ value.title +'</label>';

            if (value.password) {
                inputSettingsForm += '<input type="password" class="form-control" name="' + key + '" placeholder="' + value.placeholder +'" autocomplete="off"></div>';
            } else {
                inputSettingsForm += '<input type="text" class="form-control" name="' + key + '" placeholder="' + value.placeholder + '" autocomplete="off"></div>';
            }

            row += inputSettingsForm;
        });

        $settingsForm.append(row);

        $.each(payments[bot_payment_slug].fields, function(key, value) {
            formValidate.formValidation('addField', key, {
                validators: value['validator_rules']
            });
        });
    }
}

function createPlatformInput($settingsForm, formValidate, bot_platform_slug) {
    var platformForm = platforms[bot_platform_slug];

    $settingsForm.append('<h4>Platform</h4>');

    if (bot_platform_slug == 'facebook') {
        $settingsForm.append('<div id="facebook_pages"></div>');
        $settingsForm.append('<div id="facebook_pages_loader" class="facebook-pages-loader loader loader-ellipsis"></div>');
        getListPages();
    } else {
        $.each(platformForm, function (key, value) {
            var inputSettingsForm = '<div class="form-group">'
                + '<label class="control-label">' + value.title + '</label>'
                + '<input type="text" class="form-control" name="' + key + '" placeholder="' + value.placeholder + '">'
                + '</div>';
            $settingsForm.append(inputSettingsForm);

            formValidate.formValidation('addField', key, {
                validators: value['validator_rules']
            });
        });
    }
}

function getListPages() {
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            listPages(response.authResponse.userID);
        } else {
            $('#facebook_pages_loader').hide();
            $('#facebook_pages').append('<button type="button" onclick="loginFacebook()" class="btn btn-block btn-primary">Facebook Log In</button>');
        }
    }, true);
}

function loginFacebook() {
    FB.login(function (response) {
        if (response.authResponse) {
            FB.api('/me', function (response) {
                listPages(response.id);
            });
        } else {
            alert("Please authorize and select page!");
        }
    }, {scope: "manage_pages,business_management,pages_messaging,public_profile,email,user_birthday,user_hometown,user_location"});
}

function listPages(uid) {
    FB.api("/" + uid + "/accounts?limit=100", function (response) {
        var $facebookPages = $('#facebook_pages').empty(),
            fb_pages_block = '<div role="group" data-toggle="buttons" class="btn-group">';

        if (response.data.length > 0) {
            $.each(response.data, function (i, page) {
                fb_pages_block += '<label id="label_'+ page.id +'" class="btn btn-outline btn-primary margin-3">'
                    + '<input id="page_id" class="' + page.id + '" type="checkbox" autocomplete="off" name="facebook_pages['+ i +'][id]" value="'+ page.id +'">'
                    + '<input id="page_name" class="' + page.id + '" type="checkbox" autocomplete="off" name="facebook_pages['+ i +'][name]" value="'+ page.name +'">'
                    + '<input id="page_access_token" class="' + page.id + '" type="checkbox" autocomplete="off" name="facebook_pages['+ i +'][access_token]" value="'+ page.access_token +'">'
                    + '<i aria-hidden="true" class="icon fa-file-text-o text-active"></i>'
                    + page.name
                    + '</label>';
            });
        } else {
            fb_pages_block += '<p>No pages were found!</p>';
        }

        fb_pages_block += '</div>';
        $facebookPages.append(fb_pages_block);

        if (bot_data_own['facebook_pages_all']) {
            for (var page in bot_data_own['facebook_pages_all']) {
                var id = bot_data_own['facebook_pages_all'][page].page_id;

                $('.' + id).prop('disabled', true);
                $('#label_' + id).addClass('disabled');
            }
        }

        if (bot_data_own['facebook_pages_bot']) {
            for (var page in bot_data_own['facebook_pages_bot']) {
                var id = bot_data_own['facebook_pages_bot'][page].page_id;

                $('.' + id).prop('checked', true).prop('disabled', false);
                $('#label_' + id).addClass('active').removeClass('disabled');
            }
        }

        $('#facebook_pages_loader').hide();
    });
}
