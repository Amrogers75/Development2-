var numplayers = 8;
var numholes = 18;
var teetime = 45;
var seconds = 59;

var testCourse ={};
var colseCourses ={};
var xhttp = new XMLHttpRequest();
var local_obj = {latiude: 40.4426135, longitude: -111.8631116, radius: 30};

// API call for courses

function loadMe(){
    $.post("http://golf-courses-api.herokuapp.com/courses",local_obj,function(data,status){
        colseCourses = JSON.parse(data);
        console.log(data);
        for (var p in closeCourese.courses){
            var thisCourse = document.createElement("div");
            thisCourse.setAttribute('id');
            var mydisplay = "<div id='" + closeCourese.courses[p].id +"' class='thisCourse' onclick='getCourseInfo(this.id)'>"+ closeCourese.courses[p].name+"</div>";
            $("#slectCourse").append(mydisplydiv);
        }
        document.getElementById('golfDiv').style.display = 'block';
    });
}

function getCourseInfo(id){
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function(){
        if (xhttp.readyState == 4 && xhttp.status == 200){
            testCourse = JSON.parse(xhttp.responseText);
            console.log(testCourse.course.name);
            $("#golfcourselabel").html(testCourse.name);
        }
    };
    xhttp.open("http://golf-courses-api.herokuapp.com/courses/" + id,true);
    xhttp.send();
}

// score card build
function buildcard(){
    beginTimer();
    var holecollection = "";
    var playercollection = "";

    // create column of player labels
    for(var pl = 1; pl <= numplayers; pl++ ){
        playercollection += "<div id='player" + pl +"' class='holebox playerbox'> Player " + pl + "</div>";
    }

    // create golf hole columns before you add holes to them.
    for(var c = numholes; c >= 1; c-- ){
        holecollection += "<div id='column" + c +"' class='holecol'><div class='holenumbertitle'>" + c + "</div></div>";
    }
    $("#leftcard").html(playercollection);
    $("#rightcard").html(holecollection);

    // call the function that builds the holes into the columns
    buildholes();
}

function buildholes(){
    // add 18 holes to the columns
    for(var p = 1; p <= numplayers; p++ ){
        for(var h = 1; h <= numholes; h++){
            $("#column" + h).append("<div id='player" + p +"hole" + h +"' class='holebox'>s</div>");
        }
    }
}

function beginTimer(){
    var thetimer = setInterval(function(){clocktick()}, 1000);
}

function clocktick(){
    if(seconds > 0){
        seconds --;
        if(seconds < 10){
            seconds = "0" + seconds;
        }
    }
    else{
        teetime --;
        seconds = 59;
    }
    document.getElementById("countdown").innerHTML = teetime + ":" + seconds;
}

/** var myVar = setInterval(stopTimer, 1000);

function stopTimer() {
    var d = new Date();
    document.getElementById("stop").innerHTML = d.toLocaleTimeString();
} */

