let xmlInicio = document.getElementById('xmlOrigin');
let xmlFin = document.getElementById('xmlDestino');
let convertFile = document.getElementById('convertButton');
let uploadedFile = document.getElementById('xmlFile')

function xmlToText() {
  if(xmlInicio != "") {
    let xmlVal = xmlInicio.value
    xmlVal = xmlVal.toString()
    // Song Tags
    // Properties
    let strDoc = xmlVal.replace(/<properties>(.*?)<\/properties>/gs, "")
    // Remove Lyrics Tags
    strDoc = strDoc.replace(/\<lyrics>|<\/lyrics>/g, "")
    // Remove Lyrics Tags
    strDoc = strDoc.replace(/\<verse.*>|<\/verse>/g, "")
    strDoc = strDoc.replace(/(<([^>]+)>)/g, '\n');
    strDoc = strDoc.replace(/\n\n/g, '');
    strDoc = strDoc.replace(/\s*\n/i, '');
    xmlFin.value = strDoc
    console.log(JSON.stringify(strDoc))
  } 
}


convertFile.addEventListener('click', function(){
  xmlToText();
})
