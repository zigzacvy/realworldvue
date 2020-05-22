<template>
  <div>
    <h1>Opps!</h1>
    <h3>
      The
      <template if="resource"> {{ resource }} </template>
      page you're looking for is not here.
    </h3>
    <router-link :to="{ name: 'event-list' }"
      >Back to the home page</router-link
    >
  </div>
</template>
<script>
export default {
  props: {
    resource: {
      type: String,
      required: true
    }
  }
}
</script>
