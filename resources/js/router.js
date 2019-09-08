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

import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';

import SingleProduct from './pages/SingleProduct';
import Checkout from './pages/Checkout';
// import Admin from './pages/Admin';

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Default,
            children: [
                {
                    path: '',
                    name: 'default',
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
            component: Admin,
            // meta: {
            //     requiresAuth: true
            // },
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: Login
                },
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: Dashboard,
                    // meta: {
                    //     requiresAuth: true
                    // }
                },
                {
                    path: 'products/:id',
                    name: 'single-products',
                    component: SingleProduct
                },
                {
                    path: 'products',
                    name: 'products',
                    component: Products
                },
                {
                    path: 'checkout',
                    name: 'checkout',
                    component: Checkout,
                    props: (route) => ({ pid: route.query.pid })
                },
                // {
                //     path: '/admin/:page',
                //     name: 'admin-pages',
                //     component: Admin,
                //     meta: {
                //         requiresAuth: true,
                //         is_admin: true
                //     }
                // }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    // debugger
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // if no token
        if (localStorage.getItem('bigStore.jwt') === null) {
            next({ path: '/admin/login' });
        }
        // } else {
        //     let user = JSON.parse(localStorage.getItem('bigStore.user'));
        //     if (to.matched.some(record => record.meta.is_admin)) {
        //         if (user.is_admin === 1) {
        //             next();
        //         }
        //         else {
        //             next({ path: '/admin/login' })
        //         }
        //     }
            // else if (to.matched.some(record => record.meta.is_user)) {
            //     if (user.is_admin == 0) {
            //         next()
            //     }
            //     else {
            //         next({ name: 'admin' })
            //     }
            // }
            next()

    } else {
        next();
    }
});

export default router;
