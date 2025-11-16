<template>
    <h1>tags</h1>
    <div>

        <div class="overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>名字</th>
                        <th>描述</th>
                        <th>编辑</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="(tag, index) in taglist">
                        <th>{{ index + 1 }}</th>
                        <td>{{ tag.name }}</td>
                        <td>{{ tag.description }}</td>
                        <td>
                            <button class="btn">编辑</button>
                            <button class="btn">删除</button>
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

</script>