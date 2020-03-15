<template>
    <div>
        <p>这是App组件</p>
        <div>
            <router-link to="/home">home</router-link>
            <router-link to="/about">about</router-link>
            <router-link to="/about/routerLearn">about/routerLearn</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>