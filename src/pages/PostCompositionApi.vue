<template>
  <div>
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
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";
import useSortedPosts from "@/components/hooks/useSortedPosts";
import {usePosts} from "@/components/hooks/usePosts";
import useSortedAndSearchedPosts from "@/components/hooks/useSortedAndSearchedPosts";

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
      sortOptions: [
        {value: 'id', name: 'По id'},
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержанию'}
      ]
    }
  },
  setup(props) {
    const {totalPages, isPostsLoading, posts} = usePosts(10);
    const {sortedPosts, selectedSort} = useSortedPosts(posts);
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)
    const addLike = () => {
      likes.value += 1
    }
    return {
      posts,
      totalPages,
      isPostsLoading,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts
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