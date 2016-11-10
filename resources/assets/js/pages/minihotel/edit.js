(function(document, window, $) {
    'use strict';

    var Site = window.Site;
    $(document).ready(function () {
        Site.run();

        $('.hotel-name').keyup( function() {
            $('#title_hotel_name').text($(this).val());
        });

        //init hotel image carousel
        $('#exampleResponsive').slick({
            dots: true,
            centerMode: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            variableWidth: true
        });

        //init form validation for hotel data
        $("#minihotelHotelForm").formValidation({
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

    });
})(document, window, jQuery);

$(document).on('click', '.delete-room', function() {
    var delete_url = $(this).attr('data-url-delete');

    bootbox.dialog({
        message: "Do you want to delete the room?",
        buttons: {
            success: {
                label: "Delete",
                className: "btn-danger",
                callback: function() {
                    document.location.href = delete_url;
                }
            }
        }
    });
});

var image_upload;
Dropzone.options.uploadHotelImage = {
    autoProcessQueue: false,
    uploadMultiple: true,
    parallelUploads: 100,
    maxFiles: 100,
    maxFilesize: 2,
    acceptedFiles: ".jpeg,.jpg,.png,.gif",
    init: function() {
        image_upload = this; // closure

        this.on("success", function(file, responseText) {
            $('.dropzone').hide();
            $('.modal-footer').hide();
            $('#success_upload_hotel_image').show('normal');

            setTimeout(function()
            {
                $('#uploadHotelImageForm').modal('hide');
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

var image_room_upload;
Dropzone.options.uploadRoomImage = {
    autoProcessQueue: false,
    uploadMultiple: true,
    parallelUploads: 100,
    maxFiles: 100,
    maxFilesize: 2,
    acceptedFiles: ".jpeg,.jpg,.png,.gif",
    init: function() {
        image_room_upload = this; // closure

        this.on("success", function(file, responseText) {
            $('.dropzone').hide();
            $('.modal-footer').hide();
            $('#success_upload_room_image').show('normal');

            setTimeout(function()
            {
                $('#uploadRoomImageForm').modal('hide');
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

function editHotelRequest (url_request) {
    var $minihotel_hotel_form = $("#minihotelHotelForm"),
        fv = $minihotel_hotel_form.data('formValidation');
    fv.validate();

    if (!fv.isValid()) {
        return false;
    }

    $.ajax({
        type: "POST",
        cache: false,
        url: url_request,
        data: $minihotel_hotel_form.serialize(),
        success: function() {
            alertify.success('Hotel data saved success!');
        },
        error: function() {
            alertify.error('Hotel data saved fail!');
        }
    });
}

function deleteImage (url_request, image_path, $this) {
    $.ajax({
        type: "POST",
        cache: false,
        url: url_request,
        data: {"image_path": image_path},
        success: function() {
            $($this).closest('div').remove();
            alertify.success('The image deleted success!');
        },
        error: function() {
            alertify.error('The image deleted fail!');
        }
    });
}

function uploadHotelImage () {
    image_upload.processQueue();
}

function uploadRoomImage () {
    image_room_upload.processQueue();
}


function createEditRoomForm () {

}
