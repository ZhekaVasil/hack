console.log('webAudio');
var progress = document.getElementById('progress');
var audUrl;
/*but.addEventListener("click", function () {
 audio.play()
 })*/
var context = new ( window.AudioContext || window.webkitAudioContext)();
var buffer, source, destination;
/*function read() {*/
    var audioName = $_FILES['idaud']['name'];
    audUrl = 'preview/1/'+audioName;
        var request;

        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        request.open("GET", audUrl, true);
        request.responseType = "arraybuffer";
        /*request.addEventListener("loadstart", start);
        request.addEventListener("progress", status);*/
        request.addEventListener("load", showAud);
        request.send();
   /* };*/

        var webAudioPlay = function(time){
            source = context.createBufferSource();
            source.buffer = buffer;
            destination = context.destination;
            source.connect(destination);
            source.start(0,time);
        };
        var webAudioStop = function(){
            source.stop(0);
        };


    function start() {
        progress.innerHTML = '<progress value="0" max="100">0%</progress>'
}
function status(e) {
    if(e.lengthComputable){
    var per = parseInt(e.loaded/e.total *100);
    var progressbar = progress.querySelector("progress");
    progressbar.value = per;
    progressbar.innerHTML = per + "%";
}
}
function showAud(e) {
    var data = e.target;
    if(data.status == 200){
        context.decodeAudioData(this.response,
            function(decodedArrayBuffer) {
                buffer = decodedArrayBuffer;
                alert('can');
            }, function(e) {
                console.log('Error decoding file', e);
            });
    } else {
    progress.innerHTML = data.status;
    }
    }











// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        var video_id = $_POST['idvid'].split('v=')[1];
        var ampersandPosition = video_id.indexOf('&');
        if(ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
        };

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
            if(navigator.userAgent.indexOf("Mobile") !== -1){
            alert("Mobile");
            butt.style.display = "block";
            butt.addEventListener("click", function () {
            webAudioPlay();
            webAudioStop();
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
        var currentVideoTime;
        function onPlayerStateChange(event) {
            console.log(player.getPlayerState());
            if(player.getPlayerState()==1){
                currentVideoTime = player.getCurrentTime();
                webAudioPlay(currentVideoTime);

            }

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
         else if(player.getPlayerState()==2 || player.getPlayerState()==0){
            /* clearInterval(int);*/
            webAudioStop();


            } else if(player.getPlayerState()==3){
                try {
                    webAudioStop();
                } catch (e){
                    console.log(e)
                }
            }
        }


        function stopVideo() {
            player.stopVideo();
        }

        function show(e) {
            alert('load')
        }
