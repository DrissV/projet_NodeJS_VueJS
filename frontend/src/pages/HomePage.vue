<template>
    <Layout>
        
        <template #aside>
            <label for="langue" class="form-label">Langue</label>
            <select id="langue" v-model="lang" @change="onChange" class="form-select">
                <option value="fr">Français</option>
                <option value="en">English</option>
            </select>
        </template>
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
    const lang = ref('fr');

    const onChange = () => fetchMovies();

    const fetchMovies = () => {
        fetch(`${VITE_TMDB_API_URL}/movie/popular?api_key=${VITE_TMDB_API_KEY}&language=${lang.value}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erreur de récupération des films populaires');
                }
            })
            .then((data) => tab.value = [...data.results])
            .catch((error) => console.error(error));
    };

    onMounted(() => fetchMovies());
</script>