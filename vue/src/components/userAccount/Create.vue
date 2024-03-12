<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form method="post" @submit.prevent="create()">
          <div class="row">
            <div class="form-group col-md-6 col-lg-4">
              <label for="user_account_name">Name</label>
              <input id="user_account_name" name="Name" class="form-control form-control-sm" v-model="userAccount.Name" required maxlength="50" />
              <span v-if="errors.Name" class="text-danger">{{errors.Name}}</span>
            </div>
            <div class="form-group col-md-6 col-lg-4">
              <label for="user_account_email">Email</label>
              <input id="user_account_email" name="Email" class="form-control form-control-sm" v-model="userAccount.Email" type="email" required maxlength="50" />
              <span v-if="errors.Email" class="text-danger">{{errors.Email}}</span>
            </div>
            <div class="form-check col-md-6 col-lg-4">
              <input id="user_account_active" name="Active" class="form-check-input" type="checkbox" v-model="userAccount.Active" :checked="userAccount.Active" />
              <label class="form-check-label" for="user_account_active">Active</label>
              <span v-if="errors.Active" class="text-danger">{{errors.Active}}</span>
            </div>
            <div class="col-12">
              <h6>
              </h6><label>Roles</label>
              <div v-for="role in roles" :key="role" class="form-check">
                <input :id="`user_role_role_id${role.Id}`" name="RoleId" class="form-check-input" type="checkbox" :value="role.Id" />
                <label class="form-check-label" :for="`user_role_role_id${role.Id}`">{{role.Name}}</label>
              </div>
            </div>
            <div class="col-12">
              <router-link class="btn btn-sm btn-secondary" :to="getRef('/userAccount')">Cancel</router-link>
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
  name: 'UserAccountCreate',
  data() {
    return {
      userAccount: {},
      roles: [],
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
        this.roles = response.data.roles
      })
    },
    create() {
      let data = { ...this.userAccount }
      data.RoleId = Array.from(document.querySelectorAll('[name="RoleId"]:checked')).map(e => e.value)
      data = Util.getFormData(data)
      Service.create(data).then(() => {
        this.$router.push(this.getRef('/userAccount'))
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
