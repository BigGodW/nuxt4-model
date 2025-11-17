<template>
    <div v-if="articleList && articleList.length>0">
        <article-item v-for="article in articleList" :key="article.id" :article="article" />
    </div>
    <div v-else>
        <van-empty description="文章正在发布..." />
    </div>
</template>
<script setup>
const props = defineProps(['articleList'])

</script>