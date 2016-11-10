(function(document, window, $) {
  'use strict';

  window.AppContacts = App.extend({
    handleAction: function() {

      var $selectable = $('[data-selectable]');

      $('.site-action-toggle', '.site-action').on('click', function(e) {
        var $selected = $selectable.asSelectable('getSelected');

        if ($selected.length === 0) {
          $('#addUserForm').modal('show');
          e.stopPropagation();
        }
      });

      $selectable.on('asSelectable::change', function(e, api, checked) {
        if (checked) {
          $('#open-send-form').show()
        } else {
          //actionBtn.hide();
          $('#open-send-form').hide()
        }
      });
    },

    handleEdit: function() {
      $(document).on('click', '[data-toggle=edit]', function() {
        var $button = $(this),
          $panel = $button.parents('.slidePanel'),
          $form = $panel.find('.user-info');

        $button.toggleClass('active');
        $form.toggleClass('active');
      });

      $(document).on('slidePanel::afterLoad', function(e, api) {
        $.components.init('material', api.$panel);
      });

      $(document).on('change', '.user-info .form-group', function(e) {
        var $input = $(this).find('input'),
          $span = $(this).siblings('span');
        $span.html($input.val());
      });

    },

    handleListItem: function() {
      $('#addLabelToggle').on('click', function(e) {
        $('#addLabelForm').modal('show');
        e.stopPropagation();
      });

      $(document).on('click', '[data-tag=list-delete]', function(e) {
        bootbox.dialog({
          message: "Do you want to delete the contact?",
          buttons: {
            success: {
              label: "Delete",
              className: "btn-danger",
              callback: function() {
                // $(e.target).closest('.list-group-item').remove();
              }
            }
          }
        });
      });
    },

    run: function(next) {
      this.handleAction();
      this.handleEdit();
      this.handleListItem();

      $('#addlabelForm').modal({
        show: false
      });

      $('#addUserForm').modal({
        show: false
      });

      next();
    }
  });

  $(document).ready(function() {
    AppContacts.run();
  });
})(document, window, jQuery);


var ModuleFlights = angular.module('ModuleUsersList', ['ngSanitize']);

ModuleFlights.controller("UsersListFilter", function($scope) {
  $scope.users = initUsersData();
  $scope.activePage = initFbPage();
  var last_page_number = 0;

  // facebook page select
  $scope.pageChange = function (page_id) {
    $scope.activePage = page_id;
  };

  // search filter
  $scope.search_query = '';

  // filter orderBy: id, status, gender, date
  $scope.reverse = false;
  $scope.predicate  = 'id';

  $scope.orderBy = function (predicate, is_float) {
    $scope.predicate = predicate;
    $scope.reverse = !$scope.reverse;

    if (is_float) {
      angular.forEach($scope.users, function (value) {
        for (var key in value) {
          if (key == predicate && value[key] != '')
            value[key] = parseFloat(value[key]);
        }
      });
    }

    //$scope.firstPage();
  };

  //Pagination
  //$scope.active = [true];
  //$scope.currentPage  = 0;
  //$scope.itemsPerPage = 8;
  //
  //$scope.firstPage = function () {
  //  $scope.currentPage = 0;
  //  $scope.pageActive();
  //};
  //
  //$scope.lastPage = function () {
  //  $scope.currentPage = last_page_number;
  //  $scope.pageActive();
  //};
  //
  //$scope.startingItem = function () {
  //  return $scope.currentPage * $scope.itemsPerPage;
  //};
  //
  //$scope.pageBack = function () {
  //  var current_page = $scope.currentPage - 1;
  //  if (current_page >= 0) {
  //    $scope.currentPage = current_page;
  //    $scope.pageActive();
  //  }
  //};
  //
  //$scope.pageForward = function () {
  //  var current_page = $scope.currentPage + 1;
  //  if (current_page <= last_page_number) {
  //    $scope.currentPage = current_page;
  //    $scope.pageActive();
  //  }
  //};
  //$scope.pageShow = function (n) {
  //  $scope.currentPage = n;
  //  $scope.pageActive();
  //};
  //
  //$scope.pageActive = function () {
  //  $scope.active = [];
  //  $scope.active[$scope.currentPage] = true;
  //};
  //
  //$scope.byOrdersAmount = function (filtered_orders) {
  //  $scope.pages = [];
  //  var i = 0;
  //
  //  if ($scope.currentPage >= $scope.itemsPerPage){
  //    i = $scope.currentPage - 5;
  //  }
  //
  //  for (i; i < Math.ceil(filtered_orders / $scope.itemsPerPage); ++i) {
  //    $scope.pages.push(i);
  //  }
  //};
});
