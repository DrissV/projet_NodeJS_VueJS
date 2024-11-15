<template>
    <Layout>
        <template #main>
            <h1>Bienvenue dans ma galerie !</h1>
            <p>Il y a {{  galerie.length }} articles à voir !</p>
            <RouterLink class="btn btn-success" to="/galerie/ajout">Ajouter un article</RouterLink>
            <article v-for="article in galerie" :key="article">
                <RouterLink :to="`/galerie/${article._id}`">
                    <figure>
                        <img :src="article.imageUrl" :alt="article.title">
                        <figcaption>
                            <p><strong>Titre</strong> : {{ article.title }}</p>
                            <p class="small"><strong>Description</strong> : {{ article.description }}</p>
                            <p><strong>Prix</strong> : {{ article.price }}</p>
                        </figcaption>
                    </figure>
                </RouterLink>
            </article>
        </template>
    </Layout>
</template>

<script setup>
    import Layout from '@/components/Layout.vue';
    import { onMounted, ref } from 'vue';

    const { userId, token } = JSON.parse(localStorage.userData);

    const galerie = ref([]);

    onMounted(() => {
        fetch('http://localhost:3000/api/articles', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => galerie.value = data.articles)
            .catch((error) => console.error(error));
    });
</script>