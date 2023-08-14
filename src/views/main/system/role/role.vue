<template>
  <div :class="searchConfig.pageName">
    <!-- 1.搜索区域 -->
    <page-search
      :searchConfig="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />

    <!-- 2.展示区域 -->
    <page-content
      :contentConfig="contentConfig"
      ref="contentRef"
      @new-data-click="handleNewDataClick"
      @edit-data-click="handleEditDataClick"
    />

    <!-- 3.弹出新建\编辑区 -->
    <page-modal :modalConfig="modalConfig" ref="modalRef" :other-info="otherInfo">
      <!-- 自定义表单项 -->
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          highlight-current
          :props="{ label: 'name', children: 'children' }"
          @check="handleMenuCheckChange"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="department">
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

// 权限相关导入
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import { ref, nextTick } from 'vue'
import { mapMenuToIds } from '@/utils/map-menu'
import type { ElTree } from 'element-plus'

// 1.搜索和重置功能
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
// 2.modal的逻辑处理:编辑和新建
const { modalRef, handleEditDataClick, handleNewDataClick } = usePageModal(
  newCallback,
  editCallback
)

// 3获取菜单树形数据
// 3.1获取菜单列表
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
// 3.2获取权限id数组（传递给pageModal一起组成提交的表单数据）
const otherInfo = ref({})
function handleMenuCheckChange(data1: any, data2: any) {
  // 一个权限对应一个id,菜单和按钮都是
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}
// 3.3进行权限的回显
const treeRef = ref<InstanceType<typeof ElTree>>()
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
function editCallback(data: any) {
  // 需要先弹出对话框，才能拿到权限树的实例，基于这个实例设置回显数据
  nextTick(() => {
    const menuList = mapMenuToIds(data.menuList)
    treeRef.value?.setCheckedKeys(menuList)
  })
}
</script>

<style scoped></style>
