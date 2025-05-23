'use client';

import { Sun as SunIcon, MoonIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';

export default function ToggleDark() {
  // const { dark, toggleDark } = useAppearanceContext();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const isDark = resolvedTheme === 'dark';
  return (
    <div className="fixed right-4 bottom-4">
      {resolvedTheme === 'light' && theme ? <SunIcon /> : <MoonIcon />}
      <Switch checked={isDark} onCheckedChange={toggleTheme} />
    </div>
  );
}
