<template>
    <div>
        <h1>编辑文章</h1>
        <div v-if="articleData">
            
            <van-cell-group inset>
                <van-field v-model="articleData.title" label="标题" placeholder="请输入标题" />
                <van-field v-model="articleData.slug" label="slug地址" placeholder="slug地址" />
                <van-field v-model="articleData.excerpt" rows="2" autosize label="摘要" type="textarea" maxlength="50"
                    placeholder="文章简介..." show-word-limit />
                <van-field label="分类" placeholder="请输入描述">
                    <template #input>
                        <select class="select" placeholder="文章分类" v-model="articleData.category_id"
                            v-if="article_categories.length > 0">
                            <option value="文章分类" disabled name="文章分类">文章分类</option>
                            <option :value="item.id" v-for="item in article_categories">{{ item.name }}</option>
                        </select>
                    </template>
                </van-field>
                <van-field label="标签">
                    <template #input v-if="taglist">
                        <div class="" v-if="taglist.length > 0">
                            <div class=" flex items-center space-x-1">
                                <div v-for="tag in taglist">
                                    <input type="checkbox" class="checkbox checkbox-sm checkbox-info"
                                        v-model="articleData.tag_ids" :value="tag.id"></input>
                                    <van-tag plain type="primary" size="medium">{{ tag.name }}</van-tag>
                                </div>
                            </div>
                            <div class="flex items-center pt-2">
                                <input type="text" class="input w-24 input-sm" v-model="newTagName"><button
                                    class="btn btn-sm" @click="addtag">add</button>
                            </div>
                        </div>
                    </template>
                </van-field>
                <van-field label="发布状态">
                    <template #input>
                        <select class="select" v-model="articleData.status">
                            <option value="draft">草稿</option>
                            <option value="published">已发布</option>
                        </select>
                    </template>
                </van-field> 
                <van-field name="uploadImg" label="封面图片">
                    <template #input>
                        <van-uploader v-model="fileList" :max-count="1" :after-read="uploadFile" />
                    </template>
                </van-field>
                <van-field v-model="articleData.order" border label="排序" type="number" placeholder="数字越大越靠前" />
                <van-field name="switch" label="是否启用">
                    <template #input>
                        <van-switch v-model="articleData.is_active" />
                    </template>
                </van-field>
                <div class="p-2 m-4">
                    <van-button block type="primary" @click="saveArticle" native-type="submit">
                        保存文章
                    </van-button>
                </div>
            </van-cell-group>
        </div>
    </div>
</template>
<script setup>
// 获取文章ID
const route = useRoute()
const articleId = route.query.id
if(!articleId){
    navigateTo('/admin/article/list')
}
// 获取文章信息
const articleData = ref({})
await useAsyncData(
    async () => {
        const res = await useSupabaseClient().from('articles').select('*').eq('id', articleId).single()
        if (!res.error) {
            articleData.value = res.data
        } else {
            return {}
        }
    })
 
const article_categories = useState('articleCategoriesList')
const taglist = useState('articleTagList')
const newTagName = ref('')
const image_url = useSupabaseImgUrl(articleData.value.image_url)
const fileList = ref([
    {url:image_url}
])
const uploadFile = async(file)=>{
     const fileitem = file.file
    try {
        const pathFull = await useSupabaseUpload('articles', fileitem)
        articleData.value.image_url = pathFull
    } catch (err) {
        console.error('图片压缩上传失败')
    }
}
//保存修改
const saveArticle = async()=>{
    const res = await useSupabaseClient().from('articles').update({
        title: articleData.value.title, // 标题
        slug: articleData.value.slug,  // slug字段
        excerpt: articleData.value.excerpt, // 摘要
        content: articleData.value.content, // 内容
        category_id: articleData.value.category_id, // 分类ID
        tag_ids: articleData.value.tag_ids, // 标签IDs
        //author_id:'', // 作者ID
        status: articleData.value.status, // 状态 draft published
        is_active: articleData.value.is_active, // 是否启用
        image_url: articleData.value.image_url, // 封面图片
        order: articleData.value.order, // 排序
    }).eq('id',articleData.value.id)
    if(!res.error){
        navigateTo('/admin/article/list')
    }
}
</script>