$("#createRoomForm").formValidation({
    framework: 'bootstrap',
    fields: {
        room_id: {
            validators: {
                notEmpty: {
                    message: 'The Room ID is required'
                }
            }
        },
        room_description: {
            validators: {
                notEmpty: {
                    message: 'The Room Description is required'
                }
            }
        }
    }
});

var image_upload_room;
Dropzone.options.imageUpload = {
    autoProcessQueue: false,
    uploadMultiple: true,
    parallelUploads: 100,
    maxFiles: 100,
    maxFilesize: 2,
    acceptedFiles: ".jpeg,.jpg,.png,.gif",
    init: function() {
        image_upload_room = this; // closure

        this.on("success", function(file, responseText) {
            $('#createRoomBlock').hide();
            $('.modal-footer').hide();
            $('#success_create_minihotel_room').show('normal');

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

function sendCreateRoomRequest (url_request) {
    var fv = $("#createRoomForm").data('formValidation');
    fv.validate();

    if (!fv.isValid()) {
        return false;
    }

    $.ajax({
        type: "POST",
        cache: false,
        url: url_request,
        data: $('#createRoomForm').serialize(),
        success: function (response) {
            if ($('.dz-image-preview').length > 0) {
                $('#room_id').val(response.room_id);
                image_upload_room.processQueue();
            } else {
                $('#createRoomBlock').hide();
                $('.modal-footer').hide();
                $('#success_create_minihotel_room').show('normal');

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
