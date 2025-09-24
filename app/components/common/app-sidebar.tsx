import { ChevronDown, LogOut, Settings, User, type LucideIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { useNavigate, useLocation } from 'react-router';
import { useMeQuery } from '~/graphql/operations';
import { UserRole } from '~/graphql/types';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '~/components/ui/sidebar';
import { roleBasedMenus } from './sidebar-map';
import { cn } from '~/lib/utils';
import { useEffect, useMemo, useState } from 'react';

interface MenuItem {
  title: string;
  path?: string;
  icon?: LucideIcon;
  children?: Array<MenuItem>;
}

const normalizePath = (value: string | undefined) => {
  if (!value) return undefined;
  if (value === '/') return '/';
  return value.replace(/\/{2,}/g, '/').replace(/\/$/, '');
};

const isExactPathMatch = (target: string | undefined, currentPath: string) => {
  if (!target) return false;
  return normalizePath(target) === normalizePath(currentPath);
};

const isMenuItemActive = (item: MenuItem, currentPath: string): boolean => {
  if (item.path && isExactPathMatch(item.path, currentPath)) {
    return true;
  }

  return item.children?.some(child => isMenuItemActive(child, currentPath)) ?? false;
};

function NavItem({ item, currentPath }: { item: MenuItem; currentPath: string }) {
  const navigate = useNavigate();
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const isActive = useMemo(() => isMenuItemActive(item, currentPath), [item, currentPath]);
  const [isExpanded, setIsExpanded] = useState(() => hasChildren && isActive);

  useEffect(() => {
    if (hasChildren && isActive) {
      setIsExpanded(true);
    }
  }, [hasChildren, isActive]);

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(previous => !previous);
      return;
    }

    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        type="button"
        isActive={!hasChildren && isActive}
        onClick={handleClick}
        aria-expanded={hasChildren ? isExpanded : undefined}
        className={cn('justify-between', hasChildren && 'font-medium')}
      >
        <span className="flex items-center gap-2 truncate">
          {item.icon && <item.icon className="h-4 w-4" />}
          <span className="truncate">{item.title}</span>
        </span>
        {hasChildren && (
          <ChevronDown
            className={cn('h-4 w-4 transition-transform', isExpanded && 'rotate-180')}
          />
        )}
      </SidebarMenuButton>
      {hasChildren && isExpanded && (
        <SidebarMenuSub>
          {item.children?.map(child => {
            const childKey = child.path ?? child.title;
            const childIsActive = isExactPathMatch(child.path, currentPath);

            return (
              <SidebarMenuSubItem key={childKey}>
                <SidebarMenuSubButton
                  isActive={childIsActive}
                  onClick={() => {
                    if (child.path) {
                      navigate(child.path);
                    }
                  }}
                >
                  {child.icon && <child.icon className="mr-2 h-4 w-4" />}
                  <span className="truncate">{child.title}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: userData } = useMeQuery();
  const user = userData?.me?.data;

  const getInitials = (username: string) => {
    return username
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const getRoleLabel = (role: UserRole) => {
    const labels = {
      [UserRole.Admin]: '관리자',
      [UserRole.Staff]: '직원',
      [UserRole.Super]: '슈퍼관리자',
    };
    return labels[role] || role;
  };

  const getMenuItems = () => {
    if (!user?.role) return [];

    if (user.role === UserRole.Staff) {
      return user.hospitalId
        ? roleBasedMenus[UserRole.Staff].withHospital
        : roleBasedMenus[UserRole.Staff].withoutHospital;
    }

    return roleBasedMenus[user.role] || [];
  };

  return (
    <>
      <Sidebar className="border-r dark:border-neutral-800">
        <SidebarHeader className="border-b dark:border-neutral-800 relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-lg p-2 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200">
                    {user?.username ? getInitials(user.username) : '?'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col items-start">
                  <span className="text-sm font-medium">{user?.username || '로딩 중...'}</span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {user?.role ? getRoleLabel(user.role as UserRole) : ''}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-neutral-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <DropdownMenuItem
                className="cursor-pointer gap-2"
                onClick={() => navigate('/profile')}
              >
                <User className="h-4 w-4" />
                프로필
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer gap-2"
                onClick={() => navigate('/settings')}
              >
                <Settings className="h-4 w-4" />
                설정
              </DropdownMenuItem>
              <DropdownMenuSeparator className="dark:bg-neutral-800" />
              <DropdownMenuItem
                className="cursor-pointer gap-2 text-red-600 dark:text-red-400"
                onClick={() => navigate('/logout')}
              >
                <LogOut className="h-4 w-4" />
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarHeader>
        <SidebarContent className="flex-1 p-2">
          <SidebarMenu>
            {getMenuItems().map((item, index) => (
              <NavItem
                key={item.path ?? `${item.title}-${index}`}
                item={item}
                currentPath={location.pathname}
              />
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
