<template>
    <Layout>
        <template #main>
            <h1>Bienvenue sur la page d'accueil !</h1>
            <div class="d-flex flex-wrap">
                <figure class="text-center col-12 col-sm-4 col-md-3" v-for="film in tab" :key="film">
                    <img :src="VITE_TMDB_API_IMAGE_URL + film.poster_path" :alt="film.title" class="img-fluid img-thumbnail">
                    <figcaption>
                        <p>{{  film.title  }}</p>
                    </figcaption>
                </figure>
            </div>
        </template>
    </Layout>
</template>

<script setup>
    import Layout from '@/components/Layout.vue';
    import { ref, onMounted } from 'vue';

    const { VITE_TMDB_API_URL, VITE_TMDB_API_IMAGE_URL, VITE_TMDB_API_KEY } = import.meta.env;
    const tab = ref([]);

    onMounted(() => {
        fetch(`${VITE_TMDB_API_URL}/movie/popular?api_key=${VITE_TMDB_API_KEY}&language=fr`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erreur de récupération des films populaires');
                }
            })
            .then((data) => tab.value = [...data.results])
            .catch((error) => console.error(error));
    });
</script>