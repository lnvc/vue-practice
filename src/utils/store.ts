import { defineStore } from "pinia";

import router from '../router';

interface IState {
  isAuthenticated: boolean,
  user: any | null,
  token: string | null,
}

export const useStore = defineStore('main', {
  state: () => {
    return {
      isAuthenticated: false,
      user: null,
      token: null,
    } as IState
  },
  getters: {
    getIsAuthenticated: state => state.isAuthenticated,
    getUser: state => state.user,
    getToken: state => state.token,
  },
  actions: {
    async login(user: any | null, token: string | null) {
      this.user = user;
      this.token = token;
      this.isAuthenticated = true;
      console.log('login', this.user, this.token, this.isAuthenticated);
    },
    async logout() {
      console.log('logout', this.user, this.token, this.isAuthenticated);
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
    }
  }
});
