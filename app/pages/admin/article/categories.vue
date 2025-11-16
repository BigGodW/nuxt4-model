<template>
    <h1>文章分类管理</h1>
    <!-- 弹出框 -->
    <div>
        <van-button type="primary" is-link @click="showPopup">添加分类</van-button>
        <van-popup v-model:show="show"  class="w-48 p-4 rounded-2xl">
            <van-cell-group inset>
                <van-field v-model="newCategories.name" label="标题" placeholder="请输入标题" />
                <van-field v-model="newCategories.description" label="分类描述" placeholder="分类描述" />
                <van-field name="uploadImg" label="上传图片">
                    <template #input>
                        <van-uploader v-model="fileList" :max-count="1" :after-read="uploadFile" />
                    </template>
                </van-field>
                <van-field v-model="newCategories.order" label="排序" type="number" placeholder="数字越大越靠前" />
                <van-button block type="primary" @click="addNewcategories" v-if="!newCategories.id"
                    native-type="submit">
                    添加分类
                </van-button>
                <van-button block type="primary" @click="changeCategories" v-else native-type="submit">
                    保存分类
                </van-button>
            </van-cell-group>
        </van-popup>
    </div>
    <div>
        <div class="overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>排序</th>
                        <th>标题</th>
                        <th>描述</th>
                        <th>图片</th>
                        <th>编辑</th>
                    </tr>
                </thead>
                <tbody v-if="categorielist">
                    <tr v-for="(item, index) in categorielist">
                        <th>{{ index + 1 }}</th>
                        <td><input type="number" v-model="item.order" class="input w-12"
                                @change="changeOrder(item.id, item.order)"></td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.description }}</td>
                        <td>
                            <img class="w-16 aspect-square object-cover" v-if='item.icon_url'
                                :src="useSupabaseImgUrl(item.icon_url)" alt="">
                        </td>
                        <td class=" space-x-1">
                            <button class="btn btn-xs btn-success" @click="Edit(item.id)">编辑</button>
                            <button class="btn btn-xs btn-error" @click="delectItem(item)">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
const categories = await useTableListByOrder('article_categories')
const categorielist = ref(categories)
const newCategories = ref({
    name: "",
    description: '',
    icon_url: '',
    order: 0
})
const addNewcategories = async () => {
    if (newCategories.value.name) {
        const res = await useSupabaseClient().from('article_categories').insert({ ...newCategories.value })
        if (!res.error) {
            // 添加成功
            newCategories.value = {}
            fileList.value =[]
            // 刷新分类列表
            categorielist.value = await useTableListByOrder('article_categories')
            // 关闭弹出框
            show.value = false
            showSuccessToast('添加成功')
        }
    }
    return false
}
// 修改排序
const changeOrder = async (id, order) => {
    const res = await useSupabaseClient().from('article_categories').update({ 'order': order }).eq('id', id)
    console.log(res)
    // 刷新分类列表
    categorielist.value = await useTableListByOrder('article_categories')
}
// 弹出框
const show = ref(false);
const showPopup = () => {
    show.value = true;
};
// 图标处理
const fileList = ref([])
const uploadFile = async (file) => {
    const fileitem = file.file
    // 压缩图片
    try {
        const pathFull = await useSupabaseUpload('articles', fileitem)
        newCategories.value.icon_url = pathFull
    } catch (err) {
        console.error('图片压缩上传失败')
    }
}
// 编辑分类
const Edit = async (id) => {
    show.value = true;
    newCategories.value = categorielist.value.find(item => item.id === id)
}
const changeCategories = async () => {
    const res = await useSupabaseClient().from('article_categories').update({
        'name': newCategories.value.name,
        'description': newCategories.value.description,
        'order': newCategories.value.order,
        'icon_url': newCategories.value.icon_url
    }).eq('id', newCategories.value.id)
    console.log(res)
    if (!res.error) {
        showSuccessToast('保存成功')
        // 刷新分类列表
        categorielist.value = await useTableListByOrder('article_categories')
        fileList.value = []
        newCategories.value = {}
        show.value = false;
    }
}
// 删除分类
const delectItem = async (item) => {
  showConfirmDialog({
    title: '确认删除',
    message:
      '删除' + item.name + "分类？",
  })
    .then(
      async () => {
        await useSupabaseClient().from('article_categories').delete().eq('id', item.id)
        categorielist.value = await useTableListByOrder('article_categories')
      }
    )
    .catch(() => {
      // on cancel
    });
}
</script>