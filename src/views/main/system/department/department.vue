<template>
  <div :class="searchConfig.pageName">
    <!-- 1.搜索区域 -->
    <page-search :searchConfig="searchConfig" @query-click="handleQueryClick" @reset-click="handleResetClick" />

    <!-- 2.展示区域 -->
    <page-content :contentConfig="contentConfig" ref="contentRef" @new-data-click="handleNewDataClick"
      @edit-data-click="handleEditDataClick">
      <!-- 自定义列 -->
      <!-- <template #leader="scope">
        <el-button type="success">{{ scope.prop }}</el-button>
      </template>
      <template #test="scope">
        哈哈哈
      </template> -->
    </page-content>

    <!-- 3.弹出新建\编辑区 -->
    <page-modal :modalConfig="modalConfig" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

// 导入配置
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

import { ref } from 'vue';

// 1.搜索和重置功能
const contentRef = ref<InstanceType<typeof PageContent>>()
function handleQueryClick(searchInfo: any) {
  contentRef.value?.fetchPageListData(searchInfo)
}
function handleResetClick() {
  contentRef.value?.handleResetClick()
}


// 2.modal的逻辑处理
const modalRef = ref<InstanceType<typeof PageModal>>()
function handleNewDataClick() {
  modalRef.value?.setDialogVisible()
}
function handleEditDataClick(data: any) {
  console.log({ ...data })
  modalRef.value?.setDialogVisible(false, data)
}
</script>

<style scoped></style>
