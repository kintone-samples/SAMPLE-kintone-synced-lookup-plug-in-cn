/* eslint-disable no-console */
/* eslint-disable no-debugger */
import { KintoneRestAPIClient } from '@kintone/rest-api-client'

// 定义了一个Lookup类型，其中给lookup设置的是对象类型
// 下面还有展开，到具体用的时候还会定义的更详细，这里够用了
export type Lookup = {
  label: string
  code: string
  lookup: object
}
// 创建sdk客户端
const client = new KintoneRestAPIClient({
  baseUrl: 'https://cndevqpofif.cybozu.cn',
})

// 获取一个应用中所有类型是Lookup的字段
export const getFormSetting = async () => {
  const prop = (await client.app.getFormFields({ app: kintone.app.getId() as number })).properties
  const lookUpFields = Object.values(prop).filter((f) => 'lookup' in f) as Lookup[]
  return lookUpFields
}

// export default getFormSetting
