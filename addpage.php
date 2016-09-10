<div class="formContainer">
    <h3>Добавить видео</h3>
    <form name="addform" enctype="multipart/form-data" method="post" action="subeditor.php">
        <label>Ссылка: <input type="text" name="idvid" id="idvid" required placeholder="https://www.youtube.com/watch?v=iFbpMoOFjqM"></label><br>
        <label>Аудио перевод: <input type="file" name="audio" id="audio"></label><br>
        <!-- <label>AUD: <input type="file" name="idaud" id="idaud" ></label>-->
        <input type="submit" id="bt" value="OK">
        <input type="button" id="cancel" value="Отмена">
    </form>
</div>
