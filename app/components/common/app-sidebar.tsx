import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
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
import { Sidebar, SidebarContent, SidebarHeader } from '~/components/ui/sidebar';
import { roleBasedMenus } from './sidebar-map';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { useState } from 'react';

interface NavItemProps {
  title: string;
  path?: string;
  icon?: any;
  children?: Array<any>;
  isActive?: boolean;
  onClick?: () => void;
}

function NavItem({ title, path, icon: Icon, children, isActive, onClick }: NavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (children) {
      setIsExpanded(!isExpanded);
    } else if (path) {
      navigate(path);
    }
    onClick?.();
  };

  return (
    <div>
      <Button
        variant="ghost"
        className={cn('w-full justify-between', isActive && 'bg-muted')}
        onClick={handleClick}
      >
        <span className="flex items-center">
          {Icon && <Icon className="mr-2 h-4 w-4" />}
          {title}
        </span>
        {children && (
          <ChevronDown className={cn('h-4 w-4 transition-transform', isExpanded && 'rotate-180')} />
        )}
      </Button>
      {children && isExpanded && (
        <div className="ml-4 mt-1 space-y-1">
          {children.map((child, index) => (
            <NavItem key={index} {...child} isActive={path === child.path} />
          ))}
        </div>
      )}
    </div>
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
        <SidebarContent className="flex-1 space-y-1 p-2">
          {getMenuItems().map((item, index) => (
            <NavItem key={index} {...item} isActive={location.pathname === item.path} />
          ))}
        </SidebarContent>
      </Sidebar>
    </>
  );
}
