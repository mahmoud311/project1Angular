appquiz.service("DataServ", function ($http, $q, $state) {
    var myDataQuestions = null;
    var myDataTurtlesData = null;
    var currentNum = null;
    var getQuizQuestions = function (num) {
        //console.log(num)

        var deferred = $q.defer();
        console.log("currentNum",currentNum)
        console.log("num",num)
        if (!currentNum && !num)
            deferred.resolve(null);
        else {
            if (myDataQuestions && (currentNum == num || !num)) {
                deferred.resolve(myDataQuestions);
            } else {
                currentNum = num;
                $http.get('questions' + currentNum + '.json').then(function (res) {
                    if (res) {
                        myDataQuestions = res.data.quizQuestions;
                        deferred.resolve(res.data.quizQuestions);
                    } else {
                        deferred.resolve(null);
                    }
                })
            }
        }
        return deferred.promise;
    };
    var updateQuizQuestions = function (qs) {
        myDataQuestions = qs;
    };
    var resetQuizQuestions = function (qs) {
        myDataQuestions = null;
    };
    var correctAnswers = [0, 2, 3, 0, 2, 0, 3, 2, 0, 3];
    var turtlesData = function () {
        var deferred = $q.defer();
        if (myDataTurtlesData) {
            deferred.resolve(myDataTurtlesData);
        } else {
            $http.get('data.json').then(function (res) {
                if (res) {
                    myDataTurtlesData = res.data;
                    deferred.resolve(res.data);
                } else {
                    deferred.resolve(null);
                }
            })
        }
        return deferred.promise;
    };
    return {
        getQuizQuestions: getQuizQuestions,
        turtlesData: turtlesData,
        updateQuizQuestions: updateQuizQuestions,
        correctAnswers: correctAnswers,
        resetQuizQuestions: resetQuizQuestions
    }
});