<?php
if(isset($_POST['idvid'])){
    rename("preview/".$_POST['idvid']."/audio.mp3", "subcontent/".$_POST['idvid']."/audio.mp3");
    rmdir("preview/".$_POST['idvid']);
    $mysqli = new mysqli('localhost','root','','project');
    $mysqli->set_charset("utf8");
    /*$url = $_POST['idvid'];*/
    /*   parse_str( parse_url( $url, PHP_URL_QUERY ), $my_array_of_vars );*/


    /*parse_str( parse_url( $url, PHP_URL_QUERY ), $my_array_of_vars );*/
    $data = file_get_contents("https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDKW1tr_PpkXur3m9X2y-jKEvUCJ2JurlY&part=snippet&id=".$_POST['idvid']);
    $json = json_decode($data);
    $thumbnail = NULL;
    if(!$json->items[0]->snippet->thumbnails->maxres->url){
        /* echo '<img src="'.$json->items[0]->snippet->thumbnails->high->url.'">';*/
        $thumbnail = $json->items[0]->snippet->thumbnails->high->url;
    } else {
        /*echo '<img src="'.$json->items[0]->snippet->thumbnails->maxres->url.'">';*/
        $thumbnail = $json->items[0]->snippet->thumbnails->maxres->url;
    }



    $stm = $mysqli->prepare("INSERT INTO `project`.`vid` (`#`, `idvid`, `thumbnail`, audurl) VALUES (NULL, ?, ?,?);");
    $stm->bind_param('sss',$_POST['idvid'],$thumbnail,$_POST['audurl'] );
    $stm->data_seek(0);
    $stm->execute();
    $stm->close();
    $mysqli->close();
}
?>
