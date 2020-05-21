<template>
  <form @submit.prevent="createEvent">
    <BaseSelect
      v-model="event.category"
      label="Select a category"
      :options="categories"
      class="field"
    />
    <h3>Name & describe your event</h3>
    <BaseInput
      label="Title"
      v-model="event.title"
      type="text"
      placeholder="Add an event title"
      class="field"
    />
    <BaseInput
      class="field"
      v-model="event.description"
      type="text"
      placeholder="Add a description"
      label="Description"
    />
    <h3>Where is your event?</h3>
    <BaseInput
      class="field"
      v-model="event.location"
      label="Location"
      placeholder="Add a location"
      type="text"
    />
    <h3>When is your event?</h3>
    <div class="field">
      <label>Date</label>
      <datepicker v-model="event.date" placeholder="Select a date" />
    </div>
    <BaseSelect
      label="Select a time"
      v-model="event.time"
      :options="times"
      class="field"
    />
    <BaseButton type="submit" buttonClass="button -fill-gradient">Submit</BaseButton>
  </form>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEvent(),
      times,
      categories: this.$store.state.categories
    }
  },
  methods: {
    createFreshEvent() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    },
    createEvent() {
      NProgress.start()
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEvent()
        })
        .catch(() => {
          NProgress.done()
        })
    }
  }
}
</script>

<style lang="css" scoped>
.field {
  margin-bottom: 24px;
}
</style>
