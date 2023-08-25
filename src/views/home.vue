<template>
  <div>
    <n-upload
    ref="uploadFile"
    action="undefined"
    :on-before-upload="handleBefore"
    :on-change="changFile"
    :custom-request="customRequest"
    :show-file-list="false"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <archive-icon />
        </n-icon>
      </div>
      <n-text style="font-size: 16px">
        点击或者拖动文件到该区域来上传
      </n-text>
      <n-p depth="3" style="margin: 8px 0 0 0">
        请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
      </n-p>
    </n-upload-dragger>
  </n-upload>
  </div>
</template>

<script setup lang="ts">
import { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui/es/components';
import { ref } from 'vue';
import * as localforage from 'localforage'
import ePub from "epubjs";
const uploadFile = ref(null);
const handleBefore = () => {
  console.log('upload before')
  console.log((uploadFile as any).value.clear())
}
const changFile = (file: UploadFileInfo) => {
  console.log(file)
}
const customRequest = async ({
      file,
      data,
      headers,
      withCredentials,
      action,
      onFinish,
      onError,
      onProgress
    }: UploadCustomRequestOptions) => {
      console.log(file);
      let fileName =  file.name.split('.').shift()|| '';
      let file1 = await new Blob([file.file], { type: "application/epub+zip" }).arrayBuffer();
      var book = ePub(file1, {});
      let coverUrl = await book.coverUrl()
      console.log(book);
      console.log(coverUrl);
      localforage.setItem( fileName, {
        coverUrl: coverUrl,
        file: file.file,
        fileName
      });
    }
</script>

<style scoped>

</style>