var ModuleFlights = angular.module('ModuleOrdersList', ['ngSanitize'])
    .filter('startFrom', function(){
        return function(input, start){
            start = +start;
            return typeof(input) !== 'undefined' ? input.slice(start) : 0;
        }
    });

ModuleFlights.controller("OrdersListFilter", function($scope, $http) {
    $scope.orders = [];
    var last_page_number = 0;

    $http.post(path).then(function(response) {
        $scope.orders = response.data;
        last_page_number = Math.ceil($scope.orders.length / $scope.itemsPerPage - 1);
    });

    // search filter
    $scope.search_query = '';

    // filter orderBy: id, status, gender, date
    $scope.reverse = false;
    $scope.predicate  = 'id';

    $scope.orderBy = function (predicate, is_float) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;

        if (is_float) {
            angular.forEach($scope.orders, function (value) {
                for (var key in value) {
                    if (key == predicate && value[key] != '')
                        value[key] = parseFloat(value[key]);
                }
            });
        }

        $scope.firstPage();
    };

    //Pagination
    $scope.active = [true];
    $scope.currentPage  = 0;
    $scope.itemsPerPage = 8;

    $scope.firstPage = function () {
        $scope.currentPage = 0;
        $scope.pageActive();
    };

    $scope.lastPage = function () {
        $scope.currentPage = last_page_number;
        $scope.pageActive();
    };

    $scope.startingItem = function () {
        return $scope.currentPage * $scope.itemsPerPage;
    };

    $scope.pageBack = function () {
        var current_page = $scope.currentPage - 1;
        if (current_page >= 0) {
            $scope.currentPage = current_page;
            $scope.pageActive();
        }
    };

    $scope.pageForward = function () {
        var current_page = $scope.currentPage + 1;
        if (current_page <= last_page_number) {
            $scope.currentPage = current_page;
            $scope.pageActive();
        }
    };
    $scope.pageShow = function (n) {
        $scope.currentPage = n;
        $scope.pageActive();
    };

    $scope.pageActive = function () {
        $scope.active = [];
        $scope.active[$scope.currentPage] = true;
    };

    $scope.byOrdersAmount = function (filtered_orders) {
        $scope.pages = [];
        var i = 0;

        if ($scope.currentPage >= $scope.itemsPerPage){
            i = $scope.currentPage - 5;
        }

        for (i; i < Math.ceil(filtered_orders / $scope.itemsPerPage); ++i) {
            $scope.pages.push(i);
        }
    };
});
