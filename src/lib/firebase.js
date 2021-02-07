import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import {
  ref,
  onUnmounted,
  computed,
} from 'vue'

firebase.initializeApp({
  apiKey: 'AIzaSyBnvR-kx_oVMn6Sz2kNGjeQnYW4cErrbZY',
  authDomain: 'vue-talks-default.firebaseapp.com',
  projectId: 'vue-talks-default',
  storageBucket: 'vue-talks-default.appspot.com',
  messagingSenderId: '432802803947',
  appId: '1:432802803947:web:c6fd963ba043f1d90d4eae',
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
