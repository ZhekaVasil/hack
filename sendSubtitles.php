<?php
if(isset($_POST['subtitles']))
{
    $data = json_decode($_POST['subtitles']);
    if(  mkdir('subcontent/'.$_POST['idvid']))
    {
        file_put_contents('subcontent/'.$_POST['idvid'].'/subtitles.json',  $_POST['subtitles'] );
    }

}