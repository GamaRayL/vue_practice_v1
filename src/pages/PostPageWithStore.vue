<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        v-focus
        placeholder="Поиск..."
    >
    </my-input>
    <div class="app__btns">
      <my-button
          @click="showDialog"
          style="align-self: flex-start"
      >
        Создать пост
      </my-button>
      <my-select
          model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form
          @create="createPost"
      />
    </my-dialog>
    <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
    />
    <div v-else>Идёт загрузка...</div>
    <div class="page__wrapper">
      <div
          class="page"
          v-for="pageNumber in totalPages"
          :class="{
                'current-page': page === pageNumber
              }"
          @click="changePage(pageNumber)"
          :key="pageNumber"
      >
        {{ pageNumber }}
      </div>
    </div>
  </div>
</template>


<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    MyDialog,
    PostList, PostForm
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      fetchPosts: 'post/fetchPosts'
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    changePage(pageNumber) {
      this.page = pageNumber;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      searchQuery: state => state.post.searchQuery,
      selectedSort: state => state.post.selectedSort,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    })
  },
  watch: {
    page() {
      this.fetchPosts();
    }
  }
}
</script>

<style>


.app__btns {
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
  justify-content: center;
  gap: 5px;
}

.page {
  cursor: pointer;
  padding: 4px 8px;
  border-bottom: 1px solid black;
  border-radius: 1px;
}

.current-page {
  border: 2px solid green;
}

</style>