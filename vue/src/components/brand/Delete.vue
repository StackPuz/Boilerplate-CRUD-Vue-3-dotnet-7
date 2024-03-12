<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form method="post" @submit.prevent="this.delete()">
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
              <router-link class="btn btn-sm btn-secondary" :to="getRef('/brand')">Cancel</router-link>
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
  name: 'BrandDelete',
  data() {
    return {
      brand: {}
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
        this.brand = response.data.brand
      })
    },
    delete() {
      Service.delete(this.$route.params.id, this.brand).then(() => {
        this.$router.push(this.getRef('/brand'))
      }).catch((e) => {
        alert(e.response.data.message)
      })
    }
  }
}
</script>
