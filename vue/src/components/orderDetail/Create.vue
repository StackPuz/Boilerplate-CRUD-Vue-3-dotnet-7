<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form method="post" @submit.prevent="create()">
          <div class="row">
            <div class="form-group col-md-6 col-lg-4">
              <label for="order_detail_order_id">Order Id</label>
              <input id="order_detail_order_id" name="OrderId" class="form-control form-control-sm" v-model="orderDetail.OrderId" type="number" required />
              <span v-if="errors.OrderId" class="text-danger">{{errors.OrderId}}</span>
            </div>
            <div class="form-group col-md-6 col-lg-4">
              <label for="order_detail_no">No</label>
              <input id="order_detail_no" name="No" class="form-control form-control-sm" v-model="orderDetail.No" type="number" required />
              <span v-if="errors.No" class="text-danger">{{errors.No}}</span>
            </div>
            <div class="form-group col-md-6 col-lg-4">
              <label for="order_detail_product_id">Product</label>
              <select id="order_detail_product_id" name="ProductId" class="form-control form-control-sm" v-model="orderDetail.ProductId" required>
                <option v-for="product in products" :key="product" :value="product.Id" :selected="orderDetail != null && orderDetail.ProductId == product.Id">{{product.Name}}</option>
              </select>
              <span v-if="errors.ProductId" class="text-danger">{{errors.ProductId}}</span>
            </div>
            <div class="form-group col-md-6 col-lg-4">
              <label for="order_detail_qty">Qty</label>
              <input id="order_detail_qty" name="Qty" class="form-control form-control-sm" v-model="orderDetail.Qty" type="number" required />
              <span v-if="errors.Qty" class="text-danger">{{errors.Qty}}</span>
            </div>
            <div class="col-12">
              <router-link class="btn btn-sm btn-secondary" :to="getRef('/orderDetail')">Cancel</router-link>
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
  name: 'OrderDetailCreate',
  data() {
    return {
      orderDetail: {},
      products: [],
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
      return Service.create().then(response => {
        this.products = response.data.products
      })
    },
    create() {
      Service.create(this.orderDetail).then(() => {
        this.$router.push(this.getRef('/orderDetail'))
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
