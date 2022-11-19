let xmlInicio = document.getElementById('xmlOrigin');
let xmlFin = document.getElementById('xmlDestino');
let convertFile = document.getElementById('convertButton');
let uploadedFile = document.getElementById('xmlFile')

function xmlToText() {
  if(xmlInicio != "") {
    let newText = xmlInicio.value
    // Remove Tags for XML song
    let addNewLine = newText.replace(/<br\s*\/?>/g, '\n');
    let removeTags = addNewLine.replace(/\s*\<.*?\>\s*/g, '\n');
    xmlFin.value = removeTags
  } 
}


convertFile.addEventListener('click', function(){
  xmlToText();
})

