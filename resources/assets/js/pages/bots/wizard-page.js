(function(document, window, $) {
  'use strict';

  var Site = window.Site;

  $(document).ready(function($) {
    Site.run();
  });

  // Example Wizard Form
  // -------------------
  (function() {

    // set up formvalidation
    $('#typesApiForm').formValidation({
      framework: 'bootstrap',
      fields: {}
    });

    $('.bot-service-category').change(function() {
      var $this = $(this),
          category = $this.attr('data-category');

      if ($this.is(':checked')) {

        $('#' + category + '_api').show();

        $('#typesApiForm').formValidation('addField', category, {
          validators: {
            notEmpty: {
              message: "The " + category + " api is required"
            }
          }
        });
      } else {
        $('#' + category + '_api').hide();

        $('#typesApiForm').formValidation('removeField', category);
      }
    });

    $("#botInfoForm").formValidation({
      framework: 'bootstrap',
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

    $('#aiForm').formValidation({
      framework: 'bootstrap',
      fields: {
        category_slug: {
          validators: {
            notEmpty: {
              message: 'The type is required'
            }
          }
        }
      }
    });

    $("#platformForm").formValidation({
      framework: 'bootstrap',
      fields: {
        bot_platform_slug: {
          validators: {
            notEmpty: {
              message: 'The platform is required'
            }
          }
        }
      }
    });

    $("#paymentForm").formValidation({
      framework: 'bootstrap',
      fields: {
        'bot_payments_slugs[]': {
          validators: {
            notEmpty: {
              message: 'The Payment is required'
            }
          }
        }
      }
    });

    $("#phoneSipAccountForm").formValidation({
      framework: 'bootstrap',
      fields: {
      }
    });

    $("#settingsForm").formValidation({
      framework: 'bootstrap',
      fields: {
      }
    });

    // init the wizard
    var defaults = $.components.getDefaults("wizard");
    var options = $.extend(true, {}, defaults, {
      buttonsAppendTo: '.panel-body'
    });

    var wizard = $("#exampleWizardForm").wizard(options).data('wizard');

     //setup validator
     //http://formvalidation.io/api/#is-valid
    wizard.get("#chooseAi").setValidator(function() {
      var fv = $("#aiForm").data('formValidation');
      var fvAPI = $("#typesApiForm").data('formValidation');
      var fvInfo = $("#botInfoForm").data('formValidation');
      fv.validate();
      fvAPI.validate();
      fvInfo.validate();

      if (!fvInfo.isValid() || !fv.isValid() || !fvAPI.isValid()) {
        return false;
      }

      $('#botInfoForm').hide();

      return true;
    });

    wizard.get("#choosePlatform").setValidator(function() {
      var fv = $("#platformForm").data('formValidation');
      var fvInfo = $("#botInfoForm").data('formValidation');
      fv.validate();
      fvInfo.validate();

      return !(!fvInfo.isValid() || !fv.isValid());
    });

    wizard.get("#choosePayment").setValidator(function() {
      var fv = $("#paymentForm").data('formValidation');
      var fvInfo = $("#botInfoForm").data('formValidation');
      fv.validate();
      fvInfo.validate();

      if (!fvInfo.isValid() || !fv.isValid()) {
        return false;
      }

      initCreateSettings();
      createUploadFileLangForm();

      return true;
    });

    wizard.get("#choosePhoneSipAccount").setValidator(function() {
      //var fv = $("#phoneSipAccountForm").data('formValidation');
      //var fvInfo = $("#botInfoForm").data('formValidation');
      //fv.validate();
      //fvInfo.validate();
      //
      //if (!fvInfo.isValid() || !fv.isValid()) {
      //  return false;
      //}
      //
      //initCreateSettings();

      return true;
    });

    wizard.get("#enterSettings").setValidator(function() {
      var fv = $("#settingsForm").data('formValidation');
      var fvInfo = $("#botInfoForm").data('formValidation');
      fv.validate();
      fvInfo.validate();

      if (!fvInfo.isValid() || !fv.isValid()) {
        return false;
      }

      //send AJAX request for create bot
      sendCreateBotRequest();

      return true;
    });
  })();

})(document, window, jQuery);
