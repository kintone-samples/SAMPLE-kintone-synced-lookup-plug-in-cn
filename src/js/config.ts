/* eslint-disable no-console */
import { createApp } from 'vue'
import ConfigPage from './ConfigPage.vue'

// 获取plugin id，读取和保存时配置信息时都需要用到
const pluginId = kintone.$PLUGIN_ID
// 获取模板中所预留的容器
const main = document.getElementById('main') as HTMLDivElement
// 创建vue组件ConfigPage，并传给它plugin id
const app = createApp(ConfigPage, { pluginId })
app.mount(main)
