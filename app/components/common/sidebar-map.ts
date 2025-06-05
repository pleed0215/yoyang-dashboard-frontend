import { UserRole } from '~/graphql/types';
import { Users, Building2, UserPlus, List, Search, Clock, Building } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface MenuItem {
  title: string;
  path?: string;
  icon?: LucideIcon;
  children?: MenuItem[];
}

interface StaffMenus {
  withHospital: MenuItem[];
  withoutHospital: MenuItem[];
}

type RoleBasedMenus = {
  [UserRole.Super]: MenuItem[];
  [UserRole.Admin]: MenuItem[];
  [UserRole.Staff]: StaffMenus;
};

export const roleBasedMenus: RoleBasedMenus = {
  [UserRole.Super]: [
    {
      title: '유저 관리',
      icon: Users,
      children: [
        {
          title: '승인대기 중 유저',
          path: '/dashboard/users/pending',
          icon: UserPlus,
        },
        {
          title: '유저 목록',
          path: '/dashboard/users',
          icon: List,
        },
      ],
    },
    {
      title: '병원 관리',
      icon: Building2,
      children: [
        {
          title: '승인대기 중인 병원',
          path: '/dashboard/hospitals/pending',
          icon: Clock,
        },
        {
          title: '병원 목록',
          path: '/dashboard/hospitals',
          icon: List,
        },
      ],
    },
  ],
  [UserRole.Admin]: [
    {
      title: '유저 관리',
      icon: Users,
      children: [
        {
          title: '가입 대기 중 유저',
          path: '/dashboard/users/pending',
          icon: UserPlus,
        },
        {
          title: '유저 목록',
          path: '/dashboard/users',
          icon: List,
        },
      ],
    },
    {
      title: '병원 관리',
      icon: Building2,
      children: [
        {
          title: '병원 정보',
          path: '/dashboard/hospital',
          icon: Building,
        },
      ],
    },
  ],
  [UserRole.Staff]: {
    withoutHospital: [
      {
        title: '병원 가입 신청',
        icon: Building2,
        children: [
          {
            title: '병원 찾기',
            path: '/dashboard/hospitals/search',
            icon: Search,
          },
          {
            title: '신청 상태',
            path: '/dashboard/hospitals/application',
            icon: Clock,
          },
        ],
      },
    ],
    withHospital: [
      {
        title: '병원 정보',
        path: '/dashboard/hospital',
        icon: Building,
      },
    ],
  },
};
