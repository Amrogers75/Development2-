
var players = 5; // p is players

var course = ""; // c is course

function work() {
    for (var p = 1; p <= players; p++){
        collectHoles(p);
    }

}

function collectHoles(p){
    for (var c = 1; c < 18; c++) {
        var hole = "<div id='p" + c + "' class='column'" + c +">SEE</div>";
        course += hole;
    }
    $("#scorecard").append(course);
}
