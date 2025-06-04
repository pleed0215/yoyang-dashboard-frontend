import { Switch } from '~/components/ui/switch';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '~/components/common/theme-provider';

export default function AppearanceSwitch() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2">
      <Sun className="h-4 w-4" />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
      <Moon className="h-4 w-4" />
    </div>
  );
}
