import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
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
  protected readonly resolvedTheme = signal<'dark' | 'light'>('dark');
  protected readonly themeAction = computed(() =>
    this.resolvedTheme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
  );

  private readonly destroyRef = inject(DestroyRef);
  private mediaQuery: MediaQueryList | null = null;

  constructor() {
    afterNextRender(() => this.initializeTheme());
  }

  protected toggleTheme(): void {
    const nextTheme = this.resolvedTheme() === 'dark' ? 'light' : 'dark';
    this.themePreference.set(nextTheme);
    this.applyTheme(nextTheme, this.mediaQuery?.matches ?? false);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
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
    this.resolvedTheme.set(resolvedTheme);
    document.documentElement.dataset['theme'] = resolvedTheme;
    document.documentElement.dataset['themePreference'] = preference;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', resolvedTheme === 'light' ? '#f4f6f8' : '#1a1a1a');
  }
}
