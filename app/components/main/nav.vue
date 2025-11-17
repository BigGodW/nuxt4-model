<template>
    <div>
        <van-tabs v-model:active="active" @click-tab="render" animated scrollspy>
            <van-tab title="推荐">
                <div>
                    <h1 class="text-center">热门推荐</h1>
                     <article-list :articleList="showList"  />
                </div>
            </van-tab>
            <van-tab  v-for="item in categorieslist">
                <template #title> 
                    <div class="flex justify-center items-center space-x-1">
                        <img class=" w-6" :src="useSupabaseImgUrl(item.icon_url)" alt="">
                        <span>{{ item.name }}</span>
                    </div>
                </template>
                <div>
                    <h1 class="text-center flex justify-center items-center">
                        <img class="w-8" :src="useSupabaseImgUrl(item.icon_url)" alt="">
                        <span class="ml-3">{{ item.description }}</span>
                        
                    </h1>
                    <!-- <pre>{{ showList }}</pre> -->
                        <article-list :articleList="showList" />
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script setup>
//文章初始化
const active = ref(0);
const categorieslist = useState('articleCategoriesList')
// 获取文章数据
const getArticleList = async () => {
    const { error, data } = await useSupabaseClient().from('articles').select()
    if (!error) {
        return data
    } else {
        return []
    }
}
const showList = ref([])
const { data: getarticle } = await useAsyncData(() => getArticleList())
showList.value = getarticle.value
// 切换菜单
const render = async (item) => {
    const name = item.title
    // 获取分类id
    let categoriesId
    categorieslist.value.forEach((item) => {
        if (item.name == name) {
            categoriesId = item.id
        } else {
            return false
        }
    })
    // 重新获取数据
    if (categoriesId) {
        showList.value = await useSupabaseClient().from('articles').select().eq('category_id', categoriesId).then(res => {
            if (!res.error) {
                return res.data
            } else {
                return []
            }
        })
    }else{
        showList.value = await getArticleList()
    }
}
</script>