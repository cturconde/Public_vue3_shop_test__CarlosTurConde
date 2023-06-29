import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductList = defineStore('myProductsList2', {
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
