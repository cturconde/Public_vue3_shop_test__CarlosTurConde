import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'

export const useProductList = defineStore('myProductsList', {
  state: () => ({ products: [], name: 'Products', totalProducts: Number }),
  getters: {
    productsList: (state) => state.products
  },
  actions: {
    getProductsData(elements = 10, skip: null | number = null): Promise<any> {
      return new Promise(() => {
        axios
          .get(`https://dummyjson.com/products?limit=${elements}&skip=${skip ? skip : ''}`)
          .then((response) => {
            this.products = response.data.products
            this.totalProducts = response.data.total
          })
          .catch((error) => {
            console.log('error:', error)
          })
      })
    }
  }
})
// export const useCartStore = defineStore('useCartStore', {
//   state: () => ({ productsOnCart: [], name: 'Products added', totalProducts: Number, totalPrice: Number }),
//   getters: {
//     cartStore: (state) => state.productsOnCart
//   },
//   actions: {
//     addProduct(product: any) => {
//       this.productsOnCart.push(product)
//     }
//   }
// })

export const useCartStore = defineStore('useCartStore', () => {
  const totalProducts = ref(0)
  const productsOnCart = ref([])

  const addProduct = (product: any) => {
    console.log('add: ', product)
    productsOnCart.value.push(product)
    console.log('productsOnCart:', productsOnCart.value)
  }

  const count = ref(0)
  function increment() {
    count.value++
  }

  const myProducts = computed(() => productsOnCart.value)
  return { count, totalProducts, increment, addProduct, myProducts }
})
