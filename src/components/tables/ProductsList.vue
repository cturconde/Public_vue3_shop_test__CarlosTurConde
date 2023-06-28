<template>
  <h3>List of products</h3>
  <div>
    <el-table
      ref="myTable"
      stripe
      :data="filterTableData"
      style="width: auto; height: calc(100vh - 100px)"
    >
      <el-table-column prop="name" width="200" fixed="left" label="Name"
        ><template v-slot="scope">
          {{ scope.row.title }}
        </template></el-table-column
      >
      <el-table-column prop="description" width="400" label="Description"
        ><template v-slot="scope">
          {{ scope.row.description }}
        </template></el-table-column
      >
      <el-table-column prop="price" width="150" label="Price"
        ><template v-slot="scope">
          {{ scope.row.price }}€ (-{{ scope.row.discountPercentage }}%)
        </template></el-table-column
      ><el-table-column prop="stock" width="100" label="Stock"
        ><template v-slot="scope">
          {{ scope.row.stock }}
        </template></el-table-column
      >
      <el-table-column fixed="right" width="260" label="">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search products by name" />
        </template>
        <template v-slot="scope">
          <el-button @click="moreInfo(scope.row)" type="primary">See more info</el-button>
          <el-button @click="addToCart(scope.row)" type="primary" color="green"
            >Add to cart</el-button
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
      :total="products.length"
      :small="false"
      :disabled="false"
      :background="false"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'ProductsList',
  props: {
    products: {
      type: Array,
      required: true
    }
  },

  data() {
    const myTable = ref(null)
    const search = ref(null)
    const filterTableData = computed(() =>
      this.products.filter(
        (data) => !search.value || data.title.toLowerCase().includes(search.value.toLowerCase())
      )
    )
    return {
      modalVisible: false,
      modalData: null,
      myTable,
      excludedKeys: ['id', 'thumbnail', 'images'],
      filterTableData,
      search
    }
  },
  methods: {
    moreInfo(data) {
      const { id, thumbnail, images, ...filteredData } = data
      this.modalData = filteredData
      this.modalVisible = true
    },
    addToCart(data) {
      // Lógica para realizar la acción con los datos
      console.log('Accion realizada con:', data)
    }
  }
})
</script>

<style scoped>
/* Estilos específicos del componente */
</style>
