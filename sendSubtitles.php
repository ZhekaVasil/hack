<?php
if (isset($_POST['subtitles'])) {
    $data = json_decode($_POST['subtitles']);
    if (file_exists('subcontent/' . $_POST['idvid'] . '/subtitles.json')) {
        unlink('subcontent/' . $_POST['idvid'] . '/subtitles.json');
    }
    if (file_exists('subcontent/' . $_POST['idvid'] . '/audio.mp3')) {
        unlink('subcontent/' . $_POST['idvid'] . '/audio.mp3');
        rmdir('subcontent/' . $_POST['idvid']);
    }

    if (mkdir('subcontent/' . $_POST['idvid'])) {
        file_put_contents('subcontent/' . $_POST['idvid'] . '/subtitles.json', $_POST['subtitles']);
    }


}