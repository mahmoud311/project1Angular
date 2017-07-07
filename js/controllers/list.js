appquiz.controller("listCtrl", function ($scope, $state, DataServ) {
    $scope.vm = {};
    DataServ.turtlesData().then(function (res) {
        $scope.vm.data = res;
        console.log($scope.vm.data);
    });
    $scope.vm.activeTurtle = {};
    $scope.changeActiveTurtle = function ($index) {
        $scope.vm.activeTurtle = $index;
    };
    $scope.search = "";
    // $scope.activateQuiz = function () {
    //     $state.go("quiz");
    // };
});
