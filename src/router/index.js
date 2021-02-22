import { createRouter, createWebHistory } from 'vue-router'
import { waitForCurrentUser } from '@/lib/firebase'

const Home = () => import(/* webpackChunkName: "Home" */ '@/views/Home')
const Chat = () => import(/* webpackChunkName: "Chat" */'@/views/Chat')
const DefaultRoom = () => import(/* webpackChunkName: "DefaultRoom" */'@/views/DefaultRoom')
const ChatRoom = () => import(/* webpackChunkName: "ChatRoom" */'@/views/ChatRoom')
const NotFound = () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: DefaultRoom,
      },
      {
        path: ':id',
        component: ChatRoom,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const isAuthenticated = await waitForCurrentUser()
  if (requiresAuth && !isAuthenticated) {
    next({ name: 'Home' })
  } else if (!requiresAuth && isAuthenticated) {
    next({ name: 'Chat' })
  } else {
    next()
  }
})

export default router
