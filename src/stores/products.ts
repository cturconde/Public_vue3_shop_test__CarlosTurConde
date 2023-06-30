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

export const useCartStore = defineStore('useCartStore', () => {
  const productsOnCart = ref([])
  const addProduct = (product: any) => {
    console.log('addProduct', product)
    const productIsAdded = productsOnCart.value.find((prod) => prod.id === product.id)
    if (!productIsAdded) {
      product.quantity = 1
      productsOnCart.value.push(product)
    } else product.quantity++
  }

  const removeProduct = (product: any) => {
    const index = productsOnCart.value.findIndex((p) => p.id === product.id)
    if (index !== -1) {
      productsOnCart.value.splice(index, 1)
    }
  }

  const myProducts: any = computed(() => productsOnCart.value)
  const totalProducts = computed(() => productsOnCart.value.length)

  return {
    addProduct,
    removeProduct,
    myProducts,
    totalProducts
  }
})
