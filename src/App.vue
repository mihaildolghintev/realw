<template>
  <div id="app">
    <mcv-topbar></mcv-topbar>
    <router-view></router-view>
  </div>
</template>


<script>
import McvTopbar from "@/components/Topbar";
import {actionTypes} from "@/store/modules/auth";
export default {
  components: {McvTopbar},
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser)
  }
}
</script>
