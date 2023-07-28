<template>
  <div></div>
</template>

<script setup>
import axios from 'axios'

const jsPsychRef = ref({})

onMounted(() => {
  const tempId = String(new Date().valueOf())
  let userId = localStorage.getItem('userId')
  let experimentInfo = {
    rt: 0,
    accuracy: 0,
  }

  if (!userId) {
    localStorage.setItem('userId', tempId)
    userId = tempId
  }

  /* initialize jsPsych */
  var jsPsych = initJsPsych({
    on_finish: function () {
      // 呈現資料在螢幕上
      jsPsych.data.displayData()
      // 之後可以在這裡送出資料給 server
      var all_data = jsPsych.data.get()
      console.log(JSON.parse(all_data.json()))
      console.log('type of all_data.json()', typeof all_data.json())

      axios.post('/api/express/experiment/participant-data', {
        user_id: userId,
        experiment: 'stroop',
        accuracy: experimentInfo.accuracy,
        average_rt: experimentInfo.rt,
        data: JSON.parse(all_data.json()),
      })
    },
  })
  jsPsychRef.value = jsPsych

  /* create timeline */
  var timeline = []

  /* preload images */
  var imageUrl = {
    red: 'https://cdn1.i-scmp.com/sites/default/files/topics/2015/05/04/topicsquare_9_xi.jpg',
    green:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/%E8%94%A1%E8%8B%B1%E6%96%87%E5%AE%98%E6%96%B9%E5%85%83%E9%A6%96%E8%82%96%E5%83%8F%E7%85%A7.png/230px-%E8%94%A1%E8%8B%B1%E6%96%87%E5%AE%98%E6%96%B9%E5%85%83%E9%A6%96%E8%82%96%E5%83%8F%E7%85%A7.png',
    blue: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/%E4%B8%AD%E8%8F%AF%E6%B0%91%E5%9C%8B%E7%AC%AC12%E3%80%8113%E4%BB%BB%E7%B8%BD%E7%B5%B1%E9%A6%AC%E8%8B%B1%E4%B9%9D%E5%85%88%E7%94%9F%E5%AE%98%E6%96%B9%E8%82%96%E5%83%8F%E7%85%A7.jpg',
  }

  var preload = {
    type: jsPsychPreload,
    images: [
      'img/blue.png',
      'img/orange.png',
      imageUrl.red,
      imageUrl.green,
      imageUrl.blue,
    ],
  }
  timeline.push(preload)

  /* define welcome message trial */
  var welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `歡迎 
      <span>${userId}
    來 <strike>當白老鼠</strike> 參與研究！請按任意鍵開始`,
    // stimulus: /*HTML*/ `<div class="img" style="background-color: red; background-image: url(${imageUrl.blue});"></div>`,
  }
  timeline.push(welcome)

  /* define instructions trial */
  var instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: /*HTML*/ `
        <p>在實驗中，文字或圖片會出現在畫面的中間</p>
        <p>請根據螢幕上文字或圖片 <strong>實際的光線顏色</strong>，按下對應的按鍵</p>
        <p style="margin-bottom: 60px;">會有紅(R)綠(G)藍(B)三種顏色。例如，看到<span style="color: red">藍色</span>，並儘快按下代表紅色的 r</p>

        <div style='width: 700px;'>
        <div style='float: left;'><span style="color: red">藍色</span>
        <p class='small'><strong>按下 R 鍵</strong></p></div>
        <div style='float: right;'><span style="color: green">綠色</span>
        <p class='small'><strong>按下 G 鍵</strong></p></div>
        </div>
        <p>請按任意鍵開始測試題</p>
      `,
  }
  timeline.push(instructions)

  /** test trial */
  var blue_trial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="color: red; font-size: 2rem;">紅色</div>',
    choices: ['r', 'g', 'b'],
  }

  var orange_trial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="color: red; font-size: 2rem;">Green</div>',
    choices: ['r', 'g', 'b'],
  }

  /* define welcome message trial */
  var welcome2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '正式實驗即將開始！請按任意鍵開始',
    post_trial_gap: 0, // 2000,
  }

  timeline.push(blue_trial, orange_trial)
  timeline.push(welcome2)

  // -----------------------------------------------------------

  /* define trial stimuli array for timeline variables */
  var test_stimuli_color = [
    // chinese text
    {
      stimulus: /*html*/ `<div style="color: red; font-size: 2rem;">紅色</div>`,
      data: {
        color: 'red',
        element: 'red',
        elementType: 'chinese',
        consistency: 'congruent',
      },
      correct_response: 'r',
    },
    {
      stimulus: /*html*/ `<div style="color: red; font-size: 2rem;">藍色</div>`,
      data: {
        color: 'red',
        element: 'blue',
        elementType: 'chinese',
        consistency: 'incongruent',
      },
      correct_response: 'r',
    },
    {
      stimulus: /*html*/ `<div style="color: red; font-size: 2rem;">旅行</div>`,
      data: {
        color: 'red',
        element: 'trek',
        elementType: 'chinese',
        consistency: 'netural',
      },
      correct_response: 'r',
    },
    {
      stimulus: /*html*/ `<div style="color: green; font-size: 2rem;">綠色</div>`,
      data: {
        color: 'green',
        element: 'green',
        elementType: 'chinese',
        consistency: 'congruent',
      },
      correct_response: 'g',
    },
    {
      stimulus: /*html*/ `<div style="color: green; font-size: 2rem;">紅色</div>`,
      data: {
        color: 'green',
        element: 'red',
        elementType: 'chinese',
        consistency: 'incongruent',
      },
      correct_response: 'g',
    },
    {
      stimulus: /*html*/ `<div style="color: green; font-size: 2rem;">水壩</div>`,
      data: {
        color: 'green',
        element: 'dam',
        elementType: 'chinese',
        consistency: 'netural',
      },
      correct_response: 'g',
    },
    {
      stimulus: /*html*/ `<div style="color: blue; font-size: 2rem;">藍色</div>`,
      data: {
        color: 'blue',
        element: 'blue',
        elementType: 'chinese',
        consistency: 'congruent',
      },
      correct_response: 'b',
    },
    {
      stimulus: /*html*/ `<div style="color: blue; font-size: 2rem;">綠色</div>`,
      data: {
        color: 'blue',
        element: 'green',
        elementType: 'chinese',
        consistency: 'incongruent',
      },
      correct_response: 'b',
    },
    {
      stimulus: /*html*/ `<div style="color: blue; font-size: 2rem;">水獺</div>`,
      data: {
        color: 'blue',
        element: 'otter',
        elementType: 'chinese',
        consistency: 'netural',
      },
      correct_response: 'b',
    },
    // english text
    {
      stimulus: /*html*/ `<div style="color: red; font-size: 2rem;">Red</div>`,
      data: {
        color: 'red',
        element: 'red',
        elementType: 'english',
        consistency: 'congruent',
      },
      correct_response: 'r',
    },
    {
      stimulus: /*html*/ `<div style="color: red; font-size: 2rem;">Blue</div>`,
      data: {
        color: 'red',
        element: 'blue',
        elementType: 'english',
        consistency: 'incongruent',
      },
      correct_response: 'r',
    },
    {
      stimulus: /*html*/ `<div style="color: red; font-size: 2rem;">Otter</div>`,
      data: {
        color: 'red',
        element: 'otter',
        elementType: 'english',
        consistency: 'netural',
      },
      correct_response: 'r',
    },
    {
      stimulus: /*html*/ `<div style="color: green; font-size: 2rem;">Green</div>`,
      data: {
        color: 'green',
        element: 'green',
        elementType: 'english',
        consistency: 'congruent',
      },
      correct_response: 'g',
    },
    {
      stimulus: /*html*/ `<div style="color: green; font-size: 2rem;">Red</div>`,
      data: {
        color: 'green',
        element: 'red',
        elementType: 'english',
        consistency: 'incongruent',
      },
      correct_response: 'g',
    },
    {
      stimulus: /*html*/ `<div style="color: green; font-size: 2rem;">Trek</div>`,
      data: {
        color: 'green',
        element: 'trek',
        elementType: 'english',
        consistency: 'netural',
      },
      correct_response: 'g',
    },
    {
      stimulus: /*html*/ `<div style="color: blue; font-size: 2rem;">Blue</div>`,
      data: {
        color: 'blue',
        element: 'blue',
        elementType: 'english',
        consistency: 'congruent',
      },
      correct_response: 'b',
    },
    {
      stimulus: /*html*/ `<div style="color: blue; font-size: 2rem;">Green</div>`,
      data: {
        color: 'blue',
        element: 'green',
        elementType: 'english',
        consistency: 'incongruent',
      },
      correct_response: 'b',
    },
    {
      stimulus: /*html*/ `<div style="color: blue; font-size: 2rem;">Dam</div>`,
      data: {
        color: 'blue',
        element: 'dam',
        elementType: 'english',
        consistency: 'netural',
      },
      correct_response: 'b',
    },
    // image
    {
      stimulus: /*html*/ `<div class="img bg-red" style="background-image: url(${imageUrl.red});"></div>`,
      data: {
        color: 'red',
        element: 'politic-red',
        elementType: 'image',
        consistency: 'congruent',
      },
      correct_response: 'r',
    },
    {
      stimulus: /*html*/ `<div class="img bg-red" style="background-image: url(${imageUrl.blue});"></div>`,
      data: {
        color: 'red',
        element: 'politic-blue',
        elementType: 'image',
        consistency: 'incongruent',
      },
      correct_response: 'r',
    },
    {
      stimulus: /*html*/ `<div class="img bg-red" style="background-image: url();"></div>`,
      data: {
        color: 'red',
        element: '',
        elementType: 'image',
        consistency: 'netural',
      },
      correct_response: 'r',
    },
    {
      stimulus: /*html*/ `<div class="img bg-green" style="background-image: url(${imageUrl.green});"></div>`,
      data: {
        color: 'green',
        element: 'politic-green',
        elementType: 'image',
        consistency: 'congruent',
      },
      correct_response: 'g',
    },
    {
      stimulus: /*html*/ `<div class="img bg-green" style="background-image: url(${imageUrl.red});"></div>`,
      data: {
        color: 'green',
        element: 'politic-blue',
        elementType: 'image',
        consistency: 'incongruent',
      },
      correct_response: 'g',
    },
    {
      stimulus: /*html*/ `<div class="img bg-green" style="background-image: url();"></div>`,
      data: {
        color: 'green',
        element: '',
        elementType: 'image',
        consistency: 'netural',
      },
      correct_response: 'g',
    },
    {
      stimulus: /*html*/ `<div class="img bg-blue" style="background-image: url(${imageUrl.blue});"></div>`,
      data: {
        color: 'blue',
        element: 'blue',
        elementType: 'image',
        consistency: 'congruent',
      },
      correct_response: 'g',
    },
    {
      stimulus: /*html*/ `<div class="img bg-blue" style="background-image: url(${imageUrl.green});"></div>`,
      data: {
        color: 'blue',
        element: 'green',
        elementType: 'image',
        consistency: 'incongruent',
      },
      correct_response: 'g',
    },
    {
      stimulus: /*html*/ `<div class="img bg-blue" style="background-image: url();"></div>`,
      data: {
        color: 'blue',
        element: '',
        elementType: 'image',
        consistency: 'netural',
      },
      correct_response: 'g',
    },
  ]

  // 方便打 API 測試。只留兩個嘗試次
  // test_stimuli_color.splice(2)

  /* define fixation and test trials */
  var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: 'NO_KEYS',
    trial_duration: function () {
      return jsPsych.randomization.sampleWithoutReplacement(
        [250, 500, 750, 1000, 1250, 1500, 1750, 2000],
        1
      )[0]
    },
    data: {
      task: 'fixation',
    },
  }

  var test_color = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['r', 'g', 'b'],
    task: 'stroop',
    data: {
      task: 'response',
      correct_response: jsPsych.timelineVariable('correct_response'),
      // 為每個 trail 加上想 label 的參數
      // https://github.com/jspsych/jsPsych/blob/main/examples/demos/demo_3.html#L37C15-L38C1
      data: jsPsych.timelineVariable('data'),
    },
    on_finish: function (data) {
      data.correct = jsPsych.pluginAPI.compareKeys(
        data.response,
        data.correct_response
      )

      data.color = jsPsych.timelineVariable('data').color
      data.element = jsPsych.timelineVariable('data').element
      data.elementType = jsPsych.timelineVariable('data').elementType
      data.consistency = jsPsych.timelineVariable('data').consistency
    },
  }

  /* define test procedure */
  var test_procedure = {
    timeline: [fixation, test_color], //[fixation, test],
    timeline_variables: test_stimuli_color, // test_stimuli,
    repetitions: 1, // 5,
    randomize_order: true,
  }
  timeline.push(test_procedure)

  /* define debrief */
  var debrief_block = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
      var trials = jsPsych.data.get().filter({ task: 'response' })
      var correct_trials = trials.filter({ correct: true })
      var accuracy = Math.round((correct_trials.count() / trials.count()) * 100)
      var rt = Math.round(correct_trials.select('rt').mean())

      experimentInfo.accuracy = accuracy
      experimentInfo.rt = rt

      return `<p>You responded correctly on ${accuracy}% of the trials.</p>
          <p>Your average response time was ${rt}ms.</p>
          <p>Press any key to complete the experiment. Thank you!</p>`
    },
  }
  timeline.push(debrief_block)

  /* start the experiment */
  jsPsych.run(timeline)
})

// https://javascript.plainenglish.io/nuxt-3-how-to-reload-and-navigate-to-path-f78c7e04a0f0
// https://nuxt.com/docs/api/utils/reload-nuxt-app
onUnmounted(() => {
  // jsPsychRef.value.endExperiment()

  reloadNuxtApp({
    force: true,
  })
})
</script>

<style>
.img {
  /* https://www.zhangxinxu.com/study/201811/css-mask-icon-colorful.php */
  /* https://blog.csdn.net/StacyMo/article/details/124632479 */
  /* https://www.casper.tw/WorkShop-gh-pages/cssBlendMode/ */
  width: 200px;
  height: 300px;
  background-blend-mode: hard-light;
  overflow: hidden;

  background-size: cover;
  background-position: center;
  mask-repeat: no-repeat;
}

.bg-red {
  background-color: red;
}
.bg-green {
  background-color: green;
}
.bg-blue {
  background-color: blue;
}
</style>
