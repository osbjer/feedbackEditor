<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Online feedback editor</title>
</head>
<body>
    <!-- Heading -->
    <div class="container centered column">
        <h1>Online feedback editor</h1>
    </div>

    <!-- Site container -->
    <div class="container">

        <!-- Text area & buttons -->
        <div class="wrapper column">
            <textarea name="comment" id="comment" cols="60" rows="20"></textarea>
            <div class="container">
                <button value="Select" onClick="selectText()">Select</button>
                <button value="Reset" onClick="resetTextbox()">Reset</button>
            </div>
        </div>

        <!-- Sentence list & file chooser -->
        <div class ="container column">
            <div class ="wrapper column" id="textlist">
                <p>Press the button to choose a textfile to load.</p>
            </div>
            <input type="file" id="fileChooser" onChange="updateTxtList(this)" accept=".txt">
        </div>
    </div>
    <script src="scripts.js"></script> 
</body>
</html>