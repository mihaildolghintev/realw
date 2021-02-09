<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign Up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}">Have an account?</router-link>
          </p>
          <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors"></mcv-validation-errors>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input v-model="username" type="text" class="form-control form-control-lg" placeholder="Username"/>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="email" type="text" class="form-control form-control-lg" placeholder="Email"/>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="password" type="password" class="form-control form-control-lg" placeholder="Password"/>
            </fieldset>
            <button :disabled="isSubmitting" class="btn btn-lg btn-primary pull-xs-right">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from "@/components/ValidationErrors";
import {actionTypes} from "@/store/modules/auth";
import {mapState} from "vuex";

export default {
  name: 'McvRegister',
  components: {McvValidationErrors},
  data() {
    return {
      email: '',
      password: '',
      username: ''
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors
    })
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch(actionTypes.register, {
        email: this.email,
        password: this.password,
        username: this.username
      })
      await this.$router.push({name: 'home'})
    }
  }
}
</script>
