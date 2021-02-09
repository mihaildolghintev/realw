<template>
  <div>
    <ul class="error-messages">
      <li :key="key" v-for="(value, key) in validationErrors">
        {{ key}}  {{value[0]}}
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: 'McvValidationErrors',
  props: {
    validationErrors: {
      type: Object,
      required: true
    }
  },
}
</script>
