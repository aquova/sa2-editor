<!DOCTYPE html>
<html>
    <head>
        <title>SA2 PC Editor</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="style.css" type="text/css">
    </head>
    <body>
        <?php include 'init.php'; ?>
        <h1>Sonic Adventure 2 PC Save Editor</h1>
        <label for="fileinput">Upload a save file: </label>
        <input type="file" id="fileinput" autocomplete="off"/>
        <br/>
        <input type="button" id="savebutton" value="Save data" class="disabled" disabled/>
        <br/>
        <details>
            <summary>How to find your save data</summary>
            <ul>
                <li>In Steam, right click the game and select 'Manage > Browse Local Files'.</li>
                <li>Then go to 'resource > gd_PC > SAVEDATA'.</li>
                <li>Your save files should be named 'SONIC2B__SXX' where 'XX' is your save file number.</li>
                <li>The 'SONIC2B__ALF' files are your Chao Garden files, and are not supported by this editor.</li>
            </ul>
        </details>
        <hr/>
        <h2>Save Details</h2>
        <p id="emblem_count">Number of Emblems: 0</p>
        <p id="ring_count">Total Rings: 0</p>
        <div id="tables">
            <?php generate_all_tbls(); ?>
        </div>
    </body>
    <script type="module" src="js/index.js"></script>
</html>
