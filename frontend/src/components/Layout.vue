<template>
    <div class="container min-vh-100 d-flex flex-column">
        <header role="banner" id="header" class="row">
            <nav role="navigation" aria-label="Menu principal de la page" class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <RouterLink class="navbar-brand" to="/">
                        <img src="../assets/images/logo.png" alt="Logo du site"  height="75">
                    </RouterLink>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon" aria-hidden="true"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <RouterLink class="nav-link active" aria-current="page" to="/">Accueil</RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink class="nav-link" to="/galerie">Galerie</RouterLink>
                            </li>
                        </ul>
                        <ul  class="navbar-nav ms-auto mb-2 mb-lg-0" v-if="!userData">
                            <li class="nav-item">
                                <RouterLink to="/login" class="nav-link me-2">Connexion</RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink to="/register" class="nav-link">Inscription</RouterLink>
                            </li>
                        </ul>
                        <ul  class="navbar-nav ms-auto mb-2 mb-lg-0" v-else>
                            <li class="nav-item">
                                <RouterLink to="/profile" class="nav-link">Mon profil</RouterLink>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link me-2" @click="logout">Déconnexion</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <div class="row flex-grow-1">
            <aside role="complementary" id="aside" class="col-12 col-md-3">
                <slot name="aside"></slot>
            </aside>
            <main role="main" id="main" tabindex="-1" class="col-12 col-md-9">
                <slot name="main"></slot>
            </main>
        </div> 
        <footer id="footer" role="contentinfo" class="row">
            <p class="text-center">&copy; Driss Vandenheede</p>
        </footer>
    </div>
</template>
  
<script setup>
    const { userData } = localStorage;

    const logout = () => {
        localStorage.removeItem('userData');
        location.href = '/login';
    };
</script>

<style>
</style>