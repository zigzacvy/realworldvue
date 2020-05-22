<template>
  <form @submit.prevent="createEvent">
    <BaseSelect
      v-model="event.category"
      label="Select a category"
      :options="categories"
      class="field"
      :class="{ error: $v.event.category.$error }"
      @blur="$v.event.category.$touch()"
    />
    <template v-if="$v.event.category.$error">
      <p v-if="!$v.event.category.required" class="-text-error">
        Category is required
      </p>
    </template>

    <h3>Name & describe your event</h3>
    <BaseInput
      label="Title"
      v-model="event.title"
      type="text"
      placeholder="Add an event title"
      class="field"
      :class="{ error: $v.event.title.$error }"
      @blur="$v.event.title.$touch()"
    />
    <template v-if="$v.event.title.$error">
      <p v-if="!$v.event.title.required" class="-text-error">
        Title is required
      </p>
    </template>
    <BaseInput
      class="field"
      v-model="event.description"
      type="text"
      placeholder="Add a description"
      label="Description"
      @blur="$v.event.description.$touch()"
    />
    <template v-if="$v.event.description.$error">
      <p v-if="!$v.event.description.required" class="-text-error">
        Description is required
      </p>
    </template>
    <h3>Where is your event?</h3>
    <BaseInput
      class="field"
      v-model="event.location"
      label="Location"
      placeholder="Add a location"
      type="text"
      @blur="$v.event.location.$touch()"
    />
    <template v-if="$v.event.location.$error">
      <p v-if="!$v.event.location.required" class="-text-error">
        Location is required
      </p>
    </template>
    <h3>When is your event?</h3>
    <div class="field">
      <label>Date</label>
      <datepicker
        v-model="event.date"
        placeholder="Select a date"
        @opened="$v.event.date.$touch()"
      />
    </div>
    <template v-if="$v.event.date.$error">
      <p v-if="!$v.event.date.required" class="-text-error">
        Docation is required
      </p>
    </template>
    <BaseSelect
      label="Select a time"
      v-model="event.time"
      :options="times"
      class="field"
      :class="{ error: $v.event.time.$error }"
      @blur="$v.event.time.$touch()"
    />
    <template v-if="$v.event.time.$error">
      <p v-if="!$v.event.time.required" class="-text-error">
        Time is required
      </p>
    </template>
    <BaseButton
      type="submit"
      buttonClass="button -fill-gradient"
      :disabled="$v.$anyError"
      >Submit</BaseButton
    >
    <p v-if="$v.$anyError" class="-text-error">
      Please fill out the required field(s).
    </p>
  </form>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'
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
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
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
      this.$v.$touch()
      if (!this.$v.$invalid) {
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
}
</script>

<style lang="css" scoped>
.field {
  margin-bottom: 24px;
}
</style>
