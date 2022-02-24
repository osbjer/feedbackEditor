function showAlert(message) {

    var messagebox = document.getElementById("messagebox");

    messagebox.textContent = message;
    messagebox.style.visibility = "visible";

    setTimeout(() => {
        messagebox.style.visibility = "hidden";
        messagebox.textContents = "";        
    }, 2000);
}

function addText(id) {
    var textArea = document.getElementById("comment");
    var sentenceButton = document.getElementById("sentence"+id);
    var oldText = textArea.value;
    var newText = sentenceButton.textContent + ' ';
    var position = textArea.selectionStart, newPosition;
    var length = oldText.length;

    if(position < length) {
        firstPart = oldText.substring(0, position);
        secondPart = oldText.substring(position, length);
        text = firstPart + newText + secondPart;
        newPosition = position + newText.length;
    } else {
        text = oldText + newText;
        newPosition = position + newText.length + 1;
    }

    textArea.focus();
    textArea.value = (text);
    textArea.setSelectionRange(newPosition, newPosition);
    
    sentenceButton.style.visibility = "collapse";
}

function resetTextbox() {
    if(confirm('Are you sure you want to reset the text?')){
        document.getElementById("comment").value = "";

        var textListElements = document.getElementById("textlist");
        var childs = textListElements.getElementsByTagName("*");

        var i, child;

        for(i=0; i < childs.length; i++){
            child = document.getElementById("sentence"+i);
            child.style.visibility = "visible";
        }
    }
}

function selectText(){
    var textArea = document.getElementById("comment");
    var text = textArea.value;
    textArea.focus();
    textArea.select();
    navigator.clipboard.writeText(text);
    showAlert("Text copied to clipboard!");
}

function updateTxtList(input) {
    
    var chosenFile = input.files[0];
 
    if (chosenFile) {
        var fileReader = new FileReader();
        fileReader.readAsText(chosenFile);


        fileReader.onload = function(res) { 
            var contents = res.target.result;
            contents = contents.split('\n');

            // Ta bort alla gamla element
            var textListElement = document.getElementById("textlist");
            var lastElementListChild = textListElement.lastElementChild;

            while (lastElementListChild) {
                textListElement.removeChild(lastElementListChild);
                lastElementListChild = textListElement.lastElementChild;
            }

            contents.forEach((element, index) => {
                var tag = document.createElement("div");
                var text = document.createTextNode(element.trim());
                tag.classList.add("text");
                tag.setAttribute("id", "sentence" + index);
                tag.setAttribute("onClick","addText('" + index + "');");
                tag.appendChild(text);
                textListElement.appendChild(tag); 
            });
        }
    } else { 
        alert("Failed to load file");
    } 
}