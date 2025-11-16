<template>
    <h1>tags</h1>
    <div>

        <div class="overflow-x-auto">
            <table class="table" v-if="taglist">
                <!-- head -->
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>名字</th>
                        <th>描述</th>
                        <th>编辑</th>
                    </tr>
                </thead>
                <tbody v-if="taglist.length>0">
                    <!-- row 1 -->
                    <tr v-for="(tag, index) in taglist">
                        <th>{{ index + 1 }}</th>
                        <td>{{ tag.name }}</td>
                        <td>{{ tag.description }}</td>
                        <td>
                            <button class="btn">编辑</button>
                            <button class="btn" @click="delectTag(tag.id)">删除</button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
const tags = await useTableList('tags')
const taglist = ref(tags)
const reGetlist = async()=>{
    const newlist = await useTableList('tags')
    taglist.value = newlist
}
const delectTag = async(id)=>{
    const res =await useSupabaseClient().from('tags').delete().eq('id',id)
    reGetlist()
}
</script>