import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductList = defineStore('myProductsList2', {
  state: () => ({ products: [], name: 'Products' }),
  getters: {
    productsList: (state) => state.products
  },
  actions: {
    getProductsData(): Promise<any> {
      return new Promise(() => {
        axios
          .get('https://dummyjson.com/products')
          .then((response) => {
            console.log(response.data)
            this.products = response.data.products
          })
          .catch((error) => {
            console.log('error:', error)
          })
      })
    }
  }
})
