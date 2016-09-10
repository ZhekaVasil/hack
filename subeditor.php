<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/style.css">
    <style>
        * {
            margin: 0;
            padding: 0;
        }
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
        .bt_wrapper {
            display: none;
            text-align: center;
        }
        .tr_button {
            display: inline-block;
        }
        audio {
            display: none;
        }
        progress {
            position: fixed;
            top: 0;
            width: 100%;
            border-radius: 2px;
        }
        progress[value] {
            /* Reset the default appearance */
            -webkit-appearance: none;
            appearance: none;

            width: 100%;
            height: 2px;
        }
        progress[value]::-webkit-progress-bar {
            background-color: #eee;
            border-radius: 2px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
        }
        progress[value]::-webkit-progress-value {
            background: red;
        }
        #original_bt {
            display: none;
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
    <input type="button" value="Готово" id="btn">
<!--<input type="button" value="Send Subtitles" id="btnAjax">-->
    </div>
<?php
if(is_uploaded_file($_FILES["audio"]["tmp_name"]))
{
    /*echo("<p style='color: white'>audio+</p>");*/
    if(!is_dir('preview/'.$id)){
        mkdir('preview/'.$id);
    }
    move_uploaded_file($_FILES["audio"]["tmp_name"], "preview/".$id."/audio.mp3");
    echo '<audio controls id="audio" preload="metadata">
</audio>
<div id="progress_mp3"></div>
<div id="progress_ogg"></div>
<div class="bt_wrapper">
    <div class="tr_button">
        <input type="button" value="ORIGINAL" id="original_bt" disabled >
    </div>
    <div class="tr_button">
        <input type="button" value="TRANSLATE" id="translate_bt" >
    </div>
</div>';
    require 'audio_true.php';
} /*else {
    echo("<p style='color: white'>audio-</p>");
    require 'audio_false.php';
}*/
?>

</body>
</html>
