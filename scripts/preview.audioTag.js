console.log('audioTag');

var databox = document.getElementById("databox");
var button = document.getElementById("button");
var progress_mp3 = document.getElementById('progress_mp3');
var audio = document.getElementById('audio');

var audUrl_mp3;
window.addEventListener("load", read);

/*but.addEventListener("click", function () {
 audio.play()
 })*/
function read() {
    var audioName = $_FILES['idaud']['name'];
    audUrl_mp3 = 'preview/1/' + audioName;
    var request_mp3;

    if (window.XMLHttpRequest) {
        request_mp3 = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        request_mp3 = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request_mp3.open("POST", audUrl_mp3, true);
    request_mp3.responseType = "blob";
    request_mp3.addEventListener("loadstart", start_mp3);
    request_mp3.addEventListener("progress", status_mp3);
    request_mp3.addEventListener("load", showAud_mp3);
    request_mp3.send(null);
}

function start_mp3() {
    progress_mp3.innerHTML = '<progress value="0" max="100">0%</progress>'
}
function status_mp3(e) {
    if (e.lengthComputable) {
        var per = parseInt(e.loaded / e.total * 100);
        var progressbar = progress_mp3.querySelector("progress");
        progressbar.value = per;
        progressbar.innerHTML = per + "%";
    }
}
function showAud_mp3(e) {
    var data = e.target;
    if (data.status == 200) {
        var audioSRC = URL.createObjectURL(data.response);
        var mp3 = document.createElement('source');
        mp3.setAttribute('type', 'audio/mpeg');
        mp3.setAttribute('src', audioSRC);
        mp3.setAttribute('id', 'mp3');
        audio.appendChild(mp3);
        /* progress.innerHTML = '<audio src="' + audio + '" controls id="audio"></audio>' ;*/
    } else {
        progress_mp3.innerHTML = data.status;
    }
}


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var video_id = $_POST['idvid'].split('v=')[1];
var ampersandPosition = video_id.indexOf('&');
if (ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
}
;


var player;
function onYouTubeIframeAPIReady() {
    /* var str =window.location.search;
     var indexStr = str.indexOf("%3Fv%3D");
     var finish = str.substr(indexStr+7,11);*/
    /*console.log(finish);*/
    player = new YT.Player('player', {
        height: '720',
        width: '980',
        videoId: video_id,
        playerVars: {
            fs: "1",
            /*controls: "0",*/
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
        }
    });

}


// 4. The API will call this function when the video player is ready.
var mas = [];

function onPlayerReady(event) {
    /*document.getElementById("player").removeAttribute("allowfullscreen");*/
    if (navigator.userAgent.indexOf("Mobile") !== -1) {
        alert("Mobile");
        butt.style.display = "block";
        butt.addEventListener("click", function () {
            audio.play();
            audio.pause();
            audio.currentTime = 0;
        })
    }

}
var frame = document.getElementsByTagName('iframe')[0];
/*var div = document.createElement('div');
 div.style.width = "36px";
 div.style.height = "36px";
 div.style.background = "url(image.svg)";
 div.style.position = "absolute";
 div.style.bottom = "0";
 div.style.right = "10px";
 div.style.bottom = "4px";
 div.className = "diver";
 wrapper.appendChild(div);

 var wrap = document.getElementsByClassName("wrapper")[0];
 var myTest = /iframe/i;*/

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = true;
var x;
var int;
function onPlayerStateChange(event) {
    console.log(player.getPlayerState());
    if (player.getPlayerState() == 1) {
        audio.currentTime = player.getCurrentTime();
        audio.play();
        /*  audio.currentTime = player.getCurrentTime();*/


        /*int = setInterval(function () {
         vid.innerHTML = "Видео: " + player.getCurrentTime();
         aud.innerHTML = "Аудио: " +  audio.currentTime;
         var x = audio.currentTime - player.getCurrentTime();
         raz.innerHTML = "Разница: " + x;
         mas.push(x);

         if( (audio.currentTime - player.getCurrentTime())>0.2 || (audio.currentTime - player.getCurrentTime())<-0.1){
         audio.currentTime = player.getCurrentTime();

         }

         },1000);*/
    } else if (player.getPlayerState() == 2 || player.getPlayerState() == 3) {
        /* clearInterval(int);*/
        audio.pause();
        audio.currentTime = player.getCurrentTime();


    } else if (player.getPlayerState() == 0) {
        audio.pause();
        audio.currentTime = 0;
    }
}


function stopVideo() {
    player.stopVideo();
}

function show(e) {
    alert('load')
}