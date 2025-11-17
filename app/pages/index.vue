<template>
    <div class="flex justify-between items-center px-4">
        <span>wubug</span>
        <nuxt-link to="/admin">后台</nuxt-link>
    </div>
    <Mycarouts></Mycarouts>
    <MainNav></MainNav>
    <h1>首页信息</h1>
    <div>
        <h1 v-for="i in 10" class="h-30">wenbwenb</h1>
    </div>
</template>