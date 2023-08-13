// 重置和搜索功能抽取
import type PageContent from "@/components/page-content/page-content.vue"
import { ref } from "vue"


function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>()
  function handleQueryClick(searchInfo: any) {
    contentRef.value?.fetchPageListData(searchInfo)
  }
  function handleResetClick() {
    contentRef.value?.handleResetClick()
  }

  return {
    contentRef,
    handleQueryClick,
    handleResetClick
  }
}


export default usePageContent
