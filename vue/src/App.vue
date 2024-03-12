<template>
  <div v-if="isReady">
    <div v-if="user">
      <div class="wrapper">
        <input id="sidebar_toggle" type="checkbox" />
        <nav id="sidebar">
          <router-link to="/" class="bg-light border-bottom">
            <h4>StackPuz</h4>
          </router-link>
          <ul class="list-unstyled">
            <li>
              <router-link to="/home" :class="this.$route.path.endsWith('/home') ? 'active bg-primary' : ''">Home</router-link>
            </li>
            <li v-for="menu in user.menu" :key="menu.path">
              <router-link :to="`/${menu.path}`" :class="this.$route.path.substr(1).split('/')[0] == menu.path ? 'active bg-primary' : ''">{{menu.title}}</router-link>
            </li>
          </ul>
        </nav>
        <div id="body">
          <nav class="navbar bg-light border-bottom">
            <label for="sidebar_toggle" class=" btn btn-primary btn-sm"><i class="fa fa-bars"></i></label>
            <ul class="navbar-nav ml-auto">
              <li id="searchbar_toggle_menu" class="d-none">
                <a class="nav-link text-secondary" href="#"><label for="searchbar_toggle" class="d-lg-none"><i class="fa fa-search"></i></label></a>
              </li>
              <li class="dropdown">
                <a class="nav-link text-secondary dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-user"></i> <span class="d-none d-lg-inline"> {{user.name}}</span></a>
                <div class="dropdown-menu dropdown-menu-right">
                  <router-link to="/profile" class="dropdown-item"><i class="fa fa-user"></i> Profile</router-link>
                  <router-link to="/logout" class="dropdown-item"><i class="fa fa-sign-out"></i> Logout</router-link>
                </div>
              </li>
            </ul>
          </nav>
          <div class="content">
            <router-view />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import http from './http'

export default {
  name: 'App',
  data() {
    return {
      isReady: false,
      user: null
    }
  },
  beforeCreate() {
    http.get('/user').then(response => {
      this.$root.user = this.user = response.data
      this.isReady = true
    }).catch(() => {
      this.isReady = true
    })
  }
}
</script>