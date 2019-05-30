import { Localization } from 'expo'
import i18n from 'i18n-js'

import calendar from './calendar'
import category from './category'
import drawer from './drawer'
import home from './home'
import schema from './schema'
import datePayments from './date-payments'

const en = {
  home: home.en,
  datePayments: datePayments.en,
  calendar: calendar.en,
  category: category.en,
  drawer: drawer.en,
  schema: schema.en,
}

const vi = {
  home: home.vi,
  datePayments: datePayments.vi,
  calendar: calendar.vi,
  category: category.vi,
  drawer: drawer.vi,
  schema: schema.vi,
}

i18n.fallbacks = true
i18n.translations = { vi, en }
i18n.locale = Localization.locale
