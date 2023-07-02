<template>
  <div
    class="container"
    :class="{
      hideContainer: !componentVisible
    }"
  >
    <el-button
      @click="toggleComponent"
      class="toggle-button"
      type="warning"
      color="black"
      :icon="ShoppingCart"
    >
      {{ componentVisible ? 'Hide >' : 'Show' }}
    </el-button>
    <h3 style="margin-top: 0px; text-decoration: underline">Shopping cart</h3>

    <div class="component-ElementsCart">
      <ElementsCart :products="myProducts"></ElementsCart>
    </div>
    <div class="component-ResumeCart">
      <ResumeCart :totalProducts="totalProducts" :totalPrice="totalPrice"></ResumeCart>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import ElementsCart from './ElementsCart.vue'
import ResumeCart from './ResumeCart.vue'
import { useCartStore } from '@/stores/products'
import { ShoppingCart, Expand, Fold } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'RightCart',
  components: { ElementsCart, ResumeCart },
  setup() {
    let totalProducts = ref(0)

    let myProducts = ref()
    const cartStore = useCartStore()
    const totalpriceStorage = JSON.parse(localStorage.getItem('totalPrice'))
    let totalPrice = totalpriceStorage ? ref(totalpriceStorage) : ref(0)

    totalProducts.value = computed(() => cartStore.totalProducts)
    myProducts.value = cartStore.myProducts

    watch(cartStore, (products, b) => {
      totalPrice.value = 0
      products.myProducts.forEach((product) => {
        totalPrice.value += product.totalPrice
      })
      localStorage.setItem('totalPrice', JSON.stringify(totalPrice.value))
    })

    watch(totalProducts.value, (total, b) => {
      myProducts.value = cartStore.myProducts
      if (total === 0) {
        myProducts.value = []
        totalPrice.value = 0
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
      totalPrice,
      myProducts,
      cartStore,
      ShoppingCart,
      Expand,
      Fold
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
  background-color: #f4f2f2;
  box-shadow: 1px 1px 5px 1px black;
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

.component-ElementsCart {
  height: calc(100% - 130px);
  overflow: auto;
}
</style>
