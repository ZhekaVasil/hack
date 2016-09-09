window.onload = function () {
    var video_id = window.location.href.split('idvid=')[1];
    var ampersandPosition = video_id.indexOf('&');
    if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }

    var subtitles;
    makeAjax();
}

var info = document.getElementById('info');


var video_id = window.location.href.split('idvid=')[1];
var ampersandPosition = video_id.indexOf('&');
if (ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
}
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
    }
    if(player.getPlayerState()==2){
        clearTimeout(timerEnd);
        clearTimeout(timerStart);
        clearTimeout(timerTemp);
        clearInterval(pointerTimer);
        auto = true;
        /*clickOnYTTimeZone();*/

    }
    if(player.getPlayerState()==3){
        /* player.pauseVideo();*/


    }
    if(player.getPlayerState()==0){
        index = 0;
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