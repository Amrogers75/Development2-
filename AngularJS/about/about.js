/**
 * Created by anthonyrogers on 7/15/16.
 */
var app = angular.module('myApp');
app.component('aboutList', {
    templateUrl: 'about/about.html'
    //controller: todoCtrl
})
    .config(aboutListConfig);

function aboutListConfig($stateProvider) {
    $stateProvider.state('about', {
        url: '/about',
        template: '<about-list></about-list>'
    });
}

// function todoCtrl() {
//     var self = this;
//     self.todoList = [{todoText: 'Hi Mom', done: false}];
//
//     self.todoAdd = function () {
//         self.todoList.push({todoText: self.todoInput, done: false});
//         self.todoInput = "";
//     };
//
//     self.remove = function () {
//         var oldList = self.todoList;
//         self.todoList = [];
//         angular.forEach(oldList, function (x) {
//             if (!x.done) self.todoList.push(x);
//         });
//     };
//}
