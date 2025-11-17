<template>
    <h1>文章列表</h1>
    <p>{{ articleId }}</p>
</template>
<script setup>
const route = useRoute()
const articleId = route.query.id
console.log("文章ID:",articleId)

</script>