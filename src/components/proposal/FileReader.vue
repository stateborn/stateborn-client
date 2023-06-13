<template>
  <q-uploader
    :label="label"
    @added="getFile"
    @removed="emitRemovedFile"
    bordered
    square
    flat
    multiple
    style="width: 100%"
    :filter="checkFileType"
    color="grey-3"
    class="noise2"
    text-color="primary"
    :hide-upload-btn="true"
  >
    <template v-slot:list="scope">
      <q-list separator>

        <q-item v-for="file in scope.files" :key="file.__key" class="text-left">
          <q-item-section>
            <q-item-label class="full-width ellipsis">
              {{ file.name }}
            </q-item-label>

            <q-item-label caption>
              {{ file.__sizeLabel }} {{file.emitted}}
            </q-item-label>

            <q-item-label v-if="!daoFileMode">
              <q-btn color="red" label="Remove from description"
                     v-if="emittedFileNames.filter(_ => _ === file.name).length > 0" @click="emitRemovedFile(file)"></q-btn>
              <q-btn color="black" label="Add to description" v-else @click="emitFile(file)"></q-btn>
            </q-item-label>
          </q-item-section>

          <q-item-section
            v-if="file.__img"
            thumbnail
            class="gt-xs"
          >
            <img :src="file.__img.src" style="height: 100%">
          </q-item-section>

          <q-item-section middle side>
            <q-btn
              class="gt-xs"
              size="12px"
              flat
              dense
              round
              icon="delete"
              @click="scope.removeFile(file)"
            />
          </q-item-section>
        </q-item>

      </q-list>
    </template>
  </q-uploader>
</template>

<script>

export default {
  name: 'FileReader',
  components: {},
  props: {
    label: {
      type: String,
      default: '',
      required: false,
    },
    fileNameFilter: {
      type: String,
      default: '',
      required: false,
    },
    fileTypeFilter: {
      type: String,
      default: '',
      required: false,
    },
    sizeKbLimit: {
      type: String,
      default: '',
      required: false,
    },
    asBase: {
      type: Boolean,
      default: false,
      required: false,
    },
    daoFileMode: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      emittedFileNames: [],
      showPopup: false,
      errorMessage: 'Only files with .txt extension are accepted!',
    };
  },
  methods: {
    async emitFile(file) {
      this.$emit('fileUploaded', { fileName: file.name, base64File: file.base64 });
      this.emittedFileNames.push(file.name);
    },
    getFile(files) {
      files.forEach((file) => {
        const reader = new FileReader();
        if (this.asBase) {
          reader.readAsDataURL(file);
        } else {
          reader.readAsText(file, 'UTF-8');
        }
        reader.onload = (evt) => {
          let result = evt.target.result;
          if (this.asBase) {
            let encoded = result.toString().replace(/^data:(.*,)?/, '');
            if ((encoded.length % 4) > 0) {
              encoded += '='.repeat(4 - (encoded.length % 4));
            }
            result = encoded;
            file.base64 = result;
            if (this.daoFileMode) {
              this.emitFile(file);
            }
          }
        };
        reader.onerror = (evt) => {
          console.log('error', evt);
        };
      });
    },
    emitRemovedFile(file) {
      if (Array.isArray(file)) {
        file = file[0];
      }
      this.emittedFileNames = this.emittedFileNames.filter((_) => _ !== file.name);
      this.$emit('fileRemoved', file.name);
    },
    checkFileType(files) {
      // in order to remove
      let wasError = false;
      let res = files;
      if (res.length > 1) {
        // showNotificationError('Adding file failed', `Please add only single file`);
        wasError = true;
      }
      if (this.sizeKbLimit !== '') {
        res = files.filter((file) => file.size < (Number(this.sizeKbLimit) * 1000));
        if (!res || res.length === 0) {
          // showNotificationError('Adding file failed', `File size limit is ${this.sizeKbLimit} kb`);
          wasError = true;
        }
      }
      if (this.fileNameFilter !== '' && !wasError) {
        res = files.filter((file) => file.name === this.fileNameFilter);
        if (!res || res.length === 0) {
          // showNotificationError('Adding file failed', `Expected file with name ${this.fileNameFilter}`);
          wasError = true;
        }
      }
      if (this.fileTypeFilter !== '' && !wasError) {
        res = files.filter((file) => file.type === this.fileTypeFilter);
        if (!res || res.length === 0) {
          // showNotificationError('Adding file failed', 'Your file has not expected mime type');
        }
      }
      return res;
    },
  },
};
</script>
