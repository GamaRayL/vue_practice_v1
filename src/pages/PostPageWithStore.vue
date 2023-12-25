<template>
  <div>
    <h1>{{ $store.state.likes }}</h1>
    <h1>Страница с постами</h1>
    <my-input
        v-model="searchQuery"
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
          v-model="selectedSort"
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
import axios from "axios";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";

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
      posts: [],
      dialogVisible: false,
      modificatorValue: '',
      isPostsLoading: false,
      page: 1,
      limit: 10,
      totalPages: 0,
      searchQuery: '',
      selectedSort: '',
      sortOptions: [
        {value: 'id', name: 'По id'},
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержанию'}
      ]
    }
  },
  methods: {
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
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        alert(`Ошибка ${e}`)
      } finally {
        this.isPostsLoading = false;
      }
    }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        if (this.selectedSort === 'id') {
          return post1[this.selectedSort] - post2[this.selectedSort]
        } else {
          return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        }
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
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