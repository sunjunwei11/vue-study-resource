<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        provide() {
            return {
                form: this
            }
        },
        props: {
            model: Object,
            rules: Object
        },
        methods: {
            validate(cb) {
                // 获取所有的孩子
                const task = this.$children
                    .filter(item => item.prop)
                    .map(item => item.validate());

                // 统一处理所有promise
                Promise.all(task).then(() => {
                    cb(true);
                }).catch(() => {
                    cb(false);
                });
            }
        },
    }
</script>

<style scoped>

</style>