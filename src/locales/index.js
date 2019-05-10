import { Localization } from 'expo'
import i18n from 'i18n-js'

const en = {
  home: {
    title: 'Home',
  },
}

const vi = {
  home: {
    title: 'Home',
  },
}

i18n.fallbacks = true
i18n.translations = { vi, en }
i18n.locale = Localization.locale
