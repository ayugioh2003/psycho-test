<template>
  <div>
    <div>psycho test</div>
    <div>用 jsPsych 套件做個線上心理學測驗</div>

    <client-only>
      <p>
        <div>輸入完您的代號，請點擊要做的實驗。<span v-if="userId">歡迎 {{ userId }}</span></div>
        <div>
          <input type="text" v-model="userId" placeholder="請輸入代號" />
        </div>
      </p>

      <NuxtLink to="/9-StroopEffect">9-StroopEffect</NuxtLink>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { useUser } from '../composables/user'
const { userId } = useUser()

onMounted(() => {
  if (localStorage.getItem('userId')) {
    userId.value = localStorage.getItem('userId') || ''
  }
})

function setUserId() {
  localStorage.setItem('userId', userId.value)
}

watch(userId, () => {
  setUserId()
})
</script>
