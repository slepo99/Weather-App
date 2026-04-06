import { createI18n } from 'vue-i18n'

import en from './en.json'
import uk from './uk.json'

export const i18n = createI18n({
  legacy: false,           
  locale: 'EN',           
  fallbackLocale: 'EN',    
  messages: {
    EN: en,
    UK: uk,
  },
})