<template>
    <div>
        <!-- v-bind="$attrs" 展开$attrs -->
        <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
    </div>
</template>

<script>
    // emitter里定义了dispatch方法
    import emitter from '../../mixins/emitter.js';
    export default {
        inheritAttrs: false, // $attrs避免设置到根元素上
        componentName: 'jd-input',
        mixins: [emitter], // 将dispatch方法混入
        props: {
            value: { // input元素的内容
                type: String,
                default: ''
            },
            type: { // input元素的类型
                type: String,
                default: 'text'
            }
        },
        methods: {
            onInput(e) {
                // 派发一个input事件，jd-input组件的v-model展开会有一个@input事件，用来监听这里派发的input事件
                this.$emit('input', e.target.value);

                // 通知父级组件执行校验，校验都放在jd-form-item组件里完成
                // this.$parent.$emit('validate'); // 因为jd-form-item不一定是父级组件，可能是祖父级，那么用this.$parent就会有问题，所以用dispatch方法
                this.dispatch('jd-form-item', 'validate');
            }
            
        },
    }
</script>

<style coped>

</style>