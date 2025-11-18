<template>
    <div class="md:flex">
        <div class=" bg-red-100 aspect-video flex-3">
            <h1>轮播图</h1>
        </div>
        <div class="bg-yellow-100  flex-1">
            <NuxtLink v-for="i in 6" :to="'/article/'+i" class="">
                <div class="mt-1">
                    <h1 >新闻列表</h1>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>