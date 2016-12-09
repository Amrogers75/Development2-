(function () {

    angular.module('myApp')
        .service('sockService', sockService);

    function sockService($localStorage, $http, $q) {

        var self = this;

        var deferred = $q.defer();
        
        $http.get("/api/socks/").then(function(data) {
            deferred.resolve(data);
        });
        self.getItems = function(){
            return deferred.promise;
        };
        
        
        
        
        // $http.get("/api/socks/")
        //     .success(function(data) {
        //         self.item = data;
        //     })
        //     .error(function(data) {
        //         console.log('Error: ' + data);
        //     });
        
        // self.item =
        //     [
        //     {
        //         "title": "Green and Orange Smiley Turtle Sock",
        //         "Picture": "img/FullSizeRender.jpg",
        //         "Description": "This sock will bring back memories both old and new!  Just watch out, it'll karate chop your toes right off!",
        //         "id": "item1"
        //     },
        //     {
        //         "title": "Scary Mouse Sock",
        //         "Picture": "img/IMG_5007.JPG",
        //         "Description": "For those of you who have a slightly demented personality... This sock will literally crawl out from under your bed and eat your cat...",
        //         "id": "item2"
        //     },
        //     {
        //         "title": "Makes Your Toes feel Weird Sock",
        //         "Picture": "img/IMG_5008.JPG",
        //         "Description": "You know that feeling where you get some lint or a small rock between your toes... Now imagine that with all of your toes... You masoquist!",
        //         "id": "item3"
        //     },
        //     {
        //         "title": "Sexy Bad Hero Sock",
        //         "Picture": "img/IMG_5010.JPG",
        //         "Description": "The halloween sock that your sexy outfit has been missing.  If you think you're in charge though... this sock will set you straight.",
        //         "id": "item4"
        //     },
        //     {
        //         "title": "Grandpa Sock One",
        //         "Picture": "img/IMG_5011.JPG",
        //         "Description": "There's really not that much to say about this one... Its grandpa's sock... The one he lost four-wheeling across the neighbors front lawn.",
        //         "id": "item5"
        //     },
        //     {
        //         "title": "Lumberjack Sock",
        //         "Picture": "img/IMG_5012.JPG",
        //         "Description": "The manliest man sock in the world.  While the other socks are sleeping quietly in your drawer, this sock is felling forests and building your log cabin.",
        //         "id": "item6"
        //     },
        //     {
        //         "title": "Hip Chick Sock",
        //         "Picture": "img/IMG_5013.JPG",
        //         "Description": "This is for the high school preppy chick in each of you... You should go home and think long and hard about your life.",
        //         "id": "item7"
        //     },
        //     {
        //         "title": "Grandpa Sock Two",
        //         "Picture": "img/IMG_5014.JPG",
        //         "Description": "Another of grandpa's famous sock stories... At this point you're starting to wonder if his socks were the only things he lost... ",
        //         "id": "item8"
        //     },
        //     {
        //         "title": "Grandpa Sock Three",
        //         "Picture": "img/IMG_5015.JPG",
        //         "Description": "This sock makes it official.  Your grandpa has lost his mind... and it was all your fault... You should feel bad.",
        //         "id": "item9"
        //     },
        //     {
        //         "title": "Death Skull Sock",
        //         "Picture": "img/IMG_5016.JPG",
        //         "Description": "Just in case you want to feel bad A for a day... while you're sitting there watching My little Pony... ",
        //         "id": "item10"
        //     },
        //     {
        //         "title": "Anime Cat Sock",
        //         "Picture": "img/IMG_5017.JPG",
        //         "Description": "I'm sure we're going to get some flack for this one...",
        //         "id": "item11"
        //     },
        //     {
        //         "title": "Grandma Sock",
        //         "Picture": "img/IMG_5018.JPG",
        //         "Description": "Because we both know that Grandma was there for some of grandpa's adventures...",
        //         "id": "item12"
        //     }
        //
        // ]
    }

})();
