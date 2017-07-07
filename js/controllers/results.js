appquiz.controller("resultsCtrl", function ($scope, $state, DataServ) {
    $scope.activeQuestion = 0;
    $scope.corre = DataServ.correctAnswers;
    DataServ.getQuizQuestions().then(function (res) {
            console.log(res);
        if (!res) {
            $state.go("index");
        } else {
            $scope.quizQuestions = res;
            console.log($scope.quizQuestions);
            console.log("xxxxasdasdasdasdasd");
            markQu($scope.quizQuestions);
        }
    });
    $scope.getAnswerClass = function ($index) {
        if ($index === $scope.corre[$scope.activeQuestion]) {
            return "bg-success";
        } else if ($index === $scope.quizQuestions[$scope.activeQuestion].selected) {
            return "bg-danger";
        }
    };
    $scope.reset = function () {
        DataServ.resetQuizQuestions();
        $state.go("index");
    }
    $scope.setActiveQuestion = function ($index) {
        $scope.activeQuestion = $index;
    };
    // function setActiveQuestion($index) {
    //     $scope.activeQuestion = $index;
    // }
    function markQu(data) {
        $scope.numCorrect = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].selected === $scope.corre[i]) {
                data[i].correct = true;
                $scope.numCorrect++;
            } else {
                data[i].correct = false;
            }
        }
        console.log(data);
        $scope.calPerc = $scope.numCorrect / data.length * 100;
    }
    $scope.previous = function () {
        $scope.activeQuestion = $scope.activeQuestion - 1;
        if ($scope.activeQuestion == -1) {
            $scope.activeQuestion = 0;
        }
        console.log($scope.activeQuestion);
    };
    $scope.next = function () {
        if ($scope.activeQuestion == $scope.quizQuestions.length - 1) {
            $scope.activeQuestion = $scope.quizQuestions.length - 2;
        }
        $scope.activeQuestion = $scope.activeQuestion + 1;
        console.log($scope.activeQuestion);
    };
}); 
