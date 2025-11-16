<template>
    <h1>文章</h1>
    <div>
        <van-cell-group inset>
            <van-field v-model="newArticle.title" label="标题" placeholder="请输入标题" />
            <van-field v-model="newArticle.slug" label="slug地址" placeholder="slug地址" />
            <van-field v-model="newArticle.excerpt" rows="2" autosize label="摘要" type="textarea" maxlength="50"
                placeholder="文章简介..." show-word-limit />
            <van-field label="分类" placeholder="请输入描述">
                <template #input>
                    <select class="select" placeholder="文章分类" v-model="newArticle.category_id"
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
                                    v-model="newArticle.tag_ids" :value="tag.id"></input>
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
                    <select class="select" v-model="newArticle.status">
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
            <van-field v-model="newArticle.order" border label="排序" type="number" placeholder="数字越大越靠前" />
            <van-field name="switch" label="是否启用">
                <template #input>
                    <van-switch v-model="newArticle.is_active" />
                </template>
            </van-field>
            <div class="p-2 m-4">
                <van-button block type="primary" @click="addNewArticle" native-type="submit">
                    添加文章
                </van-button>
            </div>
        </van-cell-group>
        {{ newArticle }}
    </div>
</template>
<script setup>
const newArticle = ref({
    title: '', // 标题
    slug: '',  // slug字段
    excerpt: '', // 摘要
    content: '', // 内容
    category_id: '', // 分类ID
    tag_ids: [], // 标签IDs
    //author_id:'', // 作者ID
    status: 'draft', // 状态 draft published
    is_active: true, // 是否启用
    image_url: '', // 封面图片
    order: 0, // 排序
});
const fileList = ref([])
const uploadFile = async (file) => {
    const fileitem = file.file
    try {
        const pathFull = await useSupabaseUpload('articles', fileitem)
        newArticle.value.image_url = pathFull
    } catch (err) {
        console.error('图片压缩上传失败')
    }
}
const article_categories = await useTableListByOrder('article_categories')
// 获取标签列表
const tags = await useTableList('tags')
const taglist = ref(tags)
const newTagName = ref('')
const addtag = async () => {
    if (!newTagName.value) {
        showFailToast('标签名称不能为空')
        return
    }
    const res = await useSupabaseClient().from('tags').insert({ name: newTagName.value }).select()
    if (!res.error) {
        taglist.value.push(res.data[0])
        newArticle.value.tag_ids?.push(res.data[0].id)
        newTagName.value = ''
    } else {
        showFailToast('添加标签失败')
    }

}
const addNewArticle = async () => {
    if (newArticle.value.title) {
        // console.log('提交信息')
        const res = await useSupabaseClient().from('articles').insert({ ...newArticle.value })
        console.log(res)
        if (!res.err) {
            // 提交成功
            showSuccessToast('添加成功');
            newArticle.value = {}
            fileList.value = []
            navigateTo('/admin/article/list')
        }
    } else {
        showFailToast('失败文案')
    }
}
</script>