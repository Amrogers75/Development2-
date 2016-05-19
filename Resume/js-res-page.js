/**
 * Created by anthonyrogers on 4/27/16.
 */
//projects
//skills
//Prior work experience
//contact
function pulling() {
    document.getElementById("imge").innerHTML= "<img src='img/Anthony&Jaylin.png'>"
    
}

// Day of the week
function runcode() {
    var d = new Date().getDay();

    switch(d){
        case 0:
            document.getElementById("dayoftheweek").innerHTML = "<h3>SunDay</h3>";
            break;
        case 1:
            document.getElementById("dayoftheweek").innerHTML = "<h3>MonDay</h3>";
            break;
        case 2:
            document.getElementById("dayoftheweek").innerHTML = "<h3>TuesDay</h3>";
            break;
        case 3:
            document.getElementById("dayoftheweek").innerHTML = "<h3>WednesDay</h3>";
            break;
        case 4:
            document.getElementById("dayoftheweek").innerHTML = "<h3>ThursDay</h3>";
            break;
        case 5:
            document.getElementById("dayoftheweek").innerHTML = "<h3>FriDay</h3>";
            break;
        case 6:
            document.getElementById("dayoftheweek").innerHTML = "<h3>SaturDay</h3>";
            break;

    }

}

// Time
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.80
setInterval(drawClock, 1000);

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = '#84C9E9';
    ctx.fill();
    grad = ctx.createRadialGradient(0,0,radius*.95, 0,0,radius*1.15);
    grad.addColorStop(0, '#AC0DC1');
    grad.addColorStop(0.5, '#84C9E9');
    grad.addColorStop(1, '#FFFF00');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = '#FFFF00';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius*0.30 + "px arial";
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*1.1);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius*1.1);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
        (minute*Math.PI/(6*60))+
        (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

