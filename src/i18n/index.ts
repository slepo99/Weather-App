import { createI18n } from 'vue-i18n'

import en from './en.json'
import uk from './uk.json'
type MessageSchema = typeof en & typeof uk
export const i18n = createI18n({
  legacy: false,           
  locale: 'en',           
  fallbackLocale: 'en',    
  messages: {
    en,
    uk,
  },
})