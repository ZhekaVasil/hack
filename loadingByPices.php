<?php
if (isset($_POST['pageIndex'])){
    $pageIndex = $_POST['pageIndex'];
    $mysqli = new mysqli('localhost','root','','project');
    $mysqli->set_charset("utf8");
    $res = $mysqli->query("SELECT * FROM `vid` ORDER BY `vid`.`#` DESC LIMIT $pageIndex, 10");
    $res->data_seek(0);
    while($row =$res->fetch_assoc() ){
        echo '<div class="itemWrapper"><div class="item"><a href="watch.php?idvid='.$row['idvid'].'&audurl='.$row['audurl'].'" target="_self" ><img width="600px" src="'.$row['thumbnail'].'"></a></div></div>';
    };
    $res->close();
    $mysqli->close();
}