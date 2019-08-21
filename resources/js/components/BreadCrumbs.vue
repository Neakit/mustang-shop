<template>
  <b-breadcrumb :items="items" />
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
    }
    .breadcrumb-item + .breadcrumb-item::before {
    content: '>';
    }
</style>
