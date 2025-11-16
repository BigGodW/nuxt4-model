<template>
    <h1>文章列表</h1>
    {{ articleList }}
</template>

<script setup>
const articles = await useTableList('articles')
const articleList = ref(articles)
console.log(articleList.value)
</script>