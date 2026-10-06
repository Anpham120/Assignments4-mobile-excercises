import { useLocales } from 'expo-localization';
import { I18n, type TranslateOptions } from 'i18n-js';
import { useCallback } from 'react';

import { en } from './en';
import { vi } from './vi';

// Thiếu bản dịch hoặc máy dùng ngôn ngữ khác thì rơi về tiếng Anh
const i18n = new I18n({ en, vi }, { defaultLocale: 'en', enableFallback: true });

// Trả về hàm dịch theo ngôn ngữ của máy; đổi ngôn ngữ trong cài đặt thì màn hình tự vẽ lại
export function useTranslation() {
  const [{ languageCode }] = useLocales();
  const locale = languageCode ?? 'en';
  return useCallback(
    (scope: string, options?: TranslateOptions) => i18n.t(scope, { ...options, locale }),
    [locale],
  );
}
