<template>
  <h3 style="margin-left: 10px">List of products</h3>
  <div>
    <el-table
      ref="myTable"
      stripe
      :data="filterTableData"
      style="width: auto; height: calc(100vh - 100px)"
    >
      <el-table-column prop="name" width="200" label="Name"
        ><template v-slot="scope">
          {{ scope.row.title }}
        </template></el-table-column
      >

      <el-table-column prop="price" width="150" label="Price"
        ><template v-slot="scope">
          {{ scope.row.price }}€ (-{{ scope.row.discountPercentage }}%)
          <div class="lowerPrice" v-if="minValue == scope.row.price">Lower total price</div>
        </template> </el-table-column
      ><el-table-column prop="description" label="Description"
        ><template v-slot="scope">
          {{ scope.row.description }}
        </template></el-table-column
      ><el-table-column prop="stock" width="100" label="Stock"
        ><template v-slot="scope">
          {{ scope.row.stock }}
        </template></el-table-column
      >
      <el-table-column fixed="left" width="260" label="">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search products by name" />
        </template>
        <template v-slot="scope">
          <el-button @click="moreInfo(scope.row)" type="primary" :icon="View">More info</el-button>
          <el-button
            class="addToCart"
            @click="addToCart(scope.row)"
            type="primary"
            color="green"
            :icon="ShoppingCart"
            >Add</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="modalVisible"
      :title="modalData ? 'Especifications: ' + modalData.title : null"
      :show-close="true"
      :close-on-click-modal="true"
      width="50%"
      align-center
      center
    >
      <div>
        <ul>
          <li v-for="(value, key) in modalData" :key="key">
            {{ key + ': ' + value }}
          </li>
        </ul>
      </div>
    </el-dialog>
    <el-pagination
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :pager-count="4"
      layout="sizes, prev, pager, next"
      :total="props.totalProducts"
      :small="true"
      :disabled="false"
      :background="false"
      class="mt-4"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useProductList, useCartStore } from '@/stores/products'
import { ShoppingCart, View } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'ProductsList',
  props: {
    products: {
      type: Array,
      required: true
    },
    totalProducts: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const myTable = ref(null)
    const search = ref(null)

    let modalData = ref(null)
    let modalVisible = ref(false)
    let pageSize = ref(10)
    let currentPage = ref(1)
    let pageSizes = ref([1, 3, 5, 10, 30, 100])
    const filterTableData = computed(() =>
      props.products.filter(
        (data: any) =>
          !search.value || data.title.toLowerCase().includes(search.value.toLowerCase())
      )
    )
    const minValue = computed(() => {
      const prices = filterTableData.value.map((item: any) => item.price)
      return Math.min(...prices)
    })

    const moreInfo = (data: any) => {
      const { id, thumbnail, images, ...filteredData } = data
      modalData.value = filteredData
      modalVisible.value = true
    }
    const cartStore = useCartStore()

    const addToCart = (product: any) => {
      cartStore.addProduct(product)
      localStorage.setItem('cartProducts', JSON.stringify(cartStore.myProducts))
    }
    let handleSizeChange = async (elements: number) => {
      pageSize.value = elements
      await useProductList().getProductsData(elements, pageSize.value * (currentPage.value - 1))
      return elements
    }
    let handleCurrentChange = async (page: number) => {
      currentPage.value = page
      await useProductList().getProductsData(pageSize.value, pageSize.value * (page - 1))
      return page
    }

    return {
      props,
      search,
      filterTableData,
      minValue,
      modalVisible,
      modalData,
      myTable,
      excludedKeys: ['id', 'thumbnail', 'images'],
      moreInfo,
      addToCart,
      pageSize,
      pageSizes,
      currentPage,
      handleSizeChange,
      handleCurrentChange,
      store: useProductList(),
      ShoppingCart,
      View
    }
  }
})
</script>

<style scoped lang="scss">
/* Estilos específicos del componente */
.lowerPrice {
  color: rgb(194, 100, 0);
  text-shadow: 1px 1px 2px #9c9c9c;
  letter-spacing: 1px;
  padding: 1px;
  margin: 1px;
  font-size: small;
  border: 0.1rem solid rgba(194, 100, 0, 0.792);
  border-radius: 5px;
}
</style>
