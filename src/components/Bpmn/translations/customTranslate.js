import { i18nSpanish } from './i18n'


const customTranslate = (template, replacements) => {
  replacements = replacements || {}

  // Translate
  template = { ...i18nSpanish }[template] || template

  // Replace
  return template.replace(/{([^}]+)}/g, function (_, key) {
    return replacements[key] || '{' + key + '}'
  })
}

export default customTranslate