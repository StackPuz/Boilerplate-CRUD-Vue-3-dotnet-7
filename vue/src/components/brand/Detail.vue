<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form method="post">
          <div class="row">
            <div class="form-group col-md-6 col-lg-4">
              <label for="brand_id">Id</label>
              <input readonly id="brand_id" name="Id" class="form-control form-control-sm" :value="brand.Id" type="number" required />
            </div>
            <div class="form-group col-md-6 col-lg-4">
              <label for="brand_name">Name</label>
              <input readonly id="brand_name" name="Name" class="form-control form-control-sm" :value="brand.Name" required maxlength="50" />
            </div>
            <div class="col-12">
              <h6>Brand's products</h6>
              <table class="table table-sm table-striped table-hover">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="brandProduct in brandProducts" :key="brandProduct">
                    <td>{{brandProduct.Name}}</td>
                    <td class="text-right">{{brandProduct.Price}}</td>
                    <td class="text-center">
                      <router-link class="btn btn-sm btn-secondary" :to="`/product/${brandProduct.Id}`" title="View"><i class="fa fa-eye"></i></router-link>
                      <router-link class="btn btn-sm btn-primary" :to="`/product/edit/${brandProduct.Id}`" title="Edit"><i class="fa fa-pencil"></i></router-link>
                      <router-link class="btn btn-sm btn-danger" :to="`/product/delete/${brandProduct.Id}`" title="Delete"><i class="fa fa-times"></i></router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
              <router-link class="btn btn-sm btn-primary" :to="`/product/create?product_brand_id=${brand.Id}`">Add</router-link>
              <hr />
            </div>
            <div class="col-12">
              <router-link class="btn btn-sm btn-secondary" :to="getRef('/brand')">Back</router-link>
              <router-link class="btn btn-sm btn-primary" :to="`/brand/edit/${brand.Id}?ref=${encodeURIComponent(getRef('/brand'))}`">Edit</router-link>
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
  name: 'BrandDetail',
  data() {
    return {
      brand: {},
      brandProducts: [],
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
      return Service.get(this.$route.params.id).then(response => {
        this.brand = response.data.brand
        this.brandProducts = response.data.brandProducts
      })
    }
  }
}
</script>
