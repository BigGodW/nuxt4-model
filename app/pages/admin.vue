<template>
    <div class="p-4">
        <div >
        <div class="breadcrumbs text-sm">
            <ul>
                <li v-for="item in pathArr"><nuxt-link>{{ item }}</nuxt-link></li>
            </ul>
        </div>
    </div>
    <div class="">
        <nuxt-page></nuxt-page>
    </div>
    </div>
</template>
<script setup>
definePageMeta({
    layout: 'admin'
})
const route = useRoute()
const pathArr = ref(route.path.split('/').filter(part => part !== ''))
watch(
  () => route.path,
  (newPath) => {
    pathArr.value = newPath.split('/').filter(part => part !== '')
  }
)
// 设置文章状态
const { data: articleTagList } = await useAsyncData(
    async () => {
        const res = await useTableList('tags').catch(err =>{return []})
        return res
    })
 useState('articleTagList',()=>{return articleTagList.value })

 const { data: articleCategoriesList } = await useAsyncData(
    async () => {
        const res = await useTableList('article_categories').catch(err =>{return []})
        return res
    })
 useState('articleCategoriesList',()=>{return articleCategoriesList.value })

</script>