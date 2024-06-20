<template>
  <q-page class="flex flex-center">
    <div>
      <h1>{{ taskName }}</h1>
      <p>This is the content for {{ taskName }}.</p>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'TaskPage',
  computed: {
    taskName() {
      return this.$route.params.taskName
    }
  }
}
</script>
