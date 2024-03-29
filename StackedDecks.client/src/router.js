import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage'),
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage'),
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/decks',
    name: 'Decks',
    component: loadPage('DecksPage'),
    beforeEnter: authGuard
  },
  {
    path: '/deck/:deckId',
    name: 'Deck',
    component: loadPage('DeckPage'),
    beforeEnter: authGuard
  },
  {
    path: '/profile/:creatorId',
    name: 'Profile',
    component: loadPage('ProfilePage'),
    beforeEnter: authGuard
  },
  {
    path: '/sponsors',
    name: 'Sponsors',
    component: loadPage('SponsorsPage'),
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
