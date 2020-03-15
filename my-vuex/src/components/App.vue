<template>
    <div>
        <p @click="$store.commit('increment')">{{$store.state.count}}</p>
        <p @click="$store.dispatch('increment')">{{$store.state.count}}</p>
        <p>{{$store.getters.doubleCount}}</p>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>