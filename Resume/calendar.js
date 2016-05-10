/**
 * Created by anthonyrogers on 5/9/16.
 */
function runcode() {
    var d = new Date().getDay();

    switch(d){
        case 0:
            document.getElementById("dayoftheweek").innerHTML = "SUNDAY";
            break;
        case 1:
            document.getElementById("dayoftheweek").innerHTML = "MONDAY";
            break;
        case 2:
            document.getElementById("dayoftheweek").innerHTML = "TUESDAY";
            break;
        case 3:
            document.getElementById("dayoftheweek").innerHTML = "WEDNESDAY";
            break;
        case 4:
            document.getElementById("dayoftheweek").innerHTML = "THURSDAY";
            break;
        case 5:
            document.getElementById("dayoftheweek").innerHTML = "FRIDAY";
            break;
        case 6:
            document.getElementById("dayoftheweek").innerHTML = "SATURDAY";
            break;

    }

}