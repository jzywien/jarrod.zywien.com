import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { profileContent } from './profile-content';

type ThemePreference = 'dark' | 'light' | 'system';

const THEME_STORAGE_KEY = 'profile-theme';

function isThemePreference(value: string | null): value is ThemePreference {
  return value === 'dark' || value === 'light' || value === 'system';
}

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class App {
  protected readonly profile = profileContent;
  protected readonly themePreference = signal<ThemePreference>('dark');

  private readonly destroyRef = inject(DestroyRef);
  private mediaQuery: MediaQueryList | null = null;

  constructor() {
    afterNextRender(() => this.initializeTheme());
  }

  protected onThemePreferenceChange(event: Event): void {
    const value = (event.currentTarget as HTMLSelectElement).value;

    if (!isThemePreference(value)) {
      return;
    }

    this.themePreference.set(value);
    this.applyTheme(value, this.mediaQuery?.matches ?? false);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, value);
    } catch {
      // The selected theme still works for this page when storage is unavailable.
    }
  }

  private initializeTheme(): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    } catch {
      this.mediaQuery = null;
    }

    let preference: ThemePreference = 'dark';
    try {
      const savedPreference = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (isThemePreference(savedPreference)) {
        preference = savedPreference;
      }
    } catch {
      const bootstrappedPreference = document.documentElement.dataset['themePreference'] ?? null;
      if (isThemePreference(bootstrappedPreference)) {
        preference = bootstrappedPreference;
      }
    }

    this.themePreference.set(preference);
    this.applyTheme(preference, this.mediaQuery?.matches ?? false);

    if (!this.mediaQuery) {
      return;
    }

    const onSystemThemeChange = (event: MediaQueryListEvent): void => {
      if (this.themePreference() === 'system') {
        this.applyTheme('system', event.matches);
      }
    };

    this.mediaQuery.addEventListener('change', onSystemThemeChange);
    this.destroyRef.onDestroy(() => {
      this.mediaQuery?.removeEventListener('change', onSystemThemeChange);
    });
  }

  private applyTheme(preference: ThemePreference, prefersLight: boolean): void {
    const resolvedTheme = preference === 'system' ? (prefersLight ? 'light' : 'dark') : preference;
    document.documentElement.dataset['theme'] = resolvedTheme;
    document.documentElement.dataset['themePreference'] = preference;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', resolvedTheme === 'light' ? '#f4f6f8' : '#1a1a1a');
  }
}
