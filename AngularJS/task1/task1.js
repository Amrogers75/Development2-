/**
 * Created by anthonyrogers on 7/20/16.
 */
(function(){
var app = angular.module('myApp');
app.component('task1List', {
    templateUrl: 'task1/task1.html',
    controller: todoCtrl
})
    .config(task1ListConfig);

function task1ListConfig($stateProvider) {
    $stateProvider.state('task1', {
        url: '/task1',
        template: '<task1-list></task1-list>'
    });
}

function todoCtrl() {
    var self = this;
    self.todoList = [{todoText: 'Hi Dad', done: false}];

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
