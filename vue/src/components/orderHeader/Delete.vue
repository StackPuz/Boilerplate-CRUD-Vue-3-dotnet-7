<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form method="post" @submit.prevent="this.delete()">
          <div class="row">
            <div class="form-group col-md-6 col-lg-4">
              <label for="order_header_id">Id</label>
              <input readonly id="order_header_id" name="Id" class="form-control form-control-sm" :value="orderHeader.Id" type="number" required />
            </div>
            <div class="form-group col-md-6 col-lg-4">
              <label for="customer_name">Customer</label>
              <input readonly id="customer_name" name="customer_name" class="form-control form-control-sm" :value="orderHeader.CustomerName" maxlength="50" />
            </div>
            <div class="form-group col-md-6 col-lg-4">
              <label for="order_header_order_date">Order Date</label>
              <input readonly id="order_header_order_date" name="OrderDate" class="form-control form-control-sm" :value="orderHeader.OrderDate" data-type="date" autocomplete="off" required />
            </div>
            <div class="col-12">
              <router-link class="btn btn-sm btn-secondary" :to="getRef('/orderHeader')">Cancel</router-link>
              <button class="btn btn-sm btn-danger">Delete</button>
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
  name: 'OrderHeaderDelete',
  data() {
    return {
      orderHeader: {}
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
      return Service.delete(this.$route.params.id).then(response => {
        this.orderHeader = response.data.orderHeader
      })
    },
    delete() {
      Service.delete(this.$route.params.id, this.orderHeader).then(() => {
        this.$router.push(this.getRef('/orderHeader'))
      }).catch((e) => {
        alert(e.response.data.message)
      })
    }
  }
}
</script>
