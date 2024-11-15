import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes.ts';

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const testAuth = (to.path === '/login' || to.path === '/register');
    if (localStorage.userData && (testAuth)) {
        next(from.path);
    } else if (!localStorage.userData && !testAuth) {
        next('/login');
    } else {
        next();
    }
});

const app = createApp(App);
app.use(router);
app.mount('#app');