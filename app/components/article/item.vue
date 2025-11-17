<template>
    <NuxtLink :to="'/article?id='+article.id">
    <div class=" flex m-2 p-1 ">
        <div class=" h-24 aspect-3/2">
            <img v-if="!article.image_url" :src="/public/img/wubug.png" alt="">
            <img v-else class="h-full w-full object-cover" :src="useSupabaseImgUrl(article.image_url)" alt="">
        </div>
        <div class="flex-1 ml-2">
            <h1 class="line-clamp-1 font-bold text-lg font-mono">{{ article.title }}</h1>
            <p class="line-clamp-2">{{ article.excerpt }}</p>
            <div class="">
                <span v-for="tag in article.tag_ids">
                    <van-tag type="primary" v-if="getArticleTagName(tag)" class="mr-2 p-1">
                    {{ getArticleTagName(tag) }}
                </van-tag>
                </span>
            </div>
        </div>
    </div>
    </NuxtLink>
</template>
<script setup>

const articleitem = defineProps(['article'])


</script>