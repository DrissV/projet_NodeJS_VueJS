<template>
    <Layout>
        <template #main>
            <div class="alert alert-danger" v-if="error">
                <p>{{  error }}</p>
            </div>
            <form action="" @submit.prevent="login">
                <div class="form-group mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" name="email" id="email" class="form-control" v-model="email" required>
                </div>
                <div class="form-group mb-3">
                    <label for="password" class="form-label">Mot de passe</label>
                    <input type="password" name="password" id="password" class="form-control" v-model="password" required>
                </div>
                <div class="form-group mb-3">
                    <button class="btn btn-primary me-2">Se connecter</button>
                    <RouterLink to="/register">Vous n'avez pas de compte ? Veuillez vous inscrire !</RouterLink>
                </div>
            </form>
        </template>
    </Layout>
</template>

<script setup>
    import Layout from '@/components/Layout.vue';
    import { ref } from 'vue';

    const email = ref('');
    const password = ref('');
    const error = ref(null);

    const login = async () => {
        await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(async (response) => {
            const data = await response.json();
            if (response.ok) {
                localStorage.userData = JSON.stringify(data);
                location.href = '/';
            } else {
                error.value = data.message;
            }
        })
    }
</script>