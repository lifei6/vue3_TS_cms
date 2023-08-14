<template>
  <div class="dashboard">
    <!-- 1.顶部数据的展示 -->
    <el-row :gutter="10">
      <template v-for="item in analysisStore.amountData" :key="item.amount">
        <el-col :span="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <!-- 2.中间的图标 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <chart-card header="分类商品数量(饼图)">
          <pie-echart :pie-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col :span="8">
        <chart-card header="商品销售位置(地图)">
          <map-echart :map-data="showGoodsAddressSale" />
        </chart-card>
      </el-col>
      <el-col :span="8">
        <chart-card header="分类商品数量(玫瑰图)">
          <rose-echart :rose-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
    </el-row>

    <!-- 3.底部的图标 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <chart-card header="分类销量统计(折线图)">
          <line-echart
            :labels="showGoodsCategorySale.labels"
            :values="showGoodsCategorySale.values"
          />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card header="分类商品收藏(柱状图)">
          <bar-echart
            :labels="showGoodsCategoryFavor.labels"
            :values="showGoodsCategoryFavor.values"
          />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import CountCard from '@/components/count-card/count-card.vue'
import ChartCard from '@/components/chart-card/chart-card.vue'
import { PieEchart, RoseEchart, LineEchart, BarEchart } from '@/components/page-echarts'

import useAnalysisStore from '@/store/main/analysis/analysis'

// 1.网络请求
const analysisStore = useAnalysisStore()
analysisStore.fetchDashboardDataAction()

const { goodsCategoryCount, goodsCategorySale, goodsCategoryFavor, goodsAddressSale } =
  storeToRefs(analysisStore)

// 2.中间数据
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => {
    return { name: item.name, value: item.goodsCount }
  })
})

// 中间地图
const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => {
    return { name: item.address, value: item.count }
  })
})

// 3.底部数据
const showGoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name)
  const values = goodsCategorySale.value.map((item) => item.goodsSale)
  return { labels, values }
})

const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})
</script>

<style scoped lang="less">
.el-row {
  margin-bottom: 20px;
}
</style>
