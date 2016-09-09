<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Main</title>
    <link rel="stylesheet" href="css/style.css">
    <style>
        html {
           /* background-color: black;*/
            padding: 0 0 40px 0;
        }

        .container .home {
            display: none!important;
        }


        body {
            position: relative;
            text-align: center;
        }
        #moreBtn {
            position: absolute;
            bottom: -75px;
            left: 0;
            right: 0;
            margin: 0 auto;
            cursor: pointer;
        }
        #moreBtn:hover svg {
            fill: rgba(255,255,255,.8) ;
        }


         .formWrapper {
            opacity: 0;
            background: rgba(0,0,0,.9);
            position: fixed;
            top: 0;
             bottom: 0;
             left: 0;
             right: 0;
             margin: 0 auto;
             -webkit-transition: all .3s linear;
             -moz-transition: all .3s linear;
             -ms-transition: all .3s linear;
             -o-transition: all .3s linear;
             transition: all .3s linear;
        }
        .show {
            opacity: 1;
        }
        .formWrapper .formContainer {
            position: absolute;
            top: 150px;
            width: 80%;
            height: 310px;
            background:#000000;
            left: 0;
            right: 0;
            margin: 0 auto;
            border: 3px solid #0a0a0a;
            border-radius: 10px;
            font-family: sans-serif;
            color: #fff;
        }
        .formWrapper .formContainer h3 {
            font-size: 32px;
        }
        .formWrapper .formContainer label {
            font-size: 24px;
        }
        .formWrapper .formContainer input[type='text']{
            width: 70%;
            height: 40px;
            padding: 0 0 0 15px;
        }
        .formWrapper .formContainer input[type='submit'], .formWrapper .formContainer input[type='button'], #moreBtn{
            margin-top: 50px;
            width: 100px;
            height: 50px;

            font: bold 14px sans-serif ;
        }

        .main .itemWrapper {
            margin: 0 0 30px;
        }
        .main .itemWrapper .item{
            display: inline-block;
            overflow: hidden;
            border: 2px solid #fff;

        }
        .main .itemWrapper .item img {
            margin-bottom: -4px;
            -webkit-transition: all .4s ease-in-out;
            -moz-transition: all .4s ease-in-out;
            -ms-transition: all .4s ease-in-out;
            -o-transition: all .4s ease-in-out;
            transition: all .4s ease-in-out;
        }
        .main .itemWrapper .item:hover {
            background: #000;
        }
        .main .itemWrapper .item:hover img {
            transform: scale(1.05);
        }
    </style>
</head>
<body>
<?php require('components/header.php') ?>
<div class="main">
<?php
    $mysqli = new mysqli('localhost','root','','project');
    $mysqli->set_charset("utf8");
    $res = $mysqli->query("SELECT * FROM `vid` ORDER BY `vid`.`#` DESC LIMIT 0,10");
    $res->data_seek(0);
    while($row =$res->fetch_assoc() ){
    echo '<div class="itemWrapper"><div class="item"><a href="watch.php?idvid='.$row['idvid'].'&audurl='.$row['audurl'].'" target="_self" ><img width="600px" src="'.$row['thumbnail'].'"></a></div></div>';
}


?>
<!--<input type="button" value="Еще" id="moreBtn">-->

    </div>
<div id="moreBtn">
    <svg width="50px" height="50px" fill="#fff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
        <g><path d="M500,713.3L10,390.4l68.5-103.8L500,564.5l421.5-277.9L990,390.4L500,713.3z"/></g>
</svg>
</div>
<script>

    var addForm = document.getElementsByClassName('addNewContent')[0];
    addForm.addEventListener('click', addPage);
    function addPage() {
        var request = new XMLHttpRequest();
        request.addEventListener('load', show);
        request.open("POST","addpage.php", true);
        request.send(null);
        function show(e) {
            var data = e.target;
            if(data.status == 200){
                var div = document.createElement('div');
                div.setAttribute('class', 'formWrapper');

                div.innerHTML = data.responseText;
                document.body.appendChild(div);
                setTimeout(function () {
                    div.classList.add('show');
                },10);
                closeModal();

            }
        }
    }


    var moreBtn = document.getElementById('moreBtn');
    moreBtn.addEventListener("click", showMoreContent);
    var pageIndex = 10;
    function showMoreContent(){
        this.setAttribute('disabled','');
        var data = new FormData();
        data.append('pageIndex',pageIndex );
        var request = new XMLHttpRequest();
        request.addEventListener('load', addMoreContent);
        request.open("POST","loadingByPices.php", true);
        request.send(data);



        pageIndex+=10;
    };
    function addMoreContent(e){
        var data = e.target;
        if (data.status == 200) {
            var picewrapper = document.createElement('div');
            picewrapper.setAttribute('class', 'main');
            picewrapper.innerHTML = data.responseText;
            document.body.appendChild(picewrapper);
            moreBtn.removeAttribute('disabled');
        }
    }

    function closeModal() {
        var cancelBtn = document.getElementById('cancel');
        cancelBtn.addEventListener('click',close);
        function close() {
            var modal = document.getElementsByClassName('formWrapper')[0];
            document.body.removeChild(modal);
        }
    }
</script>
</body>

</html>