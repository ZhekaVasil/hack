var video_id = window.location.href.split('idvid=')[1];
var ampersandPosition = video_id.indexOf('&');
if (ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
};
window.onload = function () {
    var bt_wrapper = document.getElementsByClassName('bt_wrapper')[0];
    var original_bt = document.getElementById('original_bt');
    var translate_bt = document.getElementById('translate_bt');
    bt_wrapper.style.display = 'block';
    original_bt.onclick = function () {
        audio.volume = 0;
        player.unMute();
        original_bt.setAttribute('disabled','');
        original_bt.style.display = 'none';
        translate_bt.removeAttribute('disabled');
        translate_bt.style.display = 'inline-block';
    };
    translate_bt.onclick = function () {
        audio.volume = 1;
        player.mute();
        translate_bt.setAttribute('disabled','');
        translate_bt.style.display = 'none';
        original_bt.removeAttribute('disabled');
        original_bt.style.display = 'inline-block';
    };
    var subtitles;
    makeAjax();
};

var audUrl_mp3;
var progress_mp3 = document.getElementById('progress_mp3');
var audio = document.getElementById('audio');
read();
/*window.addEventListener("load", all_start);*/
function read() {
    var audioName = 'audio.mp3';
    audUrl_mp3 = 'subcontent/' + video_id + '/audio.mp3';
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
        audio.volume = 0;
        /* progress.innerHTML = '<audio src="' + audio + '" controls id="audio"></audio>' ;*/
    } else {
        progress_mp3.innerHTML = data.status;
    }
}





var info = document.getElementById('info');


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var subtitles = [];
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '480',
        width: '854',
        videoId: video_id,
        /* playerVars: { 'autoplay': 1 },*/
        playerVars: {
            'fs': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    /* drawSubs(subtitles);*/
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
var timerStart;
var timerEnd;
var timerTemp;
var param = 0;
var wasPaused = false;
var pointerTimer;
var auto = false;

var temp = false;
var index =0;
function onPlayerStateChange(event) {
    console.log(player.getPlayerState());
    if(player.getPlayerState()==-1){
    }
    if(player.getPlayerState()==1){
        getTimePlayer();
        audio.currentTime = player.getCurrentTime();
        audio.play();
    }
    if(player.getPlayerState()==2){
        clearTimeout(timerEnd);
        clearTimeout(timerStart);
        clearTimeout(timerTemp);
        clearInterval(pointerTimer);
        auto = true;
        audio.pause();
        audio.currentTime = player.getCurrentTime();
        /*clickOnYTTimeZone();*/

    }
    if(player.getPlayerState()==3){
        /* player.pauseVideo();*/
        audio.pause();
        audio.currentTime = player.getCurrentTime();


    }
    if(player.getPlayerState()==0){
        index = 0;
        audio.pause();
        audio.currentTime = 0;
    }
}
function stopVideo() {
    player.stopVideo();
}



function  getTimePlayer() {
    if(auto){
        clickOnYTTimeZone();
    }
    if (temp) {
        info.innerText = subtitles[index].text;
        timerTemp = setTimeout(hideSubs, subtitles[index].end - player.getCurrentTime() * 1000);
        temp = false;
    } else if (subtitles[index]) {
        timerStart = setTimeout(showSubs, subtitles[index].start - player.getCurrentTime() * 1000);
    }

    auto = false;
}

function showSubs(){
    if(subtitles[index]){
        clearTimeout(timerStart);
        timerEnd = setTimeout( hideSubs, subtitles[index].end - player.getCurrentTime() * 1000);
        info.innerText = subtitles[index].text;

    }
}
function hideSubs(){
    /* info.innerHTML = "";*/
    if(subtitles[index+1]){
        if(subtitles[index].end != subtitles[index+1].start){
            info.innerText = '';
        }
    } else {
        info.innerText = '';
    }

    index++;
    temp = false;
    param = player.getCurrentTime() * 1000;
    getTimePlayer();
}



function clickOnYTTimeZone(newTime) {
    var x;
    if(newTime){
        x = newTime
    } else {
        x = player.getCurrentTime() * 1000;
    }
    for (var i = 0; i < subtitles.length; i++) {
        if (x <= subtitles[i].end && x >= subtitles[i].start) {
            temp = true;
            index = i;
            break;
        }
        else if(x < subtitles[i].start){
            info.innerText = "";
            temp=false;
            index = i;
            break;
        } else if(newTime && x > subtitles[i].end && (subtitles[i+1]==undefined || x < subtitles[i+1].start )){
            info.innerText = "";
            temp=false;
            break;
        }
    }
}

/*function  makeAjax() {
 var data = new FormData();
 data.append('subtitles', JSON.stringify(subtitles));
 data.append('idvid', video_id);
 var url = 'sendSubtitles.php';
 var request = new XMLHttpRequest();
 request.responseType = 'json';
 request.addEventListener('load', loadAjax);
 request.open('POST', url, true );
 request.send(data);
 function loadAjax(e) {
 var data = e.target;
 if(data.status == 200){
 console.log('200');
 }

 }
 }*/

function  makeAjax() {
    var url = './subcontent/' + video_id + '/subtitles.json';
    var request = new XMLHttpRequest();
    request.responseType = 'text';
    request.addEventListener('load', loadAjax);
    request.open('POST', url, true );
    request.send(null);
    function loadAjax(e) {
        var data = JSON.parse(e.target.response);
        subtitles = data;

    }
}
