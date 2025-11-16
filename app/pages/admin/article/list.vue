<template>
    <div>
        <h1>文章列表</h1>
        <div v-if="articlelist">
            <div>
                <div class="overflow-x-auto">
                    <table class="table">
                        <!-- head -->
                        <thead>
                            <tr class=" *:text-center">
                                <th>ID</th>
                                <th>排序</th>
                                <th>标题</th>
                                <th>分类</th>
                                <th>标签</th>
                                <th>图片</th>
                                <th>启用</th>
                                <th >编辑</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- row 1 -->
                            <tr v-for="(article, index) in articlelist">
                                <th>{{ index + 1 }}</th>
                                <td><input type="number" v-model="article.order" class="input w-12"
                                        @change="changeOrder(carousel.id, carousel.order)"></td>
                                <td>{{ article.title }}</td>
                                <td>{{ getArticleCategoryName(article.category_id) }}</td>
                                <td>
                                    <div v-if="article.tag_ids?.length>0" class="*:m-1">
                                        <div v-for="tag in article.tag_ids" >
                                            <van-tag plain type="primary" size="medium" v-if="getArticleTagName(tag)">{{ getArticleTagName(tag) }}</van-tag>
                                        </div>
                                    </div>
                                </td>
                                <td >
                                    <div v-if="article.image_url">
                                        <img class="w-24 h-16 object-cover" :src="useSupabaseImgUrl(article.image_url)"
                                        alt="">
                                    </div>
                                </td>
                                <td>
                                    <input type="checkbox" class="checkbox" v-model="article.is_active"
                                        @change="changeIsActive(article)" />
                                </td>
                                <td class=" space-x-1">
                                    <button class="btn btn-xs btn-success" @click="Edit(carousel.id)">编辑</button>
                                    <button class="btn btn-xs btn-error" @click="delectItem(carousel)">删除</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// 初始化获取文章列表
const { data: articlelist } = await useAsyncData(
    async () => {
        const res = await useTableList('articles').catch(err =>{return []})
        return res
    })


</script>