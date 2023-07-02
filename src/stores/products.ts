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
  const a = localStorage.getItem('cartProducts')
  const b = a ? JSON.parse(a) : null
  const productsOnCart = a ? ref(b) : ref([])

  const quantityChanged = (product: any) => {
    const myPr = productsOnCart.value.find((prod: { id: any }) => prod?.id === product.id)
    if (myPr) myPr.quantity = product.quantity
  }
  const addProduct = (product: any) => {
    const productIsAdded = productsOnCart.value.find((prod: { id: any }) => prod?.id === product.id)
    if (!productIsAdded) {
      product.quantity = 1
      productsOnCart.value.push(product)
    }
  }

  const removeProduct = (product: any) => {
    const index = productsOnCart.value.findIndex((p: { id: any }) => p.id === product.id)
    if (index !== -1) {
      productsOnCart.value.splice(index, 1)
    }
  }

  const clearCart = async () => {
    productsOnCart.value = []
  }

  const myProducts = computed(() => productsOnCart.value)
  const totalProducts = computed(() => productsOnCart.value.length)

  return {
    addProduct,
    removeProduct,
    quantityChanged,
    clearCart,
    myProducts,
    totalProducts
  }
})
