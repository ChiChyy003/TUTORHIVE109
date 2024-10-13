import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import dashboard from '@/views/dashboard.vue';
import dashboardTutors from '../views/dashboardTutors.vue';

const routes = [
{
path: '/',
name: 'Home',
component: Home,
},

{
path: '/dashboard',
name: 'dashboard',
component: dashboard
},

{
    path: '/dashboardTutors',
    name: 'dashboardTutors',
    component: dashboardTutors
    },
];

const router = createRouter({
history: createWebHistory(),
routes,
});

export default router;
