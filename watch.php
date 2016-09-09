<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/style.css">
    <style>
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
<script>

    var $_GET = <?php echo json_encode($_GET); ?>;
    var newTag = document.createElement('script');
    try {
       /* var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        newTag.setAttribute('src', 'scripts/watch.webAudio.js');
        document.body.appendChild(newTag);*/
        newTag.setAttribute('src', 'scripts/watch.audioTag.js');
        document.body.appendChild(newTag);
    } catch (e){    
        newTag.setAttribute('src', 'scripts/watch.audioTag.js');
        document.body.appendChild(newTag);
    }

</script>
