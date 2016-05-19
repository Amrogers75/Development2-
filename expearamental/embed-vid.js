/**
 * Created by anthonyrogers on 5/17/16.
 */


var img = document.getElementById('blinking_image');

var interval = window.setInterval(function(){
    if(img.display == 'hidden'){
        img.style.visibility = 'visible';
    }else{
        img.style.visibility = 'hidden';
    }
}, 5000);

