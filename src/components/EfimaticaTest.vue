<template>
  <div>
    <ProductsList :products="store.products" />
  </div>
</template>

<script lang="ts">
// import ProductsList from '../tables/ProductsList.vue'
import { defineComponent } from 'vue'
import ProductsList from './tables/ProductsList.vue'
import { useProductList } from '@/stores/products'

export default defineComponent({
  name: 'EfimaticaTest',
  components: {
    ProductsList
  },
  data() {
    return {
      store: useProductList()
    }
  },
  async created() {
    await this.store.getProductsData()
  }
})
</script>

<style scoped>
/* Estilos específicos del componente */
</style>
