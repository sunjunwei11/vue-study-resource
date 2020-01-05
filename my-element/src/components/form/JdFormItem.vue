<template>
    <div class="form-item">
        <label v-if="label">{{label}}</label>
        <div class="form-item-content">
            <slot></slot>
             <!-- 错误信息 -->
            <p class="err" v-if="err">{{err}}</p>
        </div>
    </div>
</template>

<script>
    import Schema from 'async-validator';
    export default {
        componentName: 'jd-form-item',
        inject: ['form'],
        props: {
            label: {
                type: String,
                default: ''
            },
            prop: {
                type: String
            }
        },
        data() {
            return {
                err: ''
            }
        },
        mounted () {
            this.$on('validate', () => {
                this.validate();
            })
        },
        methods: {
            validate() {
                if (!this.prop) return;

                // 当前的规则
                const rules = this.form.rules[this.prop];

                // 当前值
                const value = this.form.model[this.prop];

                // 校验描述对象
                const desc = {[this.prop]: rules};

                // 创建Schema实例
                const schema = new Schema(desc);

                // 使用schema对值进行校验
                return schema.validate({[this.prop]: value}, errors => {
                    if (errors) {
                        this.err = errors[0].message;
                    } else {
                        this.err = '';
                    }
                })
            }
        },
    }
</script>

<style lang="scss">
    label {
        width: 80px;
        text-align: right;
    }
    .form-item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;
        .form-item-content {
            position: relative;
            margin-left: 10px;
            input {
                width: 200px;
                height: 40px;
                line-height: 40px;
                padding: 0 15px;
                border-radius: 4px;
                outline: 0;
                -webkit-appearance: none;
                border: 1px solid #DCDFE6;
            }
            .err {
                position: absolute;
                left: 0;
                top: 100%;
                margin: 0;
                font-size: 12px;
                color: #f56c6c;
                padding-top: 4px;
            }
        }
    }
</style>