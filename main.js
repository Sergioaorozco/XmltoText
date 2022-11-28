let xmlInicio = document.getElementById('xmlOrigin');
let xmlFin = document.getElementById('xmlDestino');
let convertFile = document.getElementById('convertButton');
let uploadedFile = document.getElementById('xmlFile');
let copySong = document.getElementById('copySong')
let tooltip = document.getElementById("myTooltip");

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
  } 
}


convertFile.addEventListener('click', function(){
  xmlToText();
})

convertFile.addEventListener('click', function(){
  xmlFin.select()
  xmlFin.setSelectionRange(0,9999)

  // Copy the text inside
  navigator.clipboard.writeText(xmlFin.value)
})

copySong.addEventListener('click', function(){
  xmlFin.select()
  xmlFin.setSelectionRange(0,9999)

  // Copy the text inside
  navigator.clipboard.writeText(xmlFin.value)
  tooltip.innerHTML = "Your Song was copied!";
})


copySong.addEventListener(onmouseout, function(){
  tooltip.innerHTML = "Copy to clipboard";
})