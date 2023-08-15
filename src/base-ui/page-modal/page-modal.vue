<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? modalConfig.header.editTitle : modalConfig.header.newTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'password'">
                <el-input
                  show-password
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData.parentId"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option v-bind="option" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="formData[item.prop]"
                />
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="modal">
import useSystemStore from '@/store/main/system/system'
import { reactive, ref } from 'vue'

// 1.定义外部属性
interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<IProps>()

// 2.定义内部属性
const dialogVisible = ref<boolean>(false)
const isEdit = ref(false)
const editData = ref()

// 3.定义表单数据绑定
const initialForm: any = {}
for (const item of props.modalConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const formData = reactive(initialForm)

// 4.点击确定提交服务器（新建或者编辑）
const systemStore = useSystemStore()
function handleConfirmClick() {
  dialogVisible.value = false
  let data = { ...formData }
  // 出表单数据外还有可能是自定义表单项的数据，因
  // 为是外部传结构，所有数据收集在外部，需要传递过来一起发请求
  if (props.otherInfo) {
    data = { ...data, ...props.otherInfo }
  }
  if (!isEdit.value) {
    systemStore.newPageDataAction(props.modalConfig.pageName, data)
  } else {
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, data)
  }
}

// 新建或者编辑的触发函数暴露给外面使用（控制弹出层的显示和消失）
function setDialogVisible(isNew: boolean = true, data: any = {}) {
  dialogVisible.value = true
  isEdit.value = !isNew
  editData.value = data
  for (const key in formData) {
    if (isNew) {
      formData[key] = ''
    } else {
      formData[key] = data[key]
    }
  }
}
defineExpose({
  setDialogVisible
})
</script>

<style scoped lang="less">
.form {
  padding: 10px 30px;
}
</style>
