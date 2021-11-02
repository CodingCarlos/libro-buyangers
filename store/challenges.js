import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore'

const COLLECTION = 'challenges'

export const state = () => ({
  list: [],
  current: null
})

export const getters = {
  getById: state => id => state.list.find(item => item.id === id)
}

export const actions = {
  async list ({ commit }) {
    const q = query(collection(this.$firebase.db, COLLECTION))

    const listItems = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      listItems.push({
        id: doc.id,
        ...doc.data()
      })

      commit('SET', listItems)
    })
  },
  async get ({ commit }, id) {
    const ref = doc(this.$firebase.db, COLLECTION, id)
    try {
      const result = await getDoc(ref)
      const data = {
        id,
        ...result.data()
      }
      commit('SET_ITEM', data)
      return data
    } catch (e) {
      console.error('Error!', e)
      return null
    }
  },
  clear ({ commit }) {
    commit('SET', [])
  }
}

export const mutations = {
  SET (state, list) {
    state.list = [...list]
  },
  SET_ITEM (state, item) {
    const list = [...state.list]

    let found = false
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === item.id) {
        list[i] = item
        found = true
        break
      }
    }

    if (!found) {
      list.push(item)
    }

    state.list = list
  }
}
