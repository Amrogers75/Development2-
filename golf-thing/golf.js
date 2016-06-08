var numplayers = 8;
var numholes = 18;
var teetime = 45;
var seconds = 59;

var testCourse ={};
var colseCourses ={};
var xhttp = new XMLHttpRequest();
var local_obj = {latitude: 40.4426135, longitude: -111.8631116, radius: 30};

// API call for courses

function loadMe(){
    $.post("http://golf-courses-api.herokuapp.com/courses",local_obj,function(data, status){
        colseCourses = JSON.parse(data);
        for (var p in colseCourses.courses){
            var thisCourse = document.createElement("div");
            //thisCourse.setAttribute('id');
            var mydisplay = "<option value='" + colseCourses.courses[p].id +"' class='thisCourse' >"+ colseCourses.courses[p].name+"</option>";
            //console.log(mydisplay);
            $("#selectCourse").append(mydisplay);
        }
        document.getElementById('golfDiv').style.display = "block";
    });
}

function getCourseInfo(id){
    console.log(id);
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function(){
        if (xhttp.readyState == 4 && xhttp.status == 200){
            testCourse = JSON.parse(xhttp.responseText);
            console.log(testCourse.course.name);
            $("#golfcourselabel").html(testCourse.name);

            for(var t = 0; t < testCourse.course.holes[0].tee_boxes.length-1; t++){
                var boxDisplay = "<option value ='" + t + "'>"+ testCourse.course.holes[0].tee_boxes[t].tee_type+"</option>";
                $("#selectTeebox").append(boxDisplay);
            }
        }
    };

    xhttp.open("GET","https://golf-courses-api.herokuapp.com/courses/" + id, true);
    xhttp.send();
}

function setCourseInfo(teeboxid){
    buildcard(teeboxid);

}
// score card build
function buildcard(fred){
    //console.log(setCourseInfo);
    beginTimer();
    var holecollection = "";
    var playercollection = "";
    var grandtotalcollection = "";

    // create column of player labels
    for(var pl = 1; pl <= numplayers; pl++ ){
        playercollection += "<div id='player" + pl +"' class='holebox playerbox'> Player " + pl + "</div>";
        grandtotalcollection += "<div id='grand" + pl +"' class='holebox' ></div>";
    }

    // create golf hole columns before you add holes to them.
    for(var num = 18; num >= 1; num-- ){
        var adjusthole = num - 1;
        holecollection += "<div id='column" + num +"' class='holecol'><div class='holenumbertitle'>" + num + "<span> par" + testCourse.course.holes[adjusthole].tee_boxes[fred].par +"</span></div></div>";

    }

    /**for(var num = 8; num >= 0; num-- ){
        var adjusthole = num - 1;
        holecollection += "<div id='column" + num +"' class='holecol'><div class='holenumbertitle'>" + (num + 1) + "<span> par" + testCourse.course.holes[adjusthole].pin_location[0].par +"</span></div></div>";

    }*/

    $("#leftcard").html(playercollection);
    $("#rightcard").html( ("<div class='holecol'><div>total</div>" + grandtotalcollection +  "</div>") + holecollection );

    // call the function that builds the holes into the columns
    buildholes();
}

function buildholes(){
    // add 18 holes to the columns
    for(var p = 1; p <= numplayers; p++ ){
        for(var h = 1; h <= numholes; h++){
            $("#column" + h).append("<input onkeyup='calculatescore'(" + p +") id='player" + p + "hole" + h +"' class='holebox'/></input>");
        }
    }
}

function calculatescore(theplayer){
    var theTotal = 0;
    for(var t = 1; t <= numholes; t++){
        theTotal += Number($("#player" + theplayer + "hole" + t).val());
    }
    $("#grand" + theplayer).html(theTotal);
}


// Time to tee time
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

