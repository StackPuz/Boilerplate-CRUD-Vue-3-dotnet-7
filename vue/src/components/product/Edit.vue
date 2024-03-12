<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form method="post" @submit.prevent="edit()" enctype="multipart/form-data">
          <div class="row">
            <div class="form-group col-md-6 col-lg-4">
              <label for="product_id">Id</label>
              <input readonly id="product_id" name="Id" class="form-control form-control-sm" v-model="product.Id" type="number" required />
              <span v-if="errors.Id" class="text-danger">{{errors.Id}}</span>
            </div>
            <div class="form-group col-md-6 col-lg-4">
              <label for="product_name">Name</label>
              <input id="product_name" name="Name" class="form-control form-control-sm" v-model="product.Name" required maxlength="50" />
              <span v-if="errors.Name" class="text-danger">{{errors.Name}}</span>
            </div>
            <div class="form-group col-md-6 col-lg-4">
              <label for="product_price">Price</label>
              <input id="product_price" name="Price" class="form-control form-control-sm" v-model="product.Price" type="number" step="0.1" required />
              <span v-if="errors.Price" class="text-danger">{{errors.Price}}</span>
            </div>
            <div class="form-group col-md-6 col-lg-4">
              <label for="product_brand_id">Brand</label>
              <select id="product_brand_id" name="BrandId" class="form-control form-control-sm" v-model="product.BrandId" required>
                <option v-for="brand in brands" :key="brand" :value="brand.Id" :selected="product != null && product.BrandId == brand.Id">{{brand.Name}}</option>
              </select>
              <span v-if="errors.BrandId" class="text-danger">{{errors.BrandId}}</span>
            </div>
            <div class="form-group col-md-6 col-lg-4">
              <label for="product_image">Image</label>
              <input type="file" id="product_image" name="ImageFile" class="form-control form-control-sm" maxlength="50" />
              <a :href="`http://localhost:5000/uploads/products/${product.Image}`" target="_blank" :title="`${product.Image}`"><img class="img-item" :src="`http://localhost:5000/uploads/products/${product.Image}`" /></a>
              <span v-if="errors.Image" class="text-danger">{{errors.Image}}</span>
            </div>
            <div class="col-12">
              <router-link class="btn btn-sm btn-secondary" :to="getRef('/product')">Cancel</router-link>
              <button class="btn btn-sm btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Service from './Service'
import Util from"../../util"

export default {
  name: 'ProductEdit',
  data() {
    return {
      product: {},
      brands: [],
      errors: {}
    }
  },
  mounted() {
    this.get().finally(() => {
      this.initView(true)
    })
  },
  methods: {
    ...Util,
    get() {
      return Service.edit(this.$route.params.id).then(response => {
        this.product = response.data.product
        this.brands = response.data.brands
      })
    },
    edit() {
      let data = { ...this.product }
      data.ImageFile = document.getElementsByName('ImageFile')[0].files[0]
      data = Util.getFormData(data)
      Service.edit(this.$route.params.id, data).then(() => {
        this.$router.push(this.getRef('/product'))
      }).catch((e) => {
        if (e.response.data.errors) {
          this.errors = e.response.data.errors
        }
        else {
          alert(e.response.data.message)
        }
      })
    }
  }
}
</script>
