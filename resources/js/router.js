import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Shop from './pages/Shop';
import Buying from './pages/Buying';
import Delivery from './pages/Delivery';
import Guarantee from './pages/Guarantee';
import Blog from './pages/Blog';
import Home from './pages/Home';

import Default from './layouts/Default';
import Admin from './layouts/Admin';

import Register from './pages/Register';
import SingleProduct from './pages/SingleProduct';
import Checkout from './pages/Checkout';
// import Admin from './pages/Admin';

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'default',
            component: Default,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: Home
                },
                {
                    path: '/shop',
                    name: 'shop',
                    component: Shop
                },
                {
                    path: '/buying',
                    name: 'buying',
                    component: Buying
                },
                {
                    path: '/delivery',
                    name: 'delivery',
                    component: Delivery
                },
                {
                    path: '/guarantee',
                    name: 'guarantee',
                    component: Guarantee
                },
                {
                    path: '/blog',
                    name: 'blog',
                    component: Blog
                },
            ]
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            // meta: {
            //     requiresAuth: true,
            //     is_admin: true
            // }
        },



        // {
        //     path: '/register',
        //     name: 'register',
        //     component: Register
        // },
        // {
        //     path: '/products/:id',
        //     name: 'single-products',
        //     component: SingleProduct
        // },
        //
        // {
        //     path: '/checkout',
        //     name: 'checkout',
        //     component: Checkout,
        //     props: (route) => ({ pid: route.query.pid })
        // },
        // {
        //     path: '/admin/:page',
        //     name: 'admin-pages',
        //     component: Admin,
        //     meta: {
        //         requiresAuth: true,
        //         is_admin: true
        //     }
        // },
    ],
});
//
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (localStorage.getItem('bigStore.jwt') == null) {
//             next({
//                 path: '/login',
//                 params: { nextUrl: to.fullPath }
//             })
//         } else {
//             let user = JSON.parse(localStorage.getItem('bigStore.user'))
//             if (to.matched.some(record => record.meta.is_admin)) {
//                 if (user.is_admin == 1) {
//                     next()
//                 }
//                 else {
//                     next({ name: 'userboard' })
//                 }
//             }
//             else if (to.matched.some(record => record.meta.is_user)) {
//                 if (user.is_admin == 0) {
//                     next()
//                 }
//                 else {
//                     next({ name: 'admin' })
//                 }
//             }
//             next()
//         }
//     } else {
//         next()
//     }
// })

export default router;
