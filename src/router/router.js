import Main from "@/pages/Main.vue";
import {createRouter, createWebHistory} from "vue-router";
import About from "@/pages/About.vue";
import Posts from "@/pages/Posts.vue";
import Post from "@/pages/Post.vue";
import PostPageWithStore from "@/pages/PostPageWithStore.vue";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: Posts
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: Post
    },
    {
        path: '/store',
        component: PostPageWithStore
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;