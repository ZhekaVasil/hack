<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/style.css">
    <style>
        header .container .addNewContent {
            display: none!important;
        }
        .main {
            border: 2px solid #ca2626;
            background: #0f0f0f;
            text-align: center;
        }
        #btn {
            width: 100px;
            height: 50px;
            margin: 25px 0 10px 0;
            font: bold 14px sans-serif ;
        }
        div.popup {
            position: absolute;
            top: 150px;
            width: 80%;
            background: #000000;
            left: 0;
            right: 0;
            margin: 0 auto;
            padding: 10px 0;
            border: 3px solid #0a0a0a;
            border-radius: 10px;
            text-align: center;
            font-family: sans-serif;
            color: #fff;
            font-size: 32px ;
        }
        div.popup a {
            display: inline-block;
            text-decoration: none;
            text-align: center;
            color: rgba(219, 219, 219, 0.68);
            
        }
        div.popup .playBtn {
            display: inline-block;
            height: 50px;
            width: 50px;
            background: url("img/playBtn.png") no-repeat;
            background-size: cover;
        }
    </style>
</head>
<body>
<?php require ('components/header.php')?>
<?php
if(isset($_POST['idvid']))
{
    $mas = explode('v=', $_POST['idvid']);
    $part = $mas[1];
    $id = substr($part,0,11);
    $mysqli = new mysqli('localhost','root','','project');
    $mysqli->set_charset("utf8");
    $res = $mysqli->query("SELECT `#` FROM `vid` WHERE `idvid` LIKE '".$id."'");
    $res->data_seek(0);
    $row =$res->fetch_assoc();
    if($row['#'])
    {
        echo "<div class='popup'>К видео уже добавлены субтитры<br><a href='http://port/one/watch.php?idvid=".$id."'><span class='playBtn'></span></a></div>";
        exit();
    }

}
?>
<div class="main">
<!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
<div class="contentWrapper">
    <div class="videoContent">
        <div class="playerWrapper">
            <div id="player"></div>
            <div class="infoWrapper">
                <div id="info"></div>
            </div>
        </div>

        <div id="timeZoneWrapper">
            <div id="timeZone">
                <div id="pointer">
                    <div class="drupper"></div>
                </div>
                <canvas id="canvas" height="100"></canvas>
            </div>
        </div>


        <!--<div id="currentTimeDiv"></div>-->
    </div>
    <div class="subContent">
        <div class="inputText">
            <textarea id="tempText" disabled placeholder="Введите текст субтитров и нажмите  Enter, для переноса строки нажмите Shift+Enter"></textarea>
            <input type="button" value="+" id="addBtn">
        </div>
        <div class="outputSub">
            <div class="onceOutputSub">
                <textarea></textarea><input type="button" value="-">
            </div>
        </div>
    </div>

</div>
<!--<input type="button" value="Send Subtitles" id="btnAjax">-->
<input type="button" value="Готово" id="btn">
    </div>
<script>
    var checkAjax = false;
    var $_FILES = <?php echo json_encode($_FILES); ?>;
    var $_POST = <?php echo json_encode($_POST); ?>;
    var audUrl = null;



    var btn = document.getElementById('btn');
    btn.addEventListener('click', addToSQL);

    function addToSQL() {
        this.disabled = true;
        makeAjax();


    }
    function actWhenLoad() {
        window.location.href = 'watch.php?idvid='+ <?php   $url = $_POST['idvid'];
            parse_str( parse_url( $url, PHP_URL_QUERY ), $my_array_of_vars );
            echo "'".$my_array_of_vars['v']."&audurl="."'"?> + audUrl;
    }

    var newTag = document.createElement('script');
    try {
        /*var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
         newTag.setAttribute('src', 'scripts/preview.webAudio.js');*/
        newTag.setAttribute('src', 'scripts/subeditor.js');
    } catch (e){
        newTag.setAttribute('src', 'scripts/subeditor.js');
    } finally {
        document.body.appendChild(newTag);
    }


    function makeAjax() {
        var data = new FormData();
        data.append('subtitles', JSON.stringify(subtitles));
        data.append('idvid', video_id);
        var url = 'sendSubtitles.php';
        var request = new XMLHttpRequest();
        request.responseType = 'json';
        request.addEventListener('load', loadAjax);
        request.open('POST', url, true);
        request.send(data);
        function loadAjax(e) {
            var data = e.target;
            if (data.status == 200) {
                var data = new FormData();
                data.append('idvid', <?php   $url = $_POST['idvid'];
                    parse_str(parse_url($url, PHP_URL_QUERY), $my_array_of_vars);
                    echo "'" . $my_array_of_vars['v'] . "'"?>);
                data.append('audurl', audUrl);
                var request = new XMLHttpRequest();
                /* var xmlupload = request.upload;*/
                request.addEventListener('load', actWhenLoad);
                request.open('POST', 'adding.php', true);
                request.send(data);
            } else {
                console.log('checkAjax no check');
            }
        }
    }


</script>

</body>
</html>
