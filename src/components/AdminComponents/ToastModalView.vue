<template>
  <div class="toast-container position-fixed pe-3 top-0 end-0"
    style="z-index: 2000"
  >
    <div
      v-for="(msg, key) in messages" :key="key"
      class="toast show" :class="`toast${key}`"
      role="alert">
      <div class="toast-header bg-primary border-0">
        <!-- <span
          :class="`bg-${msg.style}`"
          class="p-2 rounded me-2 d-inline-block"
        ></span> -->
        <strong class="me-auto text-white">{{ msg.title }}</strong>
        <button
          type="button" class="btn-close" @click="clearToast(key)"
          aria-label="Close" ></button>
      </div>
      <div class="toast-body" v-if="msg.content">
        <div v-for="c in contentArray" :key="c">
        {{c}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      contentArray: [],
    };
  },
  inject: ['emitter'],
  methods: {
    toastShow() {
      setTimeout(() => {
        this.messages.shift();
      }, 6000);
    },
    clearToast(index) {
      this.messages.splice(index, 1);
    },
  },
  mounted() {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message;
      if (content) {
        console.log(content?.split('、'));
        this.contentArray = content?.split('、');
      }
      this.messages.push({ style, title, content });
      this.toastShow();
    });
  },
};
</script>
