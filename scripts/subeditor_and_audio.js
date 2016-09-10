

var info = document.getElementById('info');
var pointer = document.getElementById('pointer');
var timeZone = document.getElementById('timeZone');
var timeZoneWrapper = document.getElementById('timeZoneWrapper');
var innerSubResize;
var resizerWidth;

var playerDuration;
var massOnceOutputSub;
var chossenSub;
var audUrl_mp3;
var progress_mp3 = document.getElementById('progress_mp3');
var audio = document.getElementById('audio');
read();
/*window.addEventListener("load", all_start);*/
function read() {
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



    var audioName = 'audio.mp3';
    var video_id = $_POST['idvid'].split('v=')[1];
    var ampersandPosition = video_id.indexOf('&');
    if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }
    audUrl_mp3 = 'preview/' + video_id + '/audio.mp3';
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






    var getCoordsTimeZoneWrapper = getCoords(timeZoneWrapper).left;

    document.getElementById('addBtn').addEventListener('click', addingSub);
    var tempText = document.getElementById('tempText');
    var drupper = document.getElementsByClassName('drupper')[0];
    drupper.addEventListener('mousedown', movingDrupper);
    tempText.onkeyup = function (e) {
        if(e.keyCode == '13' && e.shiftKey == false){
            addingSub();
        }
    };


    var video_id = $_POST['idvid'].split('v=')[1];
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
            height: '390',
            width: '640',
            videoId: video_id,
            playerVars: { 'autoplay': 1,
                'fs' : 0},
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
            if(!playerDuration){
                playerDuration = player.getDuration()*1000;
                tempText.removeAttribute('disabled');
                timeZone.setAttribute('style','width:'+ playerDuration*640/10000+'px' );
                makeCanvas();
            }
            audio.currentTime = player.getCurrentTime();
            audio.play();
            getTimePlayer();
            pointerTimer = setInterval(function () {
                var x = player.getCurrentTime()*1000;
                pointer.style.left = (x*timeZone.offsetWidth) / (player.getDuration()*1000)+'px';
            },10)
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
    var massOfSubs = [];

    function drawSubs(obj){
        massOfSubs = document.getElementsByClassName('sub');
        var newsub = document.createElement('div');
        var innerSubResize = document.createElement('div');
        var innerSubText = document.createElement('div');
        newsub.setAttribute('class', 'sub');
        newsub.onmousedown = choosenAction;
        newsub.ondragstart = function() {
            return false;
        };
        innerSubResize.ondragstart = function() {
            return false;
        };
        var width =(obj.end - obj.start) *timeZone.offsetWidth / playerDuration +'px';
        var left = obj.start *timeZone.offsetWidth / playerDuration +'px';
        newsub.style.width = width;
        newsub.style.left = left;
        innerSubText.innerText = obj.text;
        innerSubResize.setAttribute('class', 'innerSubResize');
        innerSubText.setAttribute('class', 'innerSubText');
        newsub.appendChild(innerSubResize);
        newsub.appendChild(innerSubText);
        /*massOfSubs.push(newsub);*/
        massOfSubs[massOfSubs.length-1] = newsub;
        timeZone.appendChild(newsub);
        innerSubResize= document.getElementsByClassName('innerSubResize');
        resizerWidth = innerSubResize[0].offsetWidth;
    }


    var subIn;
    function choosenAction(e) {
        massOnceOutputSub = document.getElementsByClassName('onceOutputSub');
        massOfSubs = document.getElementsByClassName('sub');
        e = e || event;
        player.pauseVideo();
        var currentDuration;
        getCoordsTimeZoneWrapper = getCoords(timeZoneWrapper).left;
        var sub = this;
        chossenSub =  Array.prototype.indexOf.call(massOfSubs, sub);
        var nextWidth;
        var crash = false;
        var subOffsetLeft = subtitles[chossenSub].start * timeZone.offsetWidth/playerDuration;
        if(subtitles[chossenSub+1]){
            nextWidth = subtitles[chossenSub+1].start * timeZone.offsetWidth/playerDuration
                - resizerWidth;
            currentDuration = (subtitles[chossenSub].end - subtitles[chossenSub].start) *
                timeZone.offsetWidth/playerDuration - resizerWidth;
        } else {
            nextWidth =  timeZone.offsetWidth;
            currentDuration = (subtitles[chossenSub].end - subtitles[chossenSub].start) *
                timeZone.offsetWidth/playerDuration - resizerWidth;
        }
        if (e.target.getAttribute('class') == 'innerSubResize') {
            var resizer = e.target;
            var shiftX = resizerWidth - (Math.ceil(e.pageX - getCoords(resizer).left));
            timeZone.addEventListener('mousemove', movingResizer);
            timeZone.addEventListener('mouseup', removeTimeZoneMouseMoveListenerFromResizer);
            function movingResizer(e) {
                e = e || event;
                e.preventDefault();
                var x = timeZoneWrapper.scrollLeft + e.pageX - getCoordsTimeZoneWrapper;
                if(subtitles[chossenSub+1]){
                    if (x >= nextWidth) {
                        sub.style.width = nextWidth + resizerWidth - subOffsetLeft  + 'px'  ;
                        crash = true;
                    } else {
                        crash = false;
                        sub.style.width = x - subOffsetLeft +  shiftX  + 'px' ;
                    }
                } else  {
                    if (x >= nextWidth - 5) {
                        sub.style.width = nextWidth  - subOffsetLeft  + 'px'  ;
                        removeTimeZoneMouseMoveListenerFromResizer();
                    } else {
                        crash = false;
                        sub.style.width = x - subOffsetLeft +  shiftX  + 'px' ;
                    }
                }



            }
            function removeTimeZoneMouseMoveListenerFromResizer() {
                timeZone.removeEventListener('mousemove', movingResizer);
                if(crash && subtitles[chossenSub]+1){
                    subtitles[chossenSub].end =  subtitles[chossenSub+1].start;
                    crash = false;
                } else {
                    subtitles[chossenSub].end = Math.ceil(sub.offsetWidth *
                            playerDuration/timeZone.offsetWidth) +  subtitles[chossenSub].start;
                }

                timeZone.removeEventListener('mouseup', removeTimeZoneMouseMoveListenerFromResizer);
                clickOnYTTimeZone();
            }
        } else {
            var shiftX = e.pageX  - getCoords(sub).left ;
            timeZone.addEventListener('mousemove', movingSub);
            timeZone.addEventListener('mouseup', removeTimeZoneMouseMoveListenerFromSub);
            var prevWidth;


            if(subtitles[chossenSub-1]){
                prevWidth = subtitles[chossenSub-1].end * timeZone.offsetWidth/playerDuration
                    - resizerWidth;
            } else {
                prevWidth = - resizerWidth;
            }


            function movingSub(e) {
                e = e || event;
                var x = timeZoneWrapper.scrollLeft + e.pageX  - shiftX -  getCoords(timeZoneWrapper).left;
                if( x<=prevWidth+resizerWidth+5){
                    sub.style.left = prevWidth+resizerWidth+'px';
                } else if (x <= 0) {
                    sub.style.left = 0;
                } else if(x >= nextWidth - currentDuration  - resizerWidth ){
                    if(subtitles[chossenSub+1]){
                        sub.style.left = nextWidth -
                            currentDuration   +'px';
                    } else {
                        sub.style.left = nextWidth -
                            currentDuration - resizerWidth  +'px';
                    }

                } else {
                    sub.style.left = x +'px';
                }
            }
            function removeTimeZoneMouseMoveListenerFromSub(e) {
                e = e || event;
                massOnceOutputSub[chossenSub+1].children[0].focus();
                var x = timeZoneWrapper.scrollLeft + e.pageX  - shiftX -  getCoords(timeZoneWrapper).left;
                timeZone.removeEventListener('mousemove', movingSub);
                var subDurration = subtitles[chossenSub].end - subtitles[chossenSub].start;
                subtitles[chossenSub].start = Math.ceil((getCoords(massOfSubs[chossenSub]).left
                    - getCoords(timeZoneWrapper).left + timeZoneWrapper.scrollLeft ) * playerDuration / timeZone.offsetWidth);
                subtitles[chossenSub].end = Math.ceil(subtitles[chossenSub].start + subDurration);
                timeZone.removeEventListener('mouseup', removeTimeZoneMouseMoveListenerFromSub);
                clickOnYTTimeZone();
            }
        }
    }
    /*tempText.onkeydown = function (e){
     if(e.keyCode == '13' ){
     addingSub.call(addBtn);
     }
     };
     tempText.onkeyup = function (e){
     if(e.keyCode == '13' ){
     tempText.value = '';
     }
     };*/
    function addingSub() {
        clearTimeout(timerEnd);
        clearTimeout(timerStart);
        clearTimeout(timerTemp);
        auto = true;
        var start;
        if(tempText.value != '' && tempText.value != '\n'){
            /*alert(this.previousElementSibling.value);*/
            var parent = document.getElementsByClassName('outputSub')[0];
            var proto = document.getElementsByClassName('onceOutputSub')[0];
            var newSub = proto.cloneNode(true);
            /* newSub.onclick = function () {
             player.pauseVideo();
             };*/
            newSub.getElementsByTagName('textarea')[0].value = tempText.value.trim();
            newSub.getElementsByTagName('textarea')[0].addEventListener('keypress', editSub);
            newSub.getElementsByTagName('input')[0].addEventListener('click', deliteSub);
            parent.appendChild(newSub);
            tempText.value = ''.trim();
            if(!subtitles.length){
                subtitles.push({
                    'start': 0,
                    'text' : newSub.getElementsByTagName('textarea')[0].value.trim(),
                    'end' :  2000

                })
            } else {
                subtitles.push({
                    'start': subtitles[subtitles.length-1].end,
                    'text' : newSub.getElementsByTagName('textarea')[0].value.trim(),
                    'end' :  subtitles[subtitles.length-1].end + 2000

                })
            }
            drawSubs(subtitles[subtitles.length-1]);


            if(player.getPlayerState()==1){
                getTimePlayer();
            } else  {
                clickOnYTTimeZone();
                if(temp && index == subtitles.length-1){
                    info.innerText = newSub.getElementsByTagName('textarea')[0].value.trim();
                }
            }

        }
    }
    function editSub(e) {
        var textareaMass = document.querySelectorAll('.onceOutputSub textarea');
        if(e.keyCode == '13' && e.shiftKey == false){
            var subIndex = Array.prototype.indexOf.call(textareaMass, this) - 1;
            subtitles[subIndex].text = this.value;
            massOfSubs[subIndex].lastChild.innerText = this.value;
            this.blur();
            /*if (temp && index==subIndex ){
             info.innerText = this.value;
             }*/
            clearTimeout(timerEnd);
            clearTimeout(timerStart);
            clearTimeout(timerTemp);
            auto = true;
            if(player.getPlayerState()==1){
                getTimePlayer();
            } else  {
                clickOnYTTimeZone();
                if(temp && index == subIndex){
                    info.innerText = this.value;
                }
            }
        }
    }
    function deliteSub(e) {
        /*player.pauseVideo();*/
        clickOnYTTimeZone();
        clearTimeout(timerEnd);
        clearTimeout(timerStart);
        clearTimeout(timerTemp);
        auto = true;
        var inputMass = document.querySelectorAll('.onceOutputSub input');
        massOnceOutputSub = document.getElementsByClassName('onceOutputSub');
        var subIndex = Array.prototype.indexOf.call(inputMass, this) - 1;
        subtitles.splice(subIndex, 1);
        massOfSubs[subIndex].remove();
        massOnceOutputSub[subIndex + 1].remove();
        if(index>subIndex){
            index--;
        } else if (temp && index==subIndex ){
            info.innerHTML = '';
            temp = false;
        } else if (!temp && index==subIndex ){
            info.innerHTML = '';
        }
        temp = false;
        if(player.getPlayerState()==1){
            getTimePlayer();
        }
        /*if(player.getPlayerState()==1){
         auto=true;
         getTimePlayer();
         } else  {
         clickOnYTTimeZone();
         if(temp && index == subIndex){
         info.innerText = '';
         }
         }*/





    }

    function movingDrupper(e) {
        if(player.getPlayerState()==1){
            player.pauseVideo();
        }
        var offsetLeft;
        e.preventDefault();
        getCoordsTimeZoneWrapper = getCoords(timeZoneWrapper).left;
        timeZone.addEventListener('mousemove', movingDrupperTime);
        window.addEventListener('mouseup', removeMovingDrupperTime);
        var shiftX = e.pageX - getCoords(e.target).left;
        var gippo = Math.sqrt((drupper.offsetWidth * drupper.offsetWidth) * 2);

        function movingDrupperTime(e) {
            e.preventDefault();
            offsetLeft = e.pageX - getCoordsTimeZoneWrapper + timeZoneWrapper.scrollLeft + (gippo / 2 - shiftX);
            pointer.style.left = offsetLeft + 'px';

        }

        function removeMovingDrupperTime(e) {
            player.seekTo(offsetLeft * playerDuration / timeZone.offsetWidth / 1000);
            timeZone.removeEventListener('mousemove', movingDrupperTime);
            var newTime = offsetLeft * playerDuration / timeZone.offsetWidth;
            clickOnYTTimeZone(newTime);
            if (temp) {
                info.innerText = subtitles[index].text;
                console.log('work temp');
            } else {
                console.log('work NOtemp');
            }
            window.removeEventListener('mouseup', removeMovingDrupperTime);
        }

    }

    function getCoords(elem) {
        // (1)
        var box = elem.getBoundingClientRect();

        var body = document.body;
        var docEl = document.documentElement;

        // (2)
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        // (3)
        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;

        // (4)
        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return {
            top: top,
            left: left
        };
    }

    function makeCanvas(){
        var elem = document.getElementById('canvas');
        elem.setAttribute('width', timeZone.offsetWidth);
        var canvas = elem.getContext('2d');
        var x = 0;
        var minutes = 0;
        var seconds = 0;
        var time;
        var length = timeZone.offsetWidth * 200 / playerDuration;
        canvas.strokeStyle = 'blue';
        canvas.lineWidth = 1;
        canvas.font = 'bold 12px sans-serif';
        canvas.textAlign = 'center';
        for(var i=0; i<playerDuration/200; i++){
            canvas.beginPath();
            canvas.moveTo(x,0);
            if(i%5==0){
                canvas.lineTo(x,10);
                if(seconds<10){
                    time = minutes +":0" +  seconds;
                } else {
                    time = minutes +":" +  seconds;
                }
                if(seconds>59){
                    minutes++;
                    seconds = 0;
                    time = minutes +":0" +  seconds;
                }
                canvas.fillText(time,x,25);
                canvas.stroke();
                seconds++;
            } else {
                canvas.lineTo(x,5);
                canvas.stroke();
            }
            x+=length;
        }
    }


    info.addEventListener('resize', function () {
        alert('asdasf')
    })
    /* function  makeAjax() {
     var url = 'subtitles.json';
     var request = new XMLHttpRequest();
     request.responseType = 'text';
     request.addEventListener('load', loadAjax);
     request.open('POST', url, true );
     request.send(null);
     function loadAjax(e) {
     var data = JSON.parse(e.target.response);
     subtitles = data;

     }
     }*/

