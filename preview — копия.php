<?php
define('DS', DIRECTORY_SEPARATOR);
if(isset($_FILES["idaud"]["tmp_name"]))
{
    if(is_uploaded_file($_FILES["idaud"]["tmp_name"]))
    {
        // Если файл загружен успешно, перемещаем его
        // из временной директории в конечную
        move_uploaded_file($_FILES["idaud"]["tmp_name"], __DIR__ . DS . "preview" . DS ."1".DS.$_FILES["idaud"]["name"]);
        echo "Файл загружен успешно<br/>";
    } else {
        /*die("Ошибка загрузки файла");*/
        echo "Аудио не загружено<br/>";
    }
}
?>
<div id="player"></div>
<audio controls id="audio"></audio>
<div id="progress"></div>
<a href="addpage.html">CANCEL</a><br/>
<a href="index.php">HOME</a><br/>
<input type="button" value="ADD TO MAIN AND SQL" id="btn">
<script>


    var databox = document.getElementById("databox");
    var button = document.getElementById("button");
    var progress = document.getElementById('progress');
    var audio = document.getElementById('audio');
    var audUrl;
    window.addEventListener("load", read);
    /*but.addEventListener("click", function () {
        audio.play()
    })*/
    function read() {
         audUrl = <?php define('DS', DIRECTORY_SEPARATOR);
                    echo "'"."preview" . "/" ."1"."/".$_FILES["idaud"]["name"]."'"?>;
        var request;

        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        request.open("POST", audUrl, true);
        request.responseType = "blob";
        request.addEventListener("loadstart", start);
        request.addEventListener("progress", status);
        request.addEventListener("load", showAud);
        request.send(null);
    }

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
            var audioSRC = URL.createObjectURL(data.response);
            audio.setAttribute('src', audioSRC);
           /* progress.innerHTML = '<audio src="' + audio + '" controls id="audio"></audio>' ;*/
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
    var player;
    function onYouTubeIframeAPIReady() {
        /* var str =window.location.search;
         var indexStr = str.indexOf("%3Fv%3D");
         var finish = str.substr(indexStr+7,11);*/
        /*console.log(finish);*/
        player = new YT.Player('player', {
            height: '720',
            width: '980',
            videoId: <?php   $url = $_POST['idvid'];
                        parse_str( parse_url( $url, PHP_URL_QUERY ), $my_array_of_vars );
                        echo "'".$my_array_of_vars['v']."'"?>,
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
        if(player.getPlayerState()==1){
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
        } else if(player.getPlayerState()==2 || player.getPlayerState()==3){
            /* clearInterval(int);*/
            audio.pause();
            audio.currentTime = player.getCurrentTime();


        } else if(player.getPlayerState()==0){
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

    var btn = document.getElementById('btn');
    btn.addEventListener('click', addToSQL);
    function addToSQL() {
        var data = new FormData();
        data.append('idvid', <?php   $url = $_POST['idvid'];
            parse_str( parse_url( $url, PHP_URL_QUERY ), $my_array_of_vars );
            echo "'".$my_array_of_vars['v']."'"?>);
        data.append('audurl',audUrl);
        var request = new XMLHttpRequest();
        /* var xmlupload = request.upload;*/
        request.addEventListener('load', actWhenLoad);
        request.open('POST', 'adding.php', true);
        request.send(data);
    }
    function actWhenLoad() {
        window.location.href = 'watch.php?idvid='+ <?php   $url = $_POST['idvid'];
                                                    parse_str( parse_url( $url, PHP_URL_QUERY ), $my_array_of_vars );
                                                    echo "'".$my_array_of_vars['v']."&audurl="."'"?> + audUrl;
    }
</script>