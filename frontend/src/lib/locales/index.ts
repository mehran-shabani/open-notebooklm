import { zhCN } from './zh-CN';
import { enUS } from './en-US';
import { faIR } from './fa-IR';
import { zhTW } from './zh-TW';
import { ptBR } from './pt-BR';
import { jaJP } from './ja-JP';
import { itIT } from './it-IT';
import { frFR } from './fr-FR';
import { ruRU } from './ru-RU';
import { bnIN } from './bn-IN';
import { esES } from './es-ES';

export const resources = {
  'fa-IR': { ...faIR, translation: enUS },
  'zh-CN': { common: zhCN, auth: {}, dashboard: {}, chat: {}, settings: {}, errors: {}, translation: zhCN },
  'en-US': { common: enUS, auth: {}, dashboard: {}, chat: {}, settings: {}, errors: {}, translation: enUS },
  'zh-TW': { common: zhTW, auth: {}, dashboard: {}, chat: {}, settings: {}, errors: {}, translation: zhTW },
  'pt-BR': { common: ptBR, auth: {}, dashboard: {}, chat: {}, settings: {}, errors: {}, translation: ptBR },
  'ja-JP': { common: jaJP, auth: {}, dashboard: {}, chat: {}, settings: {}, errors: {}, translation: jaJP },
  'it-IT': { common: itIT, auth: {}, dashboard: {}, chat: {}, settings: {}, errors: {}, translation: itIT },
  'fr-FR': { common: frFR, auth: {}, dashboard: {}, chat: {}, settings: {}, errors: {}, translation: frFR },
  'ru-RU': { common: ruRU, auth: {}, dashboard: {}, chat: {}, settings: {}, errors: {}, translation: ruRU },
  'bn-IN': { common: bnIN, auth: {}, dashboard: {}, chat: {}, settings: {}, errors: {}, translation: bnIN },
  'es-ES': { common: esES, auth: {}, dashboard: {}, chat: {}, settings: {}, errors: {}, translation: esES },
} as const;

export const namespaces = [
  'common',
  'auth',
  'dashboard',
  'chat',
  'settings',
  'errors',
] as const;

export type TranslationKeys = typeof enUS;

export type LanguageCode = 'fa-IR' | 'zh-CN' | 'en-US' | 'zh-TW' | 'pt-BR' | 'ja-JP' | 'it-IT' | 'fr-FR' | 'ru-RU' | 'bn-IN' | 'es-ES';

export type Language = {
  code: LanguageCode;
  label: string;
};

export const languages: Language[] = [
  { code: 'fa-IR', label: 'فارسی' },
  { code: 'en-US', label: 'English' },
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'pt-BR', label: 'Português' },
  { code: 'ja-JP', label: '日本語' },
  { code: 'it-IT', label: 'Italiano' },
  { code: 'fr-FR', label: 'Français' },
  { code: 'ru-RU', label: 'Русский' },
  { code: 'bn-IN', label: 'বাংলা' },
  { code: 'es-ES', label: 'Español' },
];

export { faIR, zhCN, enUS, zhTW, ptBR, jaJP, itIT, frFR, ruRU, bnIN, esES };
