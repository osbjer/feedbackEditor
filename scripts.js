function addText(id) {
    var textArea = document.getElementById("comment");
    var oldText = textArea.value;
    var newText = document.getElementById("sentence"+id).textContent;
    textArea.value = (oldText + newText + ' ');
}

function resetTextbox() {
    if(confirm('Are you sure you want to reset the text?')){
        document.getElementById("comment").value = "";
    }
}

function selectText(){
    var textArea = document.getElementById("comment");
    textArea.focus();
    textArea.select();
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