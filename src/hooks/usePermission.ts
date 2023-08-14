import useLoginStore from "@/store/login/login"


function usePermission(menu: string, permission: string) {
  const loginStore = useLoginStore()
  const permissions = loginStore.permissions
  return !!permissions.find((item) => item.includes(menu + ':' + permission))
}


export default usePermission
