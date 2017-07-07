var appquiz = angular.module("projectQuizEdit", ["ui.router"])
    .config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
        $stateProvider
            .state("index", {
                url: "/",
                templateUrl: "views/mainList.html",
                controller: "listCtrl"
            })
            .state("quiz", {
                url: "/quiz/:id",
                templateUrl: "views/quiz.html",
                controller: "quizCtrl"
            })
            .state("results", {
                url: "/results",
                templateUrl: "views/results.html",
                controller: "resultsCtrl"
            });
        $urlRouterProvider.otherwise('/');
    });

