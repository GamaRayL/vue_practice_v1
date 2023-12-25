<template>
  <div class="post">
    <div>
      <div><strong>Название:</strong> {{ title }}</div>
      <div><strong>Описание:</strong> {{ body }}</div>
    </div>
    <div class="post__btns">
      <my-button
          @click="$router.push(`/posts/${id}`)"
      >
        Открыть
      </my-button>
      <my-button
          @click="$emit('remove', post)"
      >
        Удалить
      </my-button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    post: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      id: this.post.id,
      title: this.post.title,
      body: this.post.body,
    };
  }
}
</script>

<style scoped>
.post {
  display: flex;
  padding: 15px;
  border: 2px solid green;
  margin-top: 15px;
  align-items: center;
  justify-content: space-between;
}

.post__btns {
  display: flex;
  gap: 4px;
}
</style>