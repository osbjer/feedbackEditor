// Creates an alertbox with a message with a duration (of 2 seconds as default). 
function showAlert(message, duration=2000) {
    
    if(duration <= 0) duration = 2000;
    
    var messagebox = document.getElementById("messagebox");

    messagebox.textContent = message;
    messagebox.style.visibility = "visible";

    setTimeout(() => {
        messagebox.style.visibility = "hidden";
        messagebox.textContents = "";        
    }, duration);
}

// Adds text from a button to the textbox at the current cursor position. 
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

// Function that empties the textbox and resets all the buttons with the sentences.
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

// Function that selects all text in the textbox and adds it to the clipboard.
function selectText(){
    var textArea = document.getElementById("comment");
    var text = textArea.value;
    textArea.focus();
    textArea.select();
    navigator.clipboard.writeText(text);
    showAlert("Text copied to clipboard!");
}

// Resets the list of buttons with all the sentences. 
function updateTxtList(input) {
    
    var chosenFile = input.files[0];
 
    if (chosenFile) {
        var fileReader = new FileReader();
        fileReader.readAsText(chosenFile);


        fileReader.onload = function(res) { 
            var contents = res.target.result;
            contents = contents.split('\n');

            // Remove all old elements
            var textListElement = document.getElementById("textlist");
            var lastElementListChild = textListElement.lastElementChild;

            while (lastElementListChild) {
                textListElement.removeChild(lastElementListChild);
                lastElementListChild = textListElement.lastElementChild;
            }

            // Add all elements
            contents.forEach((element, index) => {
                var textNode = document.createTextNode(element.trim());
                var text = textNode.textContent;

                if(text.length > 0 && text.charAt(0) == '[') {
                    textNode.textContent = text.substring(1, text.length-1);
                    var tag = document.createElement("h2");
                    tag.appendChild(textNode);
                    textListElement.appendChild(tag); 
                } else {
                    var tag = document.createElement("div");
                    tag.classList.add("text");
                    tag.setAttribute("id", "sentence" + index);
                    tag.setAttribute("onClick","addText('" + index + "');");
                    tag.appendChild(textNode);
                    textListElement.appendChild(tag); 
                }
            });
        }
    } else { 
        alert("Failed to load file");
    } 
}