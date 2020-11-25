<template>
  <div
    v-cloak
    class="DragDrop"
    :class="{ 'DragDrop-hover': isDragging, 'pointer-thought': !isDragging }"
    @drop="addFile"
    @dragenter="isDragging = true"
  >
    <slot />
    <div 
      v-show="isDragging"
      class="DragDrop-box acrylic__search"
    >
      <div class="DragDrop-box-inset">
        <b-icon
          icon="download"
          size="is-large"
          custom-class="has-text-grey"
        />
        <h3 class="title is-4 has-text-centered has-text-grey">
          Arrastra tu app o link aquí
        </h3>
      </div>
    </div>
    <!-- <h2>Files to Upload (Drag them over)</h2> -->
    <!-- <ul>
      <li v-for="(file, i) in files" :key="i">
        {{ file.name }} ({{ file.size | kb }} kb) <button @click="removeFile(file)" title="Remove">X</button>
      </li>
    </ul> -->
    <!-- <button :disabled="uploadDisabled" @click="upload">Upload</button> -->
    <!-- <div
      v-for="(file, i) in apps"
      :key="i"
      class="dbox-app-card"
    >
      <h2 class="title is-4 has-text-centered has-text-grey-lighter">
        {{ file }}
      </h2>
    </div> -->
  </div>
</template>

<script>
import path from 'path';

export default {
    data() {
        return {
            files:[],
            apps: [],
            isDragging: false
        };
    },
    mounted() {
      document.addEventListener('dragenter', () => {
        this.isDragging = false;
      });
      document.addEventListener('dragleave', () => {
        this.isDragging = true;
      });
    },
    computed: {
      uploadDisabled() {
        return this.files.length === 0;
      }
    },
    methods: {
        addFile(e) {
          let droppedFiles = e.dataTransfer.files;
          if(!droppedFiles) return;
          // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
          [...droppedFiles].forEach(f => {
            this.files.push(f);
            let nameApp = path.parse(f.name).name;
            this.apps.push(nameApp)
          });
          console.log(this.files);
          console.log(this.apps);
        },
        removeFile(file){
          this.files = this.files.filter(f => {
            return f != file;
          });      
        },
        onDragOver(e) {
          console.log('🎆 onDragOver(e)', e);
        }
    }
};
</script>

<style lang="scss" scoped>
.DragDrop {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.DragDrop-hover {
  background: #00000065;
}
.pointer-thought {
    pointer-events: none;
}
.DragDrop-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
  border-radius: 10px;
  // background-color: white;
}
.DragDrop-box-inset {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 93%;
  height: 90%;
  border-radius: 10px;
  border: 3px dashed #7a7a7a;
  z-index: 10;
}
.dbox-app-card {
    width: 141px;
    height: 188px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #834d9b;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #d04ed6, #834d9b);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #d04ed6, #834d9b); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
