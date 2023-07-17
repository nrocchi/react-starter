import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import {
  format as formatDate,
  formatDistance,
  formatRelative,
  isDate,
} from 'date-fns'
import {fr, enUS} from 'date-fns/locale'
import {format as formatTz, utcToZonedTime} from 'date-fns-tz'
import _ from 'lodash'
import enJSON from 'src/core/language/translations/en'
import frJSON from 'src/core/language/translations/fr'

const resources = {
  en: {
    translation: enJSON,
  },
  fr: {
    translation: frJSON,
  },
}

// date-fns locales
const locales: {[key: string]: Locale} = {fr, en: enUS}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    load: 'all',
    fallbackLng: 'en',
    resources,
    react: {
      useSuspense: true,
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
    },
    interpolation: {
      escapeValue: false,
      format: (value, format, lng, options) => {
        const locale = locales[lng]

        switch (format) {
          // Text formatters
          case 'uppercase':
            return _.upperCase(value)
          case 'lowercase':
            return value.toLocaleLowerCase(locale)
          case 'capitalize':
            return _.capitalize(value)
          case 'underscore':
            return _.replace(value, /\s+/g, '_').toLowerCase()
          case 'slug':
            return _.replace(value, /\s+/g, '-').toLowerCase()
          case 'truncate':
            return _.truncate(value, {
              length: options.truncate || 35,
              separator: ' ',
            })

          // Date formatters
          case 'short':
            return formatDate(value, 'P', {locale})
          case 'long':
            return formatDate(value, 'PPPP', {locale})
          case 'longtime':
            return formatDate(value, 'PPpp', {locale})
          case 'hourDay':
            return formatTz(utcToZonedTime(value, 'UTC'), 'p', {
              timeZone: 'UTC',
              locale,
            })
          case 'relative':
            return formatRelative(value, new Date(), {locale})
          case 'ago':
            return formatDistance(value, new Date(), {
              locale,
              addSuffix: true,
            })

          // Number digit formatter
          case 'number':
            return Intl.NumberFormat(lng, {
              maximumFractionDigits: 2,
            }).format(value)

          // Currencies formatter
          case 'currencyUSD':
            return Intl.NumberFormat(lng, {
              style: 'currency',
              currency: 'USD',
              currencyDisplay: 'narrowSymbol',
            }).format(value)
          case 'currencyEUR':
            return Intl.NumberFormat(lng, {
              style: 'currency',
              currency: 'EUR',
            }).format(value)
          case 'currencyEURNoDigit':
            return Intl.NumberFormat(lng, {
              style: 'currency',
              maximumFractionDigits: 0,
              currency: 'EUR',
            }).format(value)

          // Percent formatter
          case 'percent':
            const number = Intl.NumberFormat(lng, {
              maximumFractionDigits: 2,
            }).format(value)
            return `${number} %`

          default:
            return isDate(value) ? formatDate(value, format, {locale}) : value
        }
      },
    },
  })

export default i18n
