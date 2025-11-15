<template>
    <h1>轮播图</h1>
    <div v-if="mycarouts.length > 0">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in mycarouts" :key="item.id">{{ item.title }}</van-swipe-item>
        </van-swipe>
    </div>
</template>
<script setup>

const { data: mycarouts } = await useAsyncData('mycarouts', async () => {
    const res = await useSupabaseClient().from('carousel').select('*').eq('is_active', true).order('order', { ascending: false })
    return res.data ?? []
}, { default: () => [] })

</script>
<style>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>