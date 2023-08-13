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
    <page-modal :modalConfig="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { computed } from 'vue';
import useMainStore from '@/store/main/main'
// 导入组件
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
// 导入配置
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
// 导入hooks
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'


// 0.对modalConfig的下拉框选项进行设置(从服务器获取)
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const entires = mainStore.entireDepartments.map(item => {
    return { label: item.name, value: item.parentId }
  })
  modalConfig.formItems.forEach((item: any) => {
    if (item.prop === 'parentId') {
      item.options.push(...entires)
    }
  })
  return modalConfig
})


// 1.搜索和重置功能
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
// 2.modal的逻辑处理:编辑和新建
const { modalRef, handleEditDataClick, handleNewDataClick } = usePageModal()

</script>

<style scoped></style>
