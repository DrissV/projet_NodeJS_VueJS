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
import { onMounted, ref } from 'vue';

    defineProps({
        id: String,
    });

    const article = ref(null);

    onMounted(async () => {
        const response =  await fetch(`http://localhost:3000/api/articles/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log(response);
            return response.json();
        });

        console.log(response);
    });
</script>