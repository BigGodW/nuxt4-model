<template>
    <div>
        <div class="flex justify-between">
        <h1>标签管理</h1>
        <van-button type="primary" size="small" is-link @click="showPopup">添加分类</van-button>
    </div>
    <div>
        <div class="overflow-x-auto">
            <table class="table table-zebra text-center" v-if="taglist">
                <!-- head -->
                <thead>
                    <tr class="*:text-center">
                        <th>序号</th>
                        <th>名字</th>
                        <th>描述</th>
                        <th>编辑</th>
                    </tr>
                </thead>
                <tbody v-if="taglist.length > 0">
                    <!-- row 1 -->
                    <tr v-for="(tag, index) in taglist" :key="tag.id">
                        <th>{{ index + 1 }}</th>
                        <td>{{ tag.name }}</td>
                        <td>{{ tag.description }}</td>
                        <td >
                            <button class="btn btn-info btn-xs mr-1" @click="editTag(tag)">编辑</button>
                            <button class="btn btn-error btn-xs" @click="delectTag(tag)">删除</button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
        <van-popup v-model:show="show" class="p-4 rounded-2xl" @closed="closeEdit">
            <div class="">
                <h1 class=" text-center">编辑标签</h1>
                <van-cell-group inset>
                    <van-field v-model="editTagitem.name" label="标题" placeholder="请输入标题" />
                </van-cell-group>
                <van-cell-group inset>
                    <van-field v-model="editTagitem.description" label="描述" placeholder="请输入描述" />
                </van-cell-group>
                <div class=" text-center ">
                    <button class="btn mt-2" @click="saveChangeTag" v-if="editTagId">提交</button>
                    <button class="btn mt-2" @click="addTag" v-else>添加</button>
                </div>
            </div>
        </van-popup>
    </div>
    </div>
</template>
<script setup>
const tags = await useTableList('tags')
const taglist = ref(tags)
const reGetlist = async () => {
    const newlist = await useTableList('tags')
    taglist.value = newlist
}
const delectTag = async (item) => {
    showConfirmDialog({
    title: '确认删除',
    message:
      '删除' + item.name + "分类？",
  })
    .then(
      async () => {
        await useSupabaseClient().from('tags').delete().eq('id', item.id)
        reGetlist()
      }
    )
    .catch(() => {
      // on cancel
    });
}
const show = ref(false)
const showPopup = () => {
    show.value = true
}
const editTagitem = ref({
    name: "",
    description: ""
})
// 编辑标签
let editTagId = ''
const editTag = async (item) => {
    editTagId = item.id
    editTagitem.value.name = item.name
    editTagitem.value.description = item.description
    show.value = true
}
// 关闭弹窗框时重新信息
const closeEdit = () => {
    editTagId = ''
    editTagitem.value = {}
}
// 修改标签
const saveChangeTag = async () => {
    await useSupabaseClient().from('tags').update({ ...editTagitem.value }).eq('id', editTagId)
    reGetlist()
    show.value = false
}
// 添加标签
const addTag = async () => {
    const res = await useSupabaseClient().from('tags').insert({ ...editTagitem.value })
    reGetlist()
    show.value = false


}
</script>