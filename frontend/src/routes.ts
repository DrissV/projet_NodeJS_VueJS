import HomePage from '@/pages/HomePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import ProfilePage from '@/pages/ProfilePage.vue';
import SignupPage from '@/pages/SignupPage.vue';
import GaleriePage from '@/pages/GaleriePage.vue';
import ArticlePage from '@/pages/ArticlePage.vue';
import AjoutArticlePage from '@/pages/AjoutArticlePage.vue';

export const routes = [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: SignupPage },
    { path: '/profile', component: ProfilePage },
    { path: '/galerie', component: GaleriePage },
    { path: '/galerie/:id', component: ArticlePage, props: true },
    { path: '/galerie/ajout', component: AjoutArticlePage },
    { path: '/:pathMatch(.*)*', component: NotFoundPage },
];