/* eslint-disable no-useless-escape */
// utils/slugify.ts

/**
 * Transforma o texto em um formato amigável de URL (slug).
 *
 * @param {string} input - O texto que deve ser convertido em slug.
 * @returns {string} - O texto convertido em slug.
 */
function slugify(input: string): string {
  return input
    .normalize('NFD') // Normaliza para decomposição de caracteres com acentos
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/[^\w\-]+/g, '') // Remove caracteres não-word
    .replace(/\-\-+/g, '-') // Remove múltiplos hífens
}

export { slugify }
