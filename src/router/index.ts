import {createRouter, createWebHistory} from 'vue-router';
import TenderList from '../views/TenderList.vue';
import TenderDetail from '../views/TenderDetail.vue';

const routes = [
    {
        path: '/',
        name: 'TenderList',
        component: TenderList,
    },
    {
        path: '/tender/:id',
        name: 'TenderDetail',
        component: TenderDetail,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;