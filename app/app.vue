<template>
  <div>
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </div>
</template>
<script setup>
// 设置文章分类信息状态
const { data: articleTagList } = await useAsyncData(
    async () => {
        const res = await useTableList('tags').catch(err =>{return []})
        return res
    })
 useState('articleTagList',()=>{return articleTagList.value })

 const { data: articleCategoriesList } = await useAsyncData(
    async () => {
        const res = await useTableListByOrder('article_categories').catch(err =>{return []})
        return res
    })
 useState('articleCategoriesList',()=>{return articleCategoriesList.value })


</script>
