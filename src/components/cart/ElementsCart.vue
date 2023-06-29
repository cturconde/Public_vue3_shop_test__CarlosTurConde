<template>
  <div>
    <!-- <div v-if="products.lenght > 0"> -->
    <div v-for="(product, index) in products" :key="index" class="product-item">
      <img :src="product.thumbnail" :alt="product.title" class="product-image col" />
      <div class="product-info col">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
      </div>
      <div class="product-actions col">
        <button @click="decrementQuantity(product)">-</button>
        <span>{{ product.quantity }}</span>
        <button @click="incrementQuantity(product)">+</button>
        <button @click="removeProduct(product)">Eliminar</button>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useCartStore } from '@/stores/products'
import ProductCart from './ProductCart.vue'

export default defineComponent({
  name: 'ElementsCart',
  components: { ProductCart },
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    console.log('ElementsCart', props.products)
    const cartStore = useCartStore()

    const removeProduct = (product) => {
      cartStore.removeProduct(product)
    }

    const incrementQuantity = (product) => {
      cartStore.incrementQuantity(product)
    }

    const decrementQuantity = (product) => {
      cartStore.decrementQuantity(product)
    }

    return { props, removeProduct, incrementQuantity, decrementQuantity }
  }
})
</script>

<style scoped>
.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
}

.product-actions button {
  margin-right: 5px;
}
</style>
