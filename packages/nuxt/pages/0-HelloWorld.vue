<template>
  <div></div>
</template>

<script setup>
onMounted(() => {
  const jsPsych = initJsPsych()

  const hello_trial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: 'Hello world!',
  }

  jsPsych.run([hello_trial])
})
</script>
