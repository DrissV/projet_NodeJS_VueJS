<template>
    <Layout>
        <template #main>
            <form action="" @submit.prevent="ajoutArticle" enctype="multipart/form-data">
                <div class="form-group mb-3">
                    <label for="titre" class="form-label">Titre</label>
                    <input type="text" name="titre" id="titre" class="form-control" required v-model="article.title">
                </div>
                <div class="form-group mb-3">
                    <label for="description" class="form-label">Description</label>
                    <input type="texte" name="description" id="description" class="form-control" required v-model="article.description">
                </div>
                <div class="form-group mb-3">
                    <label for="prix" class="form-label">Prix</label>
                    <input type="number" name="prix" id="prix" step="0.01" class="form-control" required v-model="article.price">
                </div>
                <div class="form-group mb-3">
                    <label for="photoArticle" class="form-label">Photo de l'article</label>
                    <input type="file" name="photoArticle" id="photoArticle" class="form-control" required @change="onFileChange">
                </div>
                <div class="form-group mb-3">
                    <button class="btn btn-primary">Ajouter un article</button>
                </div>
            </form>
        </template>
    </Layout>
</template>

<script setup>
    import Layout from '@/components/Layout.vue';
import { ref } from 'vue';

    const article = ref({});
    const imageUrl = ref(null);

    const { userId, token } = JSON.parse(localStorage.userData);

    const onFileChange = (event) => {
        imageUrl.value = event.target.files[0];
    };

    const ajoutArticle = () => {
        const formData = new FormData();
        formData.append('image', imageUrl.value);
        formData.append('article', JSON.stringify({
            ...article.value,
            userId,
        }));
        console.log(formData);
        fetch('http://localhost:3000/api/articles', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de l\'article');
            }
            return response.json();
        })
        .then((data) => console.log(data.message))
        .catch((error) => console.log(error));
    };
</script>