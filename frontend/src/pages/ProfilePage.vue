<template>
    <Layout>
        <template #main>
            <div class="alert alert-danger" v-if="error">
                <p>{{  error }}</p>
            </div>
            <form action="" @submit="updateProfile">
                <div class="form-group mb-3">
                    <label for="firstname" class="form-label">Prénom</label>
                    <input type="text" name="firstname" id="firstname" class="form-control" v-model="user.firstname" required>
                </div>
                <div class="form-group mb-3">
                    <label for="lastname" class="form-label">Nom</label>
                    <input type="text" name="lastname" id="lastname" class="form-control" v-model="user.lastname" required>
                </div>
                <div class="form-group mb-3">
                    <label for="phone" class="form-label">Numéro de téléphone</label>
                    <input type="tel" name="phone" id="phone" class="form-control" v-model="user.phone">
                </div>
                <div class="form-group mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" name="email" id="email" class="form-control" v-model="user.email" required :disabled="hasEmail">
                </div>
                <div class="form-group mb-3">
                    <label for="password" class="form-label">Mot de passe</label>
                    <input type="password" name="password" id="password" class="form-control" v-model="password">
                </div>
                <div class="form-group mb-3">
                    <label for="confirmPassword" class="form-label">Confirmation de mot de passe</label>
                    <input type="password" name="password" id="confirmPassword" class="form-control" v-model="confirmPassword">
                </div>
                <div class="form-group mb-3">
                    <button class="btn btn-primary me-2">Modifier mon profil</button>
                </div>
            </form>
        </template>
    </Layout>
</template>

<script setup>
    import Layout from '@/components/Layout.vue';
    import { computed, onMounted, ref } from 'vue';

    const user = ref({});
    const password = ref('');
    const confirmPassword = ref('');
    const { userId, token } = JSON.parse(localStorage.userData);
    const error = ref('');

    const hasEmail = computed(() => user.value.email);

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                error.value = 'Erreur lors de la récupération des données';
            }

            const data = await response.json();
            user.value = data;
        } catch (error) {
            error.value = 'Erreur de connexion';
        }
    };

    onMounted(() => fetchUserData());

    const updateProfile = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...user.value,
                    password: password.value,
                    confirmPassword: confirmPassword.value,
                }),
            });

            if (!response.ok) {
                error.value = 'Erreur lors de la mise à jour du profil';
            }

            const updatedData = await response.json();
            user.value = updatedData.user;
        } catch (error) {
          error.value = 'Erreur de mise à jour du profil';  
        }
    };
</script>