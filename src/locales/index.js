import { Localization } from 'expo'
import i18n from 'i18n-js'

import calendar from './calendar'
import category from './category'
import drawer from './drawer'

const en = {
  home: {
    title: 'Home',
  },
  datePayments: {
    total: {
      title: 'Total spent this day:',
    },
  },
  calendar: calendar.en,
  category: category.en,
  drawer: drawer.en,
}

const vi = {
  home: {
    title: 'Home',
  },
  calendar: calendar.vi,
  category: category.vi,
  drawer: drawer.vi,
}

i18n.fallbacks = true
i18n.translations = { vi, en }
i18n.locale = Localization.locale
