import authApi from '@/api/auth'
import {setItem} from "@/helpers/persistenceStorage";

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
}

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure'
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser'
}

export const getterTypes = {
  currentUser: "[auth] currentUser",
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous'
}

const getters = {
  [getterTypes.currentUser]: state => state.currentUser,
  [getterTypes.isLoggedIn]: state => {
    return Boolean(state.isLoggedIn)
  },
  [getterTypes.isAnonymous]: state => {
    return state.isLoggedIn === false
  }
}

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.registerSuccess](state, user) {
    state.isSubmitting = false
    state.currentUser = user
    state.isLoggedIn = true
  },
  [mutationTypes.registerFailure](state, errors) {
    state.isSubmitting = false
    state.validationErrors = errors
  },
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.loginSuccess](state, user) {
    state.isSubmitting = false
    state.currentUser = user
    state.isLoggedIn = true
  },
  [mutationTypes.loginFailure](state, errors) {
    state.isSubmitting = false
    state.validationErrors = errors
  },
  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false
    state.isLoggedIn = false
    state.currentUser = null
  }
}

const actions = {
  async [actionTypes.register](context, credentials) {
    try {
      context.commit(mutationTypes.registerStart)
      const response = await authApi.register(credentials)
      context.commit(mutationTypes.registerSuccess, response.data.user)
      setItem('accessToken', response.data.user.token)
    } catch (e) {
      context.commit(mutationTypes.registerFailure, e.response.data.errors)
      throw e
    }
  },
  async [actionTypes.login](context, credentials) {
    try {
      context.commit(mutationTypes.loginStart)
      const response = await authApi.login(credentials)
      context.commit(mutationTypes.loginSuccess, response.data.user)
      setItem('accessToken', response.data.user.token)
    } catch (e) {
      context.commit(mutationTypes.loginFailure, e.response.data.errors)
      throw e
    }
  },
  async [actionTypes.getCurrentUser](context) {
    try {
      context.commit(mutationTypes.getCurrentUserStart)
      const response = await authApi.getCurrentUser()
      context.commit(mutationTypes.getCurrentUserSuccess, response.data.user)
      return response.data.user
    } catch (e) {
      context.commit(mutationTypes.getCurrentUserFailure)
      throw e
    }
  },
}


export default {
  state,
  mutations,
  actions,
  getters
}
