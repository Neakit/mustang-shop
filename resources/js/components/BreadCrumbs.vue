<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Главная</a></li>
            <li class="breadcrumb-item active" aria-current="page">Library</li>
        </ol>
    </nav>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: 'Магазин',
          href: '#'
        },
        {
          text: 'Двигатели',
          href: '#'
        }
      ]
    }
  }
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
