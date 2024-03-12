<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form method="post" @submit.prevent="edit()">
          <div class="row">
            <input type="hidden" id="brand_id" name="Id" v-model="brand.Id" />
            <div class="form-group col-md-6 col-lg-4">
              <label for="brand_name">Name</label>
              <input id="brand_name" name="Name" class="form-control form-control-sm" v-model="brand.Name" required maxlength="50" />
              <span v-if="errors.Name" class="text-danger">{{errors.Name}}</span>
            </div>
            <div class="col-12">
              <router-link class="btn btn-sm btn-secondary" :to="getRef('/brand')">Cancel</router-link>
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
  name: 'BrandEdit',
  data() {
    return {
      brand: {},
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
        this.brand = response.data.brand
      })
    },
    edit() {
      Service.edit(this.$route.params.id, this.brand).then(() => {
        this.$router.push(this.getRef('/brand'))
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
