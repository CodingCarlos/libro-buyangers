import { doc, setDoc, updateDoc, increment, query, collection, getDocs } from 'firebase/firestore'

const COLLECTION_CHALLENGE = 'challenges'
const COLLECTION_COMPLETE = 'completed'
const COLLECTION_USER = 'users'

export const state = () => ({
  users: {},
  challenges: {}
})

export const getters = {
  getById: state => id => state.list.find(item => item.id === id)
}

export const actions = {

  async challenge ({ commit, dispatch, rootState, rootGetters }, { id, comment }) {
    console.log(rootGetters)
    // 1. Get the challenge info
    const challenge = rootGetters['challenges/getById'](id)
    // 2. Get the user info
    const userId = rootState.auth.id
    const user = {
      id: rootState.auth.id,
      pic: rootState.auth.pic,
      name: rootState.auth.name
    }

    // Ensure that user and chalenge exist
    if (!challenge || !userId) {
      console.error('Unable to complete that challenge', challenge, user)
      return false
    }

    const timestamp = new Date()

    // 3. Store challenge/completed/uid
    const refChallengeComplete = doc(this.$firebase.db, COLLECTION_CHALLENGE, id, COLLECTION_COMPLETE, user.id)
    await setDoc(refChallengeComplete, {
      comment,
      timestamp,
      ...user
    })
    commit('SET_CHALLENGE_COMPLETE', {
      user: user.id,
      challenge: id,
      data: {
        comment,
        timestamp,
        ...challenge
      }
    })
    // 4. Update challenge 'completed_count'
    const refChallenge = doc(this.$firebase.db, COLLECTION_CHALLENGE, id)
    await updateDoc(refChallenge, {
      completed_count: increment(1)
    })

    // 5. Store user/completed/cid
    const refUserCompleted = doc(this.$firebase.db, COLLECTION_USER, user.id, COLLECTION_COMPLETE, id)
    await setDoc(refUserCompleted, {
      comment,
      timestamp,
      ...challenge
    })
    commit('SET_USER_COMPLETE', {
      user: user.id,
      challenge: id,
      data: {
        comment,
        timestamp,
        ...challenge
      }
    })
    // 6. Update user 'completed_count'
    const refUser = doc(this.$firebase.db, COLLECTION_USER, user.id, COLLECTION_COMPLETE, id)
    await updateDoc(refUser, {
      challenges_count: increment(1)
    })

    // Update current lists
    dispatch('challenges/list', {}, { root: true })
    dispatch('ranking/list', {}, { root: true })
  },
  async list ({ commit }, { col, id }) {
    console.log('Listing complete challenges...')

    if (!col || !id) {
      console.log('STOP!', col, id)
      return false
    }

    const q = query(collection(this.$firebase.db, col, id, COLLECTION_COMPLETE))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc, index) => {
      console.log(index)
      console.log(doc.data())
      if (col === COLLECTION_CHALLENGE) {
        commit('SET_CHALLENGE_COMPLETE', {
          challenge: id,
          user: doc.id,
          data: doc.data()
        })
      } else if (col === COLLECTION_USER) {
        commit('SET_USER_COMPLETE', {
          user: id,
          challenge: doc.id,
          data: doc.data()
        })
      }
    })
  }
}

export const mutations = {
  SET_CHALLENGE_COMPLETE (state, { user, challenge, data }) {
    if (!state.challenges[challenge]) {
      state.challenges[challenge] = {}
    }
    state.challenges[challenge][user] = data
  },
  SET_USER_COMPLETE (state, { user, challenge, data }) {
    if (!state.users[user]) {
      state.users[user] = {}
    }
    state.users[user][challenge] = data
  }
}
