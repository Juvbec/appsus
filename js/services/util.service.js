function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function makeId(length=5) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }


export default {
    getRandomInt,
    makeId,
    resetCursor,
    readTextFile
}

function resetCursor(txtElement) { 
    if (txtElement.setSelectionRange) { 
        txtElement.focus(); 
        setTimeout(()=>{
            txtElement.setSelectionRange(0, 0); 
        },0);
    } else if (txtElement.createTextRange) { 
        var range = txtElement.createTextRange();  
        range.moveStart('character', 0); 
        range.select(); 
    } 
}


function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        } else {
            console.log('cant read json file');           
        }
    }
    rawFile.send(null);
}

