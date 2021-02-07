import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import {
  ref,
  onUnmounted,
  computed,
} from 'vue'

firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_ID,
  appId: process.env.VUE_APP_APP_ID,
})

const auth = firebase.auth()

export function useAuth() {
  const user = ref(null)
  const unsubscribe = auth.onAuthStateChanged((_user) => {
    user.value = _user
  })
  onUnmounted(unsubscribe)
  const isAuthenticated = computed(() => user.value !== null)

  const signIn = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    await auth.signInWithPopup(googleProvider)
  }

  const signOut = () => auth.signOut()

  return {
    user,
    unsubscribe,
    isAuthenticated,
    signIn,
    signOut,
  }
}

export default {
  useAuth,
}
