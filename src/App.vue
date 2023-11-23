<script setup lang="ts">
import copyIcon from './components/copyIcon.vue';
import { ref } from "vue";
let showText = ref(false);
let fileInit = ref<string | ArrayBuffer | null>(null);
let xmlInit = ref<string | HTMLDivElement | null>(null);
let fileOutput = ref<string | ArrayBuffer | null>(null);

function loadFile(event: any) {
  let openLpSong = event.target.files[0];
  if (openLpSong) {
    const reader = new FileReader();
    reader.readAsText(openLpSong);
    reader.onload = function () {
      if (reader.result !== null) {
        fileInit.value = reader.result;
      } else {
        console.error("Error reading file:", reader.error);
      }
    };
  }
}

const xmltoText = ()=> {
    // Properties
    if (typeof fileInit.value === "string") {
      let xmlVal = fileInit.value.replace(/<properties>(.*?)<\/properties>/gs, "")
      // Remove Lyrics Tags
      xmlVal = xmlVal.replace(/\<lyrics>|<\/lyrics>/g, "")
      // Remove Verse Tags
      xmlVal = xmlVal.replace(/\<verse.*>|<\/verse>/g, "")
      // Remove LineBreaks Tags
      xmlVal = xmlVal.replace(/(<([^>]+)>)/g, '\n');
      xmlVal = xmlVal.replace(/\n\n/g, '');
      xmlVal = xmlVal.replace(/\s*\n/i, '');
      fileOutput.value = xmlVal
    }

    copyToClip();

}

const copyToClip = () =>{
  if(fileOutput !== null) {
    navigator.clipboard.writeText(fileOutput.value)
    showText.value = true
  }
}


const handWrittenSong = (info:any)=> {
  fileInit.value = info.target.value
}
</script>

<template>
  <div class="flex flex-col gap-y-4 wrapper justify-center">
    <h1 class="text-slate-600 text-3xl font-bold mt-10">Herramienta Canción ProPresenter</h1>
    <label for="uploadXml" class="drop-container" id="dropcontainer">
      <span class="drop-title">Arrastra tus archivos o</span>
      <input id="uploadXml" type="file" @change="loadFile">
    </label>
    <p class="font-bold text-slate-100 bg-slate-900 rounded-lg py-3 animate-pulse animate-ease-in" v-if="showText">Texto Copiado ve a ProPresenter</p>
    <section class="flex gap-x-3">
      <textarea @input="handWrittenSong($event)" placeholder="Canción OpenLp" class=" p-3 w-full border border-slate-300 rounded-md" name="xmlInit" ref="xmlInit" id="xmlInit" cols="30"
        rows="10">{{ fileInit }}</textarea>
        <div class="w-full relative">
          <copyIcon class="right-2 top-2 hover:bg-slate-300 transition-colors duration-200 absolute bg-slate-200 rounded-full p-2">C</copyIcon>
          <textarea placeholder="Canción para ProPresenter" class="bg-slate-100 p-3 w-full border border-slate-300 rounded-md" name="songOutput" id="songOutput" cols="30"
            rows="10" readonly>{{ fileOutput }}</textarea>
        </div>
    </section>
    <button @click="xmltoText"
      class="bg-blue-700 text-white font-bold hover:bg-blue-800 transition-colors duration-200 py-4 rounded-md" :class="{'bg-slate-800/30 text-slate-700/50 pointer-events-none' : !fileInit}">{{ !fileInit ? 'Primero Agrega la Canción' : 'Click para Convertir'}}</button>
  </div>
</template>

<style scoped lang="scss">
input[type=file] {
  &::file-selector-button {
    margin-right: 20px;
    border: none;
    background: #084cdf;
    padding: 10px 20px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    transition: background .2s ease-in-out;

    &:hover {
      background: #0d45a5;
    }
  }
}

.drop-container {
  position: relative;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  padding: 20px;
  border-radius: 10px;
  border: 1px dashed rgb(168, 168, 168);
  color: #444;
  cursor: pointer;
  transition: background .2s ease-in-out, border .2s ease-in-out;

  &:hover {
    background: #eee;
    border-color: #111;
  }

  &:hover .drop-title {
    color: #222;
  }
}

.drop-title {
  color: #444;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  transition: color .2s ease-in-out;
}</style>
