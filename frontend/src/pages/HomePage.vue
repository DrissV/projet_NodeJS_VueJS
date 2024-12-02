<template>
    <Layout>
        <template #aside>
            <div class="dropdown">
                <button class="btn dropdown-toggle d-flex align-items-center gap-2" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    <span :class="displayedLang.icon" aria-hidden="true"></span>
                    {{ displayedLang.name }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li v-for="(langData, code) in languageMap" :key="code" @click="changeLang(code)">
                        <span :class="langData.icon" aria-hidden="true"></span> {{ langData.name }}
                    </li>
                </ul>
            </div>
        </template>
        <template #main>
            <h1>Bienvenue sur la page d'accueil !</h1>
            <div class="d-flex flex-wrap">
                <figure class="text-center col-12 col-sm-4 col-md-3" v-for="film in tab" :key="film.id">
                    <img :src="VITE_TMDB_API_IMAGE_URL + film.poster_path" :alt="film.title" class="img-fluid img-thumbnail">
                    <figcaption>
                        <p>{{ film.title }}</p>
                    </figcaption>
                </figure>
            </div>
        </template>
    </Layout>
</template>

<script setup>
    import Layout from '@/components/Layout.vue';
    import { ref, onMounted, computed } from 'vue';

    const { VITE_TMDB_API_URL, VITE_TMDB_API_IMAGE_URL, VITE_TMDB_API_KEY } = import.meta.env;

    const tab = ref([]);
    const lang = ref('fr'); // Code langue par défaut

    // Map associant les codes de langue à leurs noms et drapeaux
    const languageMap = {
        fr: { name: 'Français', icon: 'fi fi-fr' },
        en: { name: 'English', icon: 'fi fi-gb' },
        es: { name: 'Spain', icon: 'fi fi-es' },
    };

    const fetchMovies = () => {
        fetch(`${VITE_TMDB_API_URL}/movie/popular?api_key=${VITE_TMDB_API_KEY}&language=${lang.value}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erreur de récupération des films populaires');
                }
            })
            .then((data) => (tab.value = [...data.results]))
            .catch((error) => console.error(error));
    };

    // Change le code langue et rafraîchit les films
    const changeLang = (newLang) => {
        if (!languageMap[newLang]) {
            console.error(`Langue inconnue : ${newLang}`);
            return;
        }
        lang.value = newLang;
        fetchMovies();
    };

    // Déduit le drapeau et le nom affiché à partir du code langue
    const displayedLang = computed(() => {
        return languageMap[lang.value] || { name: 'Langue inconnue', icon: '' };
    });

    onMounted(() => fetchMovies());
</script>
