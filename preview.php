<?php
/*define('DS', DIRECTORY_SEPARATOR);
if(isset($_FILES["idaud"]["tmp_name"]))
{
    if(is_uploaded_file($_FILES["idaud"]["tmp_name"]))
    {
        // Если файл загружен успешно, перемещаем его
        // из временной директории в конечную
        move_uploaded_file($_FILES["idaud"]["tmp_name"], __DIR__ . DS . "preview" . DS ."1".DS.$_FILES["idaud"]["name"]);
       copy( __DIR__ . DS . "preview" . DS ."1".DS.$_FILES["idaud"]["name"],  __DIR__ . DS . "preview" . DS ."1".DS.$_FILES["idaud"]["name"].'.ogg');
        echo "Файл загружен успешно<br/>";
    } else {
        echo "Аудио не загружено<br/>";
    }
}
var_dump($_POST) ;
*/?>
<div id="player"></div>
<audio controls id="audio" preload="metadata">
</audio>
<div id="progress_mp3"></div>
<div id="progress_ogg"></div>
<a href="addpage.html">CANCEL</a><br/>
<a href="index.php">HOME</a><br/>
<input type="button" value="ADD TO MAIN AND SQL" id="btn">
<script>
    var $_FILES = <?php echo json_encode($_FILES); ?>;
    var $_POST = <?php echo json_encode($_POST); ?>;
    var audUrl = '111';
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

    var newTag = document.createElement('script');
    try {
        /*var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        newTag.setAttribute('src', 'scripts/preview.webAudio.js');*/
        newTag.setAttribute('src', 'scripts/preview.audioTag.js');
    } catch (e){
        newTag.setAttribute('src', 'scripts/preview.audioTag.js');
    } finally {
        document.body.appendChild(newTag);
    }






</script>