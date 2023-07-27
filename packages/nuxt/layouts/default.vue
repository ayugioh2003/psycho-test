<template>
  <!-- <Head>
    <Script src="https://unpkg.com/jspsych@7.3.3"></Script>
    <Script
      src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.2"
    ></Script>
    <Script
      src="https://unpkg.com/@jspsych/plugin-image-keyboard-response@1.1.2"
    ></Script>
    <Script src="https://unpkg.com/@jspsych/plugin-preload@1.1.2"></Script>
    <Link
      href="https://unpkg.com/jspsych@7.3.3/css/jspsych.css"
      rel="stylesheet"
      type="text/css"
    />
  </Head> -->
  <div id="app-layout">
    <slot />
  </div>
</template>

<script setup lang="ts">
// https://nuxt.com/docs/guide/directory-structure/layouts
// https://nuxt.com/docs/getting-started/seo-meta
useHead({
  // title: 'My App',
  // meta: [
  //   { name: 'description', content: 'My amazing site.' }
  // ],
  // bodyAttrs: {
  //   class: 'test'
  // },
  script: [
    { src: 'https://unpkg.com/jspsych@7.3.3' },
    { src: 'https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.2' },
    { src: 'https://unpkg.com/@jspsych/plugin-image-keyboard-response@1.1.2' },
    { src: 'https://unpkg.com/@jspsych/plugin-preload@1.1.2' },
  ],
  link: [
    {
      href: 'https://unpkg.com/jspsych@7.3.3/css/jspsych.css',
      rel: 'stylesheet',
      type: 'text/css',
    },
  ],
})
</script>
