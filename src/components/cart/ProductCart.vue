<template>
  <div>
    <div v-for="(product, index) in products" :key="index" class="product-item">
      <img :src="product.imageUrl" :alt="product.name" class="product-image" />
      <div class="product-info">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
      </div>
      <div class="product-actions">
        <button @click="decrementQuantity(product)">-</button>
        <span>{{ product.quantity }}</span>
        <button @click="incrementQuantity(product)">+</button>
        <button @click="removeProduct(product)">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useCartStore } from '@/stores/products'

export default defineComponent({
  name: 'ProductCart',
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  setup() {
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

    return {
      removeProduct,
      incrementQuantity,
      decrementQuantity
    }
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
