import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

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
const firestore = firebase.firestore()

export function waitForCurrentUser() {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(resolve, reject)
  })
}

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
    waitForCurrentUser,
  }
}

export function useRoom() {
  const rooms = ref([])
  const roomsCollection = firestore.collection('rooms')

  const getRoomById = async (id) => {
    const room = await roomsCollection.doc(id).get()
    return { id: room.id, ...room.data() }
  }

  const createRoom = (roomName) => {
    roomsCollection.add({ name: roomName })
  }

  const roomsQuery = roomsCollection.orderBy('name', 'desc')

  const unsubscribe = roomsQuery.onSnapshot((snapshot) => {
    rooms.value = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .reverse()
  })
  onUnmounted(unsubscribe)

  return {
    rooms,
    createRoom,
    getRoomById,
  }
}

export function useMessage(roomId) {
  const messages = ref([])
  const { user } = useAuth()
  const messagesCollection = firestore.collection('messages')
  const messagesQuery = messagesCollection
    .orderBy('createdAt', 'desc')
    .where('roomId', '==', roomId)
    .limit(100)

  const unsubscribe = messagesQuery.onSnapshot((snapshot) => {
    messages.value = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .reverse()
  })

  onUnmounted(unsubscribe)

  const sendMessage = async ({ text, attachmentUrl = null }) => {
    const { photoURL, displayName, uid } = user.value

    messagesCollection.add({
      userName: displayName,
      userPhotoUrl: photoURL,
      userId: uid,
      createdAt: new Date().toISOString(),
      text,
      roomId,
      attachmentUrl,
    })
  }

  return {
    sendMessage,
    messages,
  }
}

export function useStorage() {
  const progress = ref(0)
  const fileSrc = ref(null)

  const upload = (file) => {
    progress.value = true
    const storageRef = firebase.storage().ref(file.name).put(file)
    storageRef.on(
      'state_changed',
      (snapshot) => {
        progress.value = Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      },
      null,
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          progress.value = 100
          fileSrc.value = url
        })
      },
    )
  }

  const resetData = () => {
    fileSrc.value = null
  }

  return {
    upload,
    progress,
    fileSrc,
    resetData,
  }
}

export default {
  waitForCurrentUser,
  useAuth,
  useRoom,
  useMessage,
  useStorage,
}
