<template>
  <div class="flex justify-between items-center m-2">
    <h1>轮播图</h1>
    <nuxt-link to="/admin/carousel/add"><button class="btn btn-info btn-sm">添加轮播</button></nuxt-link>
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
            <th>地址</th>
            <th>图片</th>
            <th>启用</th>
            <th>编辑</th>
          </tr>
        </thead>
        <tbody v-if="carousels.length>0">
          <!-- row 1 -->
          <tr v-for="(carousel, index) in carousels">
            <th>{{ index + 1 }}</th>
            <td><input type="number" v-model="carousel.order" class="input w-12" @change="changeOrder(carousel.id,carousel.order)"></td>
            <td>{{ carousel.title }}</td>
            <td>{{ carousel.link }}</td>
            <td>
              <img class="w-24 h-10 object-cover" :src="useSupabaseImgUrl(carousel.image_url)" alt="">
            </td>
            <td>
              <input type="checkbox" class="checkbox" v-model="carousel.is_active" @change="changeIsActive(carousel)" />
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
</template>

<script setup>

// 获取轮播图数据
const { data: carousels } = await useAsyncData('mycarouts', async () => {
    const res = await useSupabaseClient().from('carousel').select('*').order('order', { ascending: false })
    return res.data ?? []
}, { default: () => [] })
// 修改轮播图状态
const changeIsActive = async (item) => {
  // 修改数据库
  await useSupabaseClient().from('carousel').update({ is_active: item.is_active }).eq('id', item.id)
}
// 修改轮播排序
const changeOrder = async(id,order)=>{
  console.log({id,order})
  await useSupabaseClient().from('carousel').update({ order }).eq('id', id)
}
// 删除轮播
const delectItem = async (item) => {
  showConfirmDialog({
    title: '确认删除',
    message:
      '删除' + item.title + "轮播图？",
  })
    .then(
      async () => {
        await useSupabaseClient().from('carousel').delete().eq('id', item.id)
        const newlist = await useSupabaseClient().from('carousel').select().limit(10)
        carousels.value = newlist.data
      }
    )
    .catch(() => {
      // on cancel
    });
}
// 编辑轮播图
const Edit = (id) => {
  navigateTo({
    path: '/admin/carousel/edit',
    query: { "id": id }
  })
}

</script>