import { createRouter, createWebHashHistory } from 'vue-router'

import NotFound from '../views/404.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/index',
        component: () => import('../views/home.vue'),
        children: [
            {
                path: '/index',
                name: 'Index',
                component: () => import('../views/index.vue')
            }, {
                path: '/toadstool',
                name: 'Toadstool',
                component: () => import('../views/toadstool.vue')
            }, {
                path: '/edible-mushroom',
                name: 'EdibleMushroom',
                component: () => import('../views/edible-mushroom.vue')
            }, {
                path: '/information',
                name: 'Information',
                component: () => import('../views/information.vue')
            }, {
                path: '/about',
                name: 'About',
                component: () => import('../views/about.vue')
            }
        ]
    }, {
        path: '/admin',
        name: 'AdminHome',
        redirect: '/admin/users',
        component: () => import('../views/admin/home.vue'),
        children: [
            {
                path: '/admin/users',
                name: 'Users',
                component: () => import('../views/admin/users.vue')
            }, {
                path: '/admin/tags',
                name: 'Tags',
                component: () => import('../views/admin/tags.vue')
            }, {
                path: '/admin/classify',
                name: 'Classify',
                component: () => import('../views/admin/classify.vue')
            }, {
                path: '/admin/areas',
                name: 'Areas',
                component: () => import('../views/admin/areas.vue')
            }, {
                path: '/admin/cookbook',
                name: 'Cookbook',
                component: () => import('../views/admin/cookbook.vue')
            }, {
                path: '/admin/mushroom',
                name: 'Mushroom',
                component: () => import('../views/admin/mushroom.vue')
            }, {
                path: '/admin/info',
                name: 'Info',
                component: () => import('../views/admin/info.vue')
            }
        ]
    }, {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login.vue')
    }, {
        path: "/404",
        name: "NotFound",
        component: NotFound
    }, {
        path: "/:pathMatch(.*)*",
        redirect: "/404"
    }, {
        path: '/demo',
        name: 'Demo',
        component: () => import('../views/demo.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router