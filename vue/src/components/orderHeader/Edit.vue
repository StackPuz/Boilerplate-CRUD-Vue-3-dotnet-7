<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form method="post" @submit.prevent="edit()">
          <div class="row">
            <div class="form-group col-md-6 col-lg-4">
              <label for="order_header_id">Id</label>
              <input readonly id="order_header_id" name="Id" class="form-control form-control-sm" v-model="orderHeader.Id" type="number" required />
              <span v-if="errors.Id" class="text-danger">{{errors.Id}}</span>
            </div>
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
              <table class="table table-sm table-striped table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="orderHeaderOrderDetail in orderHeaderOrderDetails" :key="orderHeaderOrderDetail">
                    <td class="text-center">{{orderHeaderOrderDetail.No}}</td>
                    <td>{{orderHeaderOrderDetail.ProductName}}</td>
                    <td class="text-right">{{orderHeaderOrderDetail.Qty}}</td>
                    <td class="text-center">
                      <router-link class="btn btn-sm btn-primary" :to="`/orderDetail/edit/${orderHeaderOrderDetail.OrderId}/${orderHeaderOrderDetail.No}`" title="Edit"><i class="fa fa-pencil"></i></router-link>
                      <router-link class="btn btn-sm btn-danger" :to="`/orderDetail/delete/${orderHeaderOrderDetail.OrderId}/${orderHeaderOrderDetail.No}`" title="Delete"><i class="fa fa-times"></i></router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
              <router-link class="btn btn-sm btn-primary" :to="`/orderDetail/create?order_detail_order_id=${orderHeader.Id}`">Add</router-link>
              <hr />
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
  name: 'OrderHeaderEdit',
  data() {
    return {
      orderHeader: {},
      orderHeaderOrderDetails: [],
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
      return Service.edit(this.$route.params.id).then(response => {
        this.orderHeader = response.data.orderHeader
        this.orderHeaderOrderDetails = response.data.orderHeaderOrderDetails
        this.customers = response.data.customers
      })
    },
    edit() {
      Service.edit(this.$route.params.id, this.orderHeader).then(() => {
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
