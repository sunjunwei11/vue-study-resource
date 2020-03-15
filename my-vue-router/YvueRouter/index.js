let vue;
class Router {
    constructor({ routes }) {
        // router-view里面引用了router实例的current属性，
        // 所以当current变化的时候，router-view组件会重新渲染，
        // 重新渲染的时候，会根据当前的hash拿到其对应的组件，
        // 所以就可以将hash对应的组件渲染出来
        this.routes = routes;

        vue.util.defineReactive(this, 'current', '/');
        vue.util.defineReactive(this, 'matched', []); // 保存匹配的路由数组
        this.onHashChange();

        // 监控url变化，url变化的时候更新current，从而触发router-view组件的重新渲染
        window.addEventListener('hashchange', this.onHashChange.bind(this));

        // 创建一个路由映射表，用于让router-view重新渲染的时候，
        // 根据hash拿到对应的要渲染的组件
        // this.routesMap = {};
        // for (let {path, component} of routes) {
        //     this.routesMap[path] = component;
        // }
    }

    // hash变化时，重新获取匹配的路由
    onHashChange() {
        this.current = window.location.hash.slice(1);
        this.matched = []; // 保存匹配的路由数组
        this.match();
    }

    // 递归遍历routes，获取当前hash匹配的路由
    match(routes = this.routes) {
        for (const route of routes) {
            if (this.current.indexOf(route.path) !== -1) {
                this.matched.push(route);
                if (route.children) {
                    this.match(route.children);
                }
            }
        }
    }
}

Router.install = function(_vue) {
    vue = _vue;

    vue.mixin({
        beforeCreate() {
            this.$options.router 
            && (vue.prototype.$router = this.$options.router);
        }
    });

    vue.component('router-link', {
        props: ['to'],
        render(h) {
            return h
                (
                    'a', 
                    { attrs: {href: '#' + this.to} }, 
                    this.$slots.default
                )
        }
    });
    vue.component('router-view', {
        render(h) {
            // 如果是router-view组件，就在实例上设置一个标识
            this.routerView = true;

            // 获取当前router-view的深度
            let depth = 0;
            let parent = this.$parent; // 父组件实例
            while (parent) {
               if (parent.routerView) depth++;
                parent = parent.$parent;
            }

            // 根据当前router-view的深度，从匹配的路由中拿到对应的组件，然后渲染
            let com = this.$router.matched[depth].component;

            // let com = this.$router.routesMap[this.$router.current];
            return h(com);
        }
    });
}

export default Router;