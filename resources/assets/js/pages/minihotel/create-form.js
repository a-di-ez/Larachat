$("#createHotelForm").formValidation({
    framework: 'bootstrap',
    fields: {
        hotel_name: {
            validators: {
                notEmpty: {
                    message: 'The Hotel Name is required'
                }
            }
        },
        hotel_id: {
            validators: {
                notEmpty: {
                    message: 'The Hotel ID is required'
                }
            }
        },
        hotel_city_id: {
            validators: {
                notEmpty: {
                    message: 'The Hotel City is required'
                }
            }
        },
        hotel_address: {
            validators: {
                notEmpty: {
                    message: 'The Hotel Address is required'
                }
            }
        },
        hotel_description: {
            validators: {
                notEmpty: {
                    message: 'The Hotel Description is required'
                }
            }
        }
    }
});

var image_upload;
Dropzone.options.imageUpload = {
    autoProcessQueue: false,
    uploadMultiple: true,
    parallelUploads: 100,
    maxFiles: 100,
    maxFilesize: 2,
    acceptedFiles: ".jpeg,.jpg,.png,.gif",
    init: function() {
        image_upload = this; // closure

        this.on("success", function(file, responseText) {
            $('#createHotelBlock').hide();
            $('.modal-footer').hide();
            $('#success_create_minihotel').show('normal');

            setTimeout(function()
            {
                $('#addProjectForm').modal('hide');
                location.reload(true);
            }, 3000);
        });

        this.on("addedfile", function(file) {
            var removeButton = Dropzone.createElement("<button>Remove file</button>");
            var _this = this;

            removeButton.addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();

                _this.removeFile(file);
            });

            file.previewElement.appendChild(removeButton);
        });
    }
};

function sendCreateHotelRequest (url_request) {
    var fv = $("#createHotelForm").data('formValidation');
    fv.validate();

    if (!fv.isValid()) {
        return false;
    }

    $.ajax({
        type: "POST",
        cache: false,
        url: url_request,
        data: $('#createHotelForm').serialize(),
        success: function (response) {
            if ($('.dz-image-preview').length > 0) {
                $('#hotel_id').val(response.hotel_id);
                image_upload.processQueue();
            } else {
                $('#createHotelBlock').hide();
                $('.modal-footer').hide();
                $('#success_create_minihotel').show('normal');

                setTimeout(function()
                {
                    $('#addProjectForm').modal('hide');
                    location.reload(true);
                }, 3000);
            }
        },
        error: function(error) {
        }
    });
}
