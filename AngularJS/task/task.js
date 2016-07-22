
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
        self.todoList = [{todoText: 'Clean The Toilet', done: false}];

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

/*

(function(){

    angular.module('myApp')
        .component('charList', { // the tag for using this is <char-list>
            templateUrl: "characters/char-list.component.html",
            controller: charListController
        })
        .config(charListConfig);

    function charListConfig($stateProvider) {
        $stateProvider.state('main', {
            url: '/main',
            template: '<char-list></char-list>'
        });
    }

    function charListController(characterService) {

        // variables
        var self = this;
        self.orderBy = 'name';
        self.sortClass= 'sort-asc';
        self.columns = ['name','gender','mass'];
        self.selectedChar = characterService.selectedChar;
        self.characters = characterService.characters;

        // functions
        self.sort = sort;
        self.selectChar = selectChar;
        self.close = close;

        function sort(attribute) {
            self.sortClass = 'sort-asc'; // down arrow
            var newOrderBy = attribute;
            if (self.orderBy === attribute) {
                newOrderBy = '-' + attribute;
                self.sortClass = 'sort-desc'; // up arrow, reverse sort
            }
            self.orderBy = newOrderBy;
        }

        function selectChar(char) {
            self.selectedChar = characterService.selectedChar = char;
        }

        function close() {
            self.selectedChar = characterService.selectedChar = undefined;
        }

    }

})();*/
