<template>
  <div class="panel">
    <h1 class="title">X后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="icon">
            <el-icon>
              <UserFilled />
            </el-icon>
            <span class="text">账号登录</span>
          </span>
        </template>
        <PanelAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="icon">
            <el-icon>
              <Iphone />
            </el-icon>
            <span class="text">手机登录</span>
          </span>
        </template>
        <PanelPhone />
      </el-tab-pane>
    </el-tabs>
    <div class="control-account">
      <el-checkbox v-model="isKeep" label="记住密码" />
      <el-link type="primary">记住密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="loginAciton">立即登录</el-button>
  </div>
</template>

<script setup lang="ts" name="panel">
import { ref, watch } from 'vue'
import PanelPhone from './panel-phone.vue'
import PanelAccount from './panel-account.vue'
import { localCache } from '@/utils/cache'


// 账号界面还是手机界面
const currentTab = ref('account')
// 记住密码
const isKeep = ref<boolean>(localCache.getCache('rem_pwd') ?? false)
watch(isKeep, (newValue) => {
  console.log(newValue)
  localCache.setCache('rem_pwd', newValue)
})

// 获取账号登入Tab组件
const accountRef = ref<InstanceType<typeof PanelAccount>>()

// 账号密码在子组件，调用字组件方法：1.进行表单验证；2.进行登入请求
function loginAciton() {
  // console.log('立即登录')
  accountRef.value?.loginAction(isKeep.value)
}
</script>

<style scoped lang="less">
.panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .control-account {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
