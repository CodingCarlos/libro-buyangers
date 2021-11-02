import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const provider = new GoogleAuthProvider()

const COLLECTION = 'users'

export const state = () => ({
  isLogged: false,
  name: null,
  pic: null,
  id: null,
  role: 'guest'
})

export const actions = {
  async register ({ commit }, user) {
    const userData = {
      name: user.displayName,
      pic: user.photoURL,
      role: 'user',
      challenges_count: 0
    }

    const ref = doc(this.$firebase.db, COLLECTION, user.uid)
    await setDoc(ref, userData)

    commit('LOG_IN', 'token')
    commit('SET_DATA', {
      id: user.uid,
      ...userData
    })
  },
  login ({ commit, dispatch }) {
    return signInWithPopup(getAuth(), provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result)
        // const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        return dispatch('authorize', user)
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        console.error(errorCode, errorMessage)
      })
  },
  async authorize ({ commit, dispatch }, user) {
    if (!user) {
      return dispatch('logout')
    }

    const ref = doc(this.$firebase.db, COLLECTION, user.uid)
    try {
      let result = await getDoc(ref)
      result = result.data()

      if (!result) {
        console.log('Usuario nuevo')
        return dispatch('register', user)
      }
      console.log('Usuario conocido')

      const data = {
        id: user.uid,
        ...result
      }

      commit('LOG_IN', 'token')
      commit('SET_DATA', data)
      return data
    } catch (e) {
      console.error('Error!', e)
      return null
    }

    // // commit('LOG_IN', 'token')
    // // commit('SET_DATA', user)
    // return user
  },
  logout ({ commit }) {
    return signOut(getAuth())
      .then(() => {
        commit('LOG_OUT')
      })
      .catch((error) => {
        console.error(error)
      })
  },
  // This action is automatically called from @nuxtjs/firebase plugin
  onAuthStateChangedAction ({ commit, dispatch }, authUser) {
    // console.log(authUser)
    if (!authUser) {
      commit('LOG_OUT')
    } else {
      // getAuth().currentUser.getIdToken()
      //   .then(token => dispatch('login', { token }))
      dispatch('authorize', authUser)
    }
  }
}

export const mutations = {
  LOG_IN (state, token) {
    // axios.defaults.headers.common = { Authorization: `Bearer ${token}` }
    state.isLogged = true
  },
  LOG_OUT (state) {
    // axios.defaults.headers.common = { Authorization: '' }
    state.isLogged = false
    state.name = null
    state.pic = null
    state.id = null
    state.role = 'guest'
  },
  SET_DATA (state, data) {
    // console.log(data)
    state.name = data.name
    state.pic = data.pic
    state.role = data.role || 'guest'
    state.id = data.id || null
  }
}
