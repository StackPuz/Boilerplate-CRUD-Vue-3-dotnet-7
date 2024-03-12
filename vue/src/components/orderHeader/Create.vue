<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form method="post" @submit.prevent="create()">
          <div class="row">
            <div class="form-group col-md-6 col-lg-4">
              <label for="order_header_customer_id">Customer</label>
              <select id="order_header_customer_id" name="CustomerId" class="form-control form-control-sm" v-model="orderHeader.CustomerId" required>
                <option v-for="customer in customers" :key="customer" :value="customer.Id" :selected="orderHeader != null && orderHeader.CustomerId == customer.Id">{{customer.Name}}</option>
              </select>
              <span v-if="errors.CustomerId" class="text-danger">{{errors.CustomerId}}</span>
            </div>
            <div class="form-group col-md-6 col-lg-4">
              <label for="order_header_order_date">Order Date</label>
              <input id="order_header_order_date" name="OrderDate" class="form-control form-control-sm" v-model="orderHeader.OrderDate" data-type="date" autocomplete="off" required />
              <span v-if="errors.OrderDate" class="text-danger">{{errors.OrderDate}}</span>
            </div>
            <div class="col-12">
              <router-link class="btn btn-sm btn-secondary" :to="getRef('/orderHeader')">Cancel</router-link>
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
  name: 'OrderHeaderCreate',
  data() {
    return {
      orderHeader: {},
      customers: [],
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
        this.customers = response.data.customers
      })
    },
    create() {
      Service.create(this.orderHeader).then(() => {
        this.$router.push(this.getRef('/orderHeader'))
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
