<script>
    var checkAjax = false;
    var $_FILES = <?php echo json_encode($_FILES); ?>;
    var $_POST = <?php echo json_encode($_POST); ?>;
    var audUrl = true;


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
        newTag.setAttribute('src', 'scripts/subeditor_and_audio.js');
    } catch (e){
        newTag.setAttribute('src', 'scripts/subeditor_and_audio.js');
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
                request.open('POST', 'adding_and_audio.php', true);
                request.send(data);
            } else {
                console.log('checkAjax no check');
            }
        }
    }


</script>