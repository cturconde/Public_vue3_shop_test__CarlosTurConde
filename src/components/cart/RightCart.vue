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
      Cesta de la compra
      <ElementsCart :products="cartStore.myProducts"></ElementsCart>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import ElementsCart from './ElementsCart.vue'
import { useCartStore } from '@/stores/products'

export default defineComponent({
  name: 'RightCart',
  components: { ElementsCart },
  setup() {
    let cartStore = useCartStore()

    console.log('RightCart:', cartStore.myProducts)
    let componentVisible = ref(false)

    let toggleComponent = () => {
      componentVisible.value = !componentVisible.value
    }
    return {
      componentVisible,
      toggleComponent,
      cartStore
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
