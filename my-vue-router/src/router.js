import Vue from 'vue';
import YvueRouter from '../YvueRouter';
// import YvueRouter from 'vue-router';

import Home from './components/Home';
import About from './components/About';
import RouterLearn from './components/RouterLearn';


Vue.use(YvueRouter);

const routes = [
    { path: '/home', component: Home },
    { 
        path: '/about',
        component: About, 
        // 子路由
        children: [
            {
                path: 'routerLearn',
                component: RouterLearn
            },
            {
                path: '',
                component: {render: h => h('div', 'about下没有子路由')}
            }
        ]
    }
  ]
  
// 创建 router 实例，然后传 `routes` 配置
const router = new YvueRouter({
    routes
})

export default router;