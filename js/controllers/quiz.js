appquiz.controller("quizCtrl", function ($scope, $http, $rootScope, DataServ, $state, $stateParams) {
    $scope.vm = {};
    console.log($stateParams.id);
    //       conrole.log($state.id);
    DataServ.getQuizQuestions($stateParams.id).then(function (res) {
        $scope.quizQuestions = res;
        console.log(res);
    });
    $scope.error = false;
    $scope.finalise = false
    $scope.activeQuestion = 0;
    $scope.numQuestionsAnswered = 0;
    $scope.setActiveQuestion = function (index) {
        if (index === undefined) {
            var breakOut = false;
            var quizLength = $scope.quizQuestions.length - 1;
            while (!breakOut) {
                $scope.activeQuestion = $scope.activeQuestion < quizLength ? ++$scope.activeQuestion : 0;
                if ($scope.activeQuestion === 0) {
                    $scope.error = true;
                }
                if ($scope.quizQuestions[$scope.activeQuestion].selected == null) {
                    breakOut = true;
                }
            }
        } else {
            console.log(index);
            $scope.activeQuestion = index;
        }
    };
    $scope.finaliseAnswers = function () {
        $scope.finalise = false;
        DataServ.updateQuizQuestions($scope.quizQuestions);
        $scope.numQuestionsAnswered = 0;
        $scope.activeQuestion = 0;
        $state.go("results");
    };
    $scope.selectAnswer = function (index) {
        $scope.quizQuestions[$scope.activeQuestion].selected = index;
    };
    $scope.done = function () {
        $scope.finalise = true;
    };
    $scope.previous = function () {
        $scope.activeQuestion = $scope.activeQuestion - 1;
        if ($scope.activeQuestion == -1) {
            $scope.activeQuestion = 0;
        }
    };
    $scope.next = function () {
        if ($scope.activeQuestion == $scope.quizQuestions.length - 1) {
            $scope.activeQuestion = $scope.quizQuestions.length - 2;
        }
        var quizLength = $scope.quizQuestions.length;
        if ($scope.quizQuestions[$scope.activeQuestion].selected !== null) {
            $scope.numQuestionsAnswered = $scope.numQuestionsAnswered + 1;
            if ($scope.numQuestionsAnswered >= quizLength) {
                for (var i = 0; i < quizLength; i++) {
                    if ($scope.quizQuestions[i].selected === null) {
                        $scope.setActiveQuestion(i);
                        return;
                    }
                }
                $scope.error = false;
                console.log("finish");
                $scope.finalise = true;
                return;
            }
        }
        $scope.setActiveQuestion();
    };
});
