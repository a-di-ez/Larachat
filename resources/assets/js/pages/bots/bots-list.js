  $(document).on('click', '[data-tag=project-delete]', function() {
    var delete_url = $(this).attr('data-url-delete');

    bootbox.dialog({
      message: "Do you want to delete the bot?",
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

  var services_tourism = {
    "innstant_hotel": ['inc', 'out', 'pnim'],
    "innstant_flight": ['inc', 'out', 'pnim'],
    "silverbyte": ['inc', 'pnim']
  };

  function createTourismCheckbox (tourism, service) {
    return '<label class="checkbox btn btn-outline btn-primary margin-3">'
      + '<input type="checkbox" class="checkbox service-tourism" value="' + tourism + '" autocomplete="off" data-service="' + service + '">'
      + '<i class="icon fa-users text-active" aria-hidden="true"></i>' + tourism
      + '</label>'
  }

  $('.bot-service').change(function (e) {
    var $this = $(e.target),
        $tourism_block = $('#' + $this.attr('name') + '_tourism_block');

    $tourism_block.empty();

    if ($this.prop('checked') && services_tourism[$this.val()]) {
      var wrap_link = '<h6>Select tourism:</h6><div class="row margin-left-3" role="group" data-toggle="buttons">';

      for (var key in services_tourism[$this.val()]) {
        var value = services_tourism[$this.val()][key];
        wrap_link += createTourismCheckbox (value, $this.val());
      }

      $tourism_block.append(wrap_link + '</div>');
    }
  });
