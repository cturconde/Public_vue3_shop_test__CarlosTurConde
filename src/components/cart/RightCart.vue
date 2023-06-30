<template>
  <div
    class="container"
    :class="{
      hideContainer: !componentVisible
    }"
  >
    <el-button @click="toggleComponent" class="toggle-button" type="warning" color="black">
      {{ componentVisible ? 'Hide Cart >' : '< Show Cart ' }}
    </el-button>
    <div class="component-container">
      Shopping Cart: {{ totalProducts }}
      <ElementsCart :products="myProducts"></ElementsCart>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import ElementsCart from './ElementsCart.vue'
import { useCartStore } from '@/stores/products'

export default defineComponent({
  name: 'RightCart',
  components: { ElementsCart },
  setup() {
    let totalProducts = ref(0)
    let myProducts = ref()
    const isFirstLoad = ref(true)
    const cartStore = useCartStore()

    totalProducts.value = computed(() => cartStore.totalProducts)
    myProducts.value = cartStore.myProducts
    onMounted(() => {
      if (isFirstLoad.value) {
        let storageItem = localStorage.getItem('cartStorage')

        if (storageItem) {
          storageItem = JSON.parse(storageItem)
          console.log('El elemento existe en el almacenamiento local:', storageItem)
          totalProducts.value = computed(() => storageItem.totalProducts)
          myProducts.value = storageItem.myProducts
          localStorage.removeItem('cartStorage')
        } else {
          console.log('El elemento no existe en el almacenamiento local')
          totalProducts.value = computed(() => cartStore.totalProducts)
          myProducts.value = cartStore.myProducts
        }

        // Actualiza el estado para evitar futuras comprobaciones
        isFirstLoad.value = false
      }
    })

    let componentVisible = ref(false)

    const toggleComponent = () => {
      componentVisible.value = !componentVisible.value
    }
    return {
      componentVisible,
      toggleComponent,
      totalProducts,
      myProducts,
      cartStore,
      isFirstLoad
    }
  }
})
</script>

<style scoped>
.container {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: #f2f2f2;
  border-left: 2px solid black;
  padding: 10px;
  z-index: 999;
}
.hideContainer {
  right: -300px !important;
}
.toggle-button {
  margin-bottom: 10px;
  position: absolute;
  left: -105px;
}

.component-container {
  height: calc(100% - 40px);
  overflow: auto;
}
</style>
