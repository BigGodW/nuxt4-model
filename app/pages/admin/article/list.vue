<template>
    <div>
        <div class="flex justify-between items-center mb-4">
            <h1>文章列表</h1>
            <button class="btn btn-info">添加文章</button>
        </div>
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
                                        @change="changeOrder(article.id, article.order)"></td>
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
                                    <button class="btn btn-xs btn-success" @click="Edit(article.id)">编辑</button>
                                    <button class="btn btn-xs btn-error" @click="delectItem(article)">删除</button>
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
const getDatalist = async()=>{
    const res = await useTableListByOrder('articles').catch(err =>{return []})
    return res
}

const { data: articlelist } = await useAsyncData(
    async () => {
        return await getDatalist()
    })
const reGetDatalist = async()=>{
    articlelist.value = await getDatalist()
}
// 删除文章
const delectItem = async (article) => {
    const isConfirm = confirm(`确定删除文章【${article.title}】吗？`)
    if (isConfirm) {
        const res = await useSupabaseClient().from('articles').delete().eq('id', article.id)
        if (!res.error) {
            // 删除成功，刷新列表
            articlelist.value = articlelist.value.filter(item => item.id !== article.id)
            showSuccessToast('删除成功')
        }
    }
}
// 修改排序
const changeOrder = async (id, order) => {
    const res = await useSupabaseClient().from('articles').update({ 'order': order }).eq('id', id)
    if (!res.error) {
        showSuccessToast('排序更新成功')
        reGetDatalist()
    }
}
// 修改启用状态
const changeIsActive = async (article) => {
    const res = await useSupabaseClient().from('articles').update({ 'is_active': article.is_active }).eq('id', article.id)
    if (!res.error) {
        showSuccessToast('状态更新成功')
        reGetDatalist()
    }
}
// 编辑文章
const Edit = (id) => {
    navigateTo({
        path: '/admin/article/edit',
        query: { id: id }
    })
}
</script>