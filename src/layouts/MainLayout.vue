<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="noise2 text-primary">
      <q-toolbar>

        <q-toolbar-title>
          Stateborn - trustless DAO
        </q-toolbar-title>
        <ConnectWithWallet></ConnectWithWallet>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="noise2"
    >
      <q-list class="text-black">
        <q-item-label header class="text-black">
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-item
          class="bg-grey-8 text-white"
          clickable

          to="/create-dao"
        >
          <q-item-section
            avatar
          >
            <q-icon name="fa-regular fa-square-plus" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Create DAO</q-item-label>
            <q-item-label caption class="text-white">Create your own DAO</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import ConnectWithWallet from 'components/ConnectWithWallet.vue';

const linksList = [
  {
    title: 'Browse DAOs',
    caption: 'Browse stateborn DAOs',
    icon: 'fa-solid fa-magnifying-glass',
    link: '/',
  },
  // {
  //   title: 'Browse proposals',
  //   caption: 'Browse all active proposals',
  //   icon: 'fa-solid fa-magnifying-glass',
  //   link: '/',
  // },
  // {
  //   title: 'Discord Chat Channel',
  //   caption: 'chat.quasar.dev',
  //   icon: 'chat',
  //   link: 'https://chat.quasar.dev',
  // },
  // {
  //   title: 'Forum',
  //   caption: 'forum.quasar.dev',
  //   icon: 'record_voice_over',
  //   link: 'https://forum.quasar.dev',
  // },
  // {
  //   title: 'Twitter',
  //   caption: '@quasarframework',
  //   icon: 'rss_feed',
  //   link: 'https://twitter.quasar.dev',
  // },
  // {
  //   title: 'Facebook',
  //   caption: '@QuasarFramework',
  //   icon: 'public',
  //   link: 'https://facebook.quasar.dev',
  // },
  // {
  //   title: 'Quasar Awesome',
  //   caption: 'Community Quasar projects',
  //   icon: 'favorite',
  //   link: 'https://awesome.quasar.dev',
  // },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    ConnectWithWallet,
    EssentialLink,
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const account = ref('');
    // eslint-disable-next-line max-len
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      account,
    };
  },
});
</script>
