import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/BrowseDaosPage.vue') }],
  },
  {
    path: '/:daoIpfsHash',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/BrowseProposalsPage.vue') },
      { path: ':id', component: () => import('pages/ProposalDetailsPage.vue') },
      { path: 'create-proposal', component: () => import('pages/CreateProposalPage.vue') },

    ],
  },
  // {
  //   path: '/:daoIpfsHash/create-proposal',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [{ path: '', component: () => import('pages/CreateProposalPage.vue') }],
  // },
  // {
  //   path: '/proposal/:id',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [{ path: '', component: () => import('pages/ProposalDetailsPage.vue') }],
  // },
  {
    path: '/create-dao',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/CreateDaoPage.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
