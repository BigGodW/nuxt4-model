<template>
    <div class="relative">
        <div class="fixed top-0 left-0 right-0 z-10">
            <article-header-back :title="article?.title" />
        </div>
        <div class=" opacity-0">
            <article-header-back :title="article?.title" />
        </div>
        <div class="m-2" v-if="article.title">
            <div>
                <div class="aspect-video">
                    <img class="w-full h-full object-cover aspect-video" :src="useSupabaseImgUrl(article.image_url)"
                        alt="">
                </div>
                <h1 class=" text-2xl font-bold py-2">{{ article.title }}</h1>
                <div class="flex justify-between">
                    <div>
                        <span>{{ getArticleCategoryName(article.category_id) }}</span>
                    </div>
                    <span>{{ dayjs(article.updated_at).format('YYYY-MM-DD HH:mm:ss') }}</span>
                </div>
                <div class="">
                    <span v-for="tag in article.tag_ids">
                        <van-tag type="primary" v-if="getArticleTagName(tag)" class="mr-2 p-1">
                            {{ getArticleTagName(tag) }}
                        </van-tag>
                    </span>
                </div>
                <p class=" bg-gray-300/10 p-1 rounded"><span>摘要：</span>{{ article.excerpt }}</p>
                <div>
                    <main>
                        <div v-html="article.content"></div>
                    </main>
                </div>
                <pre class=" overflow-hidden">{{ article }}</pre>
            </div>
        </div>
        <div v-else></div>
    </div>
</template>
<script setup>
import dayjs from 'dayjs'
const route = useRoute()
const articleId = route.query.id
// 获取文章信息
const { data: article } = await useAsyncData('getItemArticle', async () => {
    const res = await useSupabaseClient().from('articles').select().eq('id', articleId).single()
    return res.data
})
const now = dayjs(article.value.updated_at).format('YYYY-MM-DD HH:mm:ss')

</script>