
/**
 * Created by anthonyrogers on 7/15/16.
 */
(function(){
    var app = angular.module('myApp');
    app.component('taskList', {
        templateUrl: 'task/task.html',
        controller: todoCtrl
    })
        .config(taskListConfig);

    function taskListConfig($stateProvider) {
        $stateProvider.state('main', {
            url: '/main',
            template: '<task-list></task-list>'
        });
    }

    function todoCtrl() {
        var self = this;
        self.todoList = [{todoText: 'Hi Mom', done: false}];

        self.todoAdd = function () {
            self.todoList.push({todoText: self.todoInput, done: false});
            self.todoInput = "";
        };

        self.remove = function () {
            var oldList = self.todoList;
            self.todoList = [];
            angular.forEach(oldList, function (x) {
                if (!x.done) self.todoList.push(x);
            });
        };
    }

})();
