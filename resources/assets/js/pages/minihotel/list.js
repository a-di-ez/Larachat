$(document).on('click', '.delete-hotel', function() {
    var delete_url = $(this).attr('data-url-delete');

    bootbox.dialog({
        message: "Do you want to delete the hotel?",
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

window.AppForum = App.extend({
    run: function(next) {
        next();
    }
});

$(document).ready(function() {
    AppForum.run();
});

