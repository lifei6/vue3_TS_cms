// 编辑和新建功能抽取
import type PageModal from "@/components/page-modal/page-modal.vue"
import { ref } from "vue"

type editFnCallback = (data: any) => void

function usePageModal(editCallback?: editFnCallback) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewDataClick() {
    modalRef.value?.setDialogVisible()
  }
  function handleEditDataClick(data: any) {
    // 角色具有的菜单树的回显回调
    if (editCallback) {
      editCallback(data)
    }
    modalRef.value?.setDialogVisible(false, data)
  }

  return {
    modalRef,
    handleNewDataClick,
    handleEditDataClick
  }
}


export default usePageModal
