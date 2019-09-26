<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb" v-if="$route.name == 'shop' || $route.name == 'singleProduct'">
            <li class="breadcrumb-item">
                <router-link to="/shop">Магазин</router-link>
            </li>
            <li 
                class="breadcrumb-item active" 
                aria-current="page"
                v-if="$route.params && $route.params.id"
            >{{ $route.params.id }}</li>
        </ol>

        <ol class="breadcrumb" v-else-if="$route.name == 'blog' || $route.name == 'blogpost'">
            <li class="breadcrumb-item">
                <router-link to='/blog'>Блог</router-link>
            </li>
            <li 
                class="breadcrumb-item active" 
                aria-current="page" 
                v-if="$route.params && $route.params.article"
            >
                {{ $route.params.article }}
            </li>
        </ol>
    </nav>
</template>

<script>
export default {
   
}
</script>

<style>
    .breadcrumb {
        margin-bottom: 0;
        background-color: transparent;
        border-radius: 0;
        padding: 0.5rem 1rem;
    }
    .breadcrumb-item + .breadcrumb-item::before {
        content: '>';
    }
</style>
