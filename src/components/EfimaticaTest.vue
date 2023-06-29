<template>
  <div class="EfimaticaTest">
    <ProductsList :products="store.products" :totalProducts="store.totalProducts" class="col" />
    <RightCart class="col" />
  </div>
</template>

<script lang="ts">
// import ProductsList from '../tables/ProductsList.vue'
import { defineComponent } from 'vue'
import ProductsList from './tables/ProductsList.vue'
import RightCart from './cart/RightCart.vue'
import { useProductList } from '@/stores/products'

export default defineComponent({
  name: 'EfimaticaTest',
  components: {
    ProductsList,
    RightCart
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
.EfimaticaTest {
  overflow: hidden;
}
</style>
