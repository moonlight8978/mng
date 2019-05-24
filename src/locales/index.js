import { Localization } from 'expo'
import i18n from 'i18n-js'

import calendar from './calendar'

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
}

const vi = {
  home: {
    title: 'Home',
  },
  calendar: calendar.vi,
}

i18n.fallbacks = true
i18n.translations = { vi, en }
i18n.locale = Localization.locale
