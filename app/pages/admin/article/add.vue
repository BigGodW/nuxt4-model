<template>
    <h1>文章</h1>
    <div>
        <van-cell-group inset>
            <van-field v-model="newArticle.title" label="标题" placeholder="请输入标题" />
            <van-field v-model="newArticle.slug" label="slug地址" placeholder="slug地址" />
            <van-field v-model="newArticle.excerpt" rows="2" autosize label="摘要" type="textarea" maxlength="50"
                placeholder="请输入描述" show-word-limit />
            <!-- <van-field v-model="newArticle.category_id" label="分类" placeholder="分类" /> -->
            <van-field v-model="newArticle.tag_ids" label="标签" placeholder="标签" />
            <van-field v-model="newArticle.status" label="发布状态" placeholder="状态" />
            <van-field name="uploadImg" label="封面图片">
                <template #input>
                    <van-uploader v-model="fileList" :max-count="1"  :after-read="uploadFile" />
                </template>
            </van-field>
            <van-field v-model="newArticle.order" label="排序" type="number" placeholder="数字越大越靠前" />
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
    excerpt:'', // 摘要
    content:'', // 内容
    //category_id:'', // 分类ID
    tag_ids:'', // 标签IDs
    //author_id:'', // 作者ID
    status:'draft', // 状态 draft published
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
const addNewArticle = async () => {
    if (newArticle.value.title) {
        // console.log('提交信息')
        const res = await useSupabaseClient().from('articles').insert({...newArticle.value})
        console.log(res)
        if (!res.err) {
            // 提交成功
            showSuccessToast('添加成功');
            newArticle.value = {}
            //navigateTo('/admin/article/list')
        }
    } else {
        showFailToast('失败文案')
    }
}
</script>