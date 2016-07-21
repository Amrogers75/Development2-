/**
 * Created by anthonyrogers on 7/20/16.
 */
function () {

    angular.module('myApp')
    //.service('taskService', taskService);
        .service('todoCtrl', todoCtrl);
    
    /*function taskService() {
     var self = this;
     self.selectedtask = undefined;
     //self.getRandomTask = getRandomTask;
     }*/

    function todoCtrl() {
        var self = this;
        self.todoList = [{todoText: 'Hi Mom', done: false}];

        self.todoAdd = function () {
            self.todoList.push({todoText: self.todoInput, done: false});
            self.todoInput = "";
        }
    }