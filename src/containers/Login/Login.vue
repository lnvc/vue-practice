<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import { signInWithPopup, onAuthStateChanged, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth as firebaseAuth } from 'firebaseui';

import {auth} from '../../../firebase';
import {useStore} from '../../utils/store'

const store = useStore();
const isLoggedIn = ref(store.getIsAuthenticated);

const ui = new firebaseAuth.AuthUI(auth);
const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/todo',
  signInOptions: [GoogleAuthProvider.PROVIDER_ID],
};
// display google login button
ui.start("#firebaseui-auth-container", uiConfig);
const provider = new GoogleAuthProvider();

onMounted(() => {
  onAuthStateChanged(auth, user => {
    if (user) {
      store.login(user, null);
    } else {
      store.logout();
    }
  });
});

watchEffect(() => {
  isLoggedIn.value = store.getIsAuthenticated;
});

const login = () => {
  // user clicked login
  signInWithPopup(auth, provider)
    .then(res => {
      const cred = GoogleAuthProvider.credentialFromResult(res);
      const token = cred?.accessToken;
      const user = res.user;
      console.log(user);
      store.login(user, token || null);
      isLoggedIn.value = true;
    })
    .catch(err => {
      throw err;
    });
};

const logout = () => {
  signOut(auth);
  store.logout();
  isLoggedIn.value = false;
};

</script>

<template>
  <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css" />
  <section v-if="!isLoggedIn" id="firebaseui-auth-container" @click="login"></section>
  <button v-else id="logout" @click="logout">logout</button>
</template>

<style></style>
