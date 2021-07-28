import { v4 as uuidV4 } from 'uuid'
import Vue from 'vue'
import Vuex from 'vuex'
import { createContact, initState, saveStorage } from "../models/contact"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: initState()
  },
  mutations: {
    createContact(state, contact) {
      if (contact.bossId) {
        const boss = state.contacts.find(c => c.id === contact.bossId)
        boss.workersId.push(contact.id)
      }
      state.contacts.push(contact)
    },
  },
  actions: {
    createContact({ state, commit, dispatch }, contact) {
      try {
        commit('createContact', createContact(contact))
        saveStorage(state.contacts)
      } catch (e) {
        console.error(e)
      }
    },
  },
  getters: {
    contactsWithoutBoss: (state) => state.contacts.filter(contact => !contact.bossId),
    getContactById: (state) => (...ids) => state.contacts.filter(contact => ids.includes(contact.id))
  }
})