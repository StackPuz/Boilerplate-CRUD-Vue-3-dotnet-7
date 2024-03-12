<template>
  <div>
  </div>
</template>
<script>
export default {
  name: 'Default',
  mounted() {
    if (location.hash) {
      this.$router.push(location.hash.substr(1))
    }
  }
}
</script>