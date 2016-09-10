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
        .contentWrapper {
            text-align: center;
        }
        .contentWrapper .videoContent {
            float: none;
            width: auto;
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
<div class="contentWrapper">
    <div class="videoContent">
        <div class="playerWrapper">
            <div id="player"></div>
            <div class="infoWrapper">
                <div id="info"></div>
            </div>
        </div>
    </div>
</div>
<!--<audio controls id="audio">
    <source id="mp3" type='audio/mpeg'>
</audio>-->
<div id="progress"></div>
<?php
if($_GET['audurl'] == 'true'){
    echo '<audio controls id="audio" preload="metadata">
</audio>
<div id="progress_mp3"></div>
<div id="progress_ogg"></div>';
};
?>
<div class="bt_wrapper">
    <div class="tr_button">
        <input type="button" value="ORIGINAL" id="original_bt" disabled >
    </div>
    <div class="tr_button">
        <input type="button" value="TRANSLATE" id="translate_bt" >
    </div>
</div>


<script>

    var $_GET = <?php echo json_encode($_GET); ?>;
    var newTag = document.createElement('script');
    if ($_GET.audurl == 'true') {
        try {
            /* var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
             newTag.setAttribute('src', 'scripts/watch.webAudio.js');
             document.body.appendChild(newTag);*/
            newTag.setAttribute('src', 'scripts/watch.audioTag_and_audio.js');
            document.body.appendChild(newTag);
        } catch (e) {
            newTag.setAttribute('src', 'scripts/watch.audioTag_and_audio.js');
            document.body.appendChild(newTag);
        }
    } else {
        try {
            /* var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
             newTag.setAttribute('src', 'scripts/watch.webAudio.js');
             document.body.appendChild(newTag);*/
            newTag.setAttribute('src', 'scripts/watch.audioTag.js');
            document.body.appendChild(newTag);
        } catch (e) {
            newTag.setAttribute('src', 'scripts/watch.audioTag.js');
            document.body.appendChild(newTag);
        }
    }


</script>
