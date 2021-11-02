import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

let firebaseApp = null

export default ({
  store,
  $config: {
    firebaseApiKey,
    firebaseAuthDomain,
    firebaseDatabaseUrl,
    firebaseProjectId,
    firebaseStorageBucket,
    firebaseMessagingSenderId,
    firebaseAppId
  }
}, inject) => {
  if (firebaseApp === null) {
    // console.log('initializing firebase app...')
    const firebaseConfig = {
      apiKey: firebaseApiKey,
      authDomain: firebaseAuthDomain,
      databaseURL: firebaseDatabaseUrl,
      projectId: firebaseProjectId,
      storageBucket: firebaseStorageBucket,
      messagingSenderId: firebaseMessagingSenderId,
      appId: firebaseAppId
    }

    const apps = getApps()
    if (!apps.length) {
      firebaseApp = initializeApp(firebaseConfig)
    } else {
      firebaseApp = apps[0]
    }
  }

  const db = getFirestore(firebaseApp, {})

  inject('firebase', {
    app: firebaseApp,
    db
  })

  // Set auth changes listeners
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    // console.log(' >>> onAuthStateChanged', user)
    store.dispatch('auth/onAuthStateChangedAction', user)
  })

  return {
    app: firebaseApp,
    db
  }
}

// export { db }
