<template>
  <!-- 一个循环获取Lookup字段的模板 -->
  <div v-for="i in data.saveConfig" :key="i.label" class="config-row">
    <span class="toggle-wrapper">
      <input :id="`css${i.label}`" v-model="i.checked" type="checkbox" />
      <label class="toggle" :for="`css${i.label}`"><span class="toggle-handler"></span></label>
    </span>
    <span class="lookup-field-name-text-parent">
      <span class="control-label-gaia lookup-field-name-text">{{ i.label }}</span>
    </span>
  </div>
  <div class="kintoneplugin-row">
    <button type="button" class="js-cancel-button kintoneplugin-button-dialog-cancel" @click="cancel">Cancel</button>
    <button type="submit" class="kintoneplugin-button-dialog-ok" @click="save">Save</button>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable no-console */
import { reactive, onMounted } from 'vue'
import { getFormSetting, Lookup } from './lookup.ts'

// 接受外面传递过来的pluginId
const props = defineProps<{ pluginId: string }>()
// 用到的数据声明，并且是响应式的
const data: { config: Lookup[]; saveConfig: Array<{ label: string; checked: boolean; code: string }> } = reactive({
  config: [],
  saveConfig: [],
})
onMounted(async () => {
  const gettedConfig = kintone.plugin.app.getConfig(props.pluginId)
  data.saveConfig = JSON.parse(gettedConfig.setting)
  // 拿到所有是Lookup的字段
  const res: Lookup[] = await getFormSetting()
  // 比对上次保存的结果，并确定哪些勾选哪些不勾选
  const cp = res.map((i) => {
    for (let j = 0; j < data.saveConfig.length; j += 1) {
      if (data.saveConfig[j].code === i.code) {
        return { code: i.code, label: i.label, checked: data.saveConfig[j].checked }
      }
    }
    return { code: i.code, label: i.label, checked: false }
  })
  data.saveConfig = cp
})

// 按下保存按钮时的操作：用plugin的API来保存到kintone内
function save() {
  kintone.plugin.app.setConfig({ setting: JSON.stringify(data.saveConfig) })
}

// 按下取消按钮时的操作：退回到plugin默认页面
function cancel() {
  window.location.href = `../../${kintone.app.getId()}/plugin/`
}
</script>

// 引入css
<style>
@import '../css/config.css';
</style>
