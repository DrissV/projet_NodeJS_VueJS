<template>
    <Layout>
        <template #main>
            <h1>Article n°{{ id }}</h1>
            <article v-if="article">
                <figure>
                    <img :src="article.imageUrl" :alt="article.title">
                    <figcaption>
                        <p>{{ article.title }}</p>
                        <p class="small">{{ article.description }}</p>
                        <p>{{ article.price }}</p>
                    </figcaption>
                </figure>
            </article>
        </template>
    </Layout>
</template>

<script setup>
    import Layout from '@/components/Layout.vue';
import { onMounted, onServerPrefetch, ref } from 'vue';

    const props = defineProps({
        id: String,
    });

    const article = ref(null);

    const { userId, token } = JSON.parse(localStorage.userData);

    onMounted(async () => {
        const response =  await fetch(`http://localhost:3000/api/articles/${props.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

        article.value = await response.json();
    });
</script>