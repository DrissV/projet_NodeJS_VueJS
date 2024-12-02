<template>
    <Layout>
        <template #main>
            <div class="alert alert-danger" v-if="error">
                <p>{{  error }}</p>
            </div>
            <form action="" @submit.prevent="register">
                <div class="form-group mb-3">
                    <label for="firstname" class="form-label">Prénom</label>
                    <input type="text" name="firstname" id="firstname" class="form-control" v-model="firstname" required autocomplete="given-name">
                </div>
                <div class="form-group mb-3">
                    <label for="lastname" class="form-label">Nom</label>
                    <input type="text" name="lastname" id="lastname" class="form-control" v-model="lastname" required autocomplete="family-name">
                </div>
                <div class="form-group mb-3">
                    <label for="phone" class="form-label">Numéro de téléphone</label>
                    <input type="tel" name="phone" id="phone" class="form-control" v-model="phone">
                </div>
                <div class="form-group mb-3">
                    <label for="email" class="form-label">
                        <span class="bi bi-at" aria-hidden="true"></span> Email
                    </label>
                    <input type="email" name="email" id="email" class="form-control" v-model="email" required autocomplete="email">
                </div>
                <div class="form-group mb-3">
                    <label for="password" class="form-label">
                        <span class="bi bi-lock" aria-hidden="true"></span> Mot de passe
                    </label>
                    <input type="password" name="password" id="password" class="form-control" v-model="password" required autocomplete="new-password">
                </div>
                <div class="form-group mb-3">
                    <label for="confirmPassword" class="form-label">
                        <span class="bi bi-lock" aria-hidden="true"></span> Confirmation de mot de passe
                    </label>
                    <input type="password" name="password" id="confirmPassword" class="form-control" v-model="confirmPassword" required autocomplete="new-password">
                </div>
                <div class="form-group mb-3">
                    <button class="btn btn-primary me-2">
                        <span class="bi bi-person-add" aria-hidden="true"></span> S'inscrire
                    </button>
                </div>
            </form>
            
            <RouterLink to="/login" class="btn btn-link mt-3">Vous avez déjà un compte ? Connectez-vous !</RouterLink>
        </template>
    </Layout>
</template>

<script setup>
    import Layout from '@/components/Layout.vue';
    import { ref } from 'vue';

    const firstname =ref('');
    const lastname = ref('');
    const phone = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref(''); 
    const error = ref(null);

    const register = async () => {
        await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                firstname: firstname.value,
                lastname: lastname.value,
                phone: phone.value,
                email: email.value,
                password: password.value,
                confirmPassword: confirmPassword.value,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(async (response) => {
            if (response.ok) {
                location.href = '/login';
            } else {
                const errorData = await response.json();
                error.value = errorData.message;
            }
        })
    }
</script>