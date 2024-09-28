import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => ({
    name: '',
    age: 0
  }),
  getters: {
    getAge: (state) => state.age
  },
  actions: {
    setAge(age: number) {
      this.age = age
    }
  }
})
