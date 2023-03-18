import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Card.js').Card[]} */
  cards: [],
  /** @type {import('./models/Deck').Deck[]} */
  decks: [],
  userDecks: [],
  /** @type {import('./models/Deck').Deck|null} */
  deck: null,
  /** @type {import('./models/DeckCard').DeckCard[]} */
  deckCards: [],
  // completed:[],
  /** @type {import('./models/DeckCard').DeckCard|null} */
  deckCard: null,

  /** @type {import('./models/Profile.js').Profile | null} */
  profile: null,

  /** @type {import('./models/DeckCard').DeckCard|null} */
  accountDeckCards: null,

  myDecks: [],

  deckPercent: null
})
