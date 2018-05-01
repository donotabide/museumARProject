var x = 200;
var y = 10;
var allText = [];


function setup(){
    noCanvas();
    var lang = navigator.language || 'en-US';
    let speechRec = new p5.SpeechRec(lang);
    speechRec.onResult = gotSpeech;
    speechRec.continuous = true;
    speechRec.interimResults = false;
    speechRec.start();

    var doc = new jsPDF();

    var container = document.getElementById("container");

    document.getElementById("saveDoc").addEventListener('click', saveToPDF);

    function gotSpeech(){
        if(speechRec.resultValue) {
            let resutString = speechRec.resultString;
            let paragraph = document.createElement('p');
            paragraph.innerText = resutString;
            allText.push(resutString);
            container.appendChild(paragraph);
        }
    }

    function saveToPDF(){
        allText.forEach(line=>{
            doc.text(line, 5, y);
            y += 5;
        });
        doc.save('speechToText.pdf');
    }
}


