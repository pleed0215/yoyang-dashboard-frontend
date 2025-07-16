import { UserRole } from '~/graphql/types';
import { Users, Building2, UserPlus, List, Search, Clock, Building, Info, UserCheck, Bed, DoorOpen, Briefcase, Calendar1 } from 'lucide-react';
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

// 공통 병원 관련 메뉴
export const commonMenus = {
  hospital: {
    title: '병원 관련',
    path: '/hospitals',
    icon: Building2,
    children: [
      { title: '병원 종합 정보', path: '/hospitals', icon: Info },
      { title: '부서 관리', path: '/hospitals/parts', icon: Building },
      { title: '직책 관리', path: '/hospitals/positions', icon: UserCheck },
      { title: '직무 관리', path: '/hospitals/duties', icon: Briefcase },
      { title: '병동 관리', path: '/hospitals/wards', icon: Bed },
      { title: '병실 관리', path: '/hospitals/rooms', icon: DoorOpen },
      { title: '위원회 관리', path: '/hospitals/comittees', icon: Users },
    ],
  },

  employee: {
    title: '직원 관련',
    path: '/employees',
    icon: Users,
    children: [
      { title: '직원 목록', path: '/employees', icon: List },
      { title: '직원 추가', path: '/employees/add', icon: UserPlus },
    ],
  },

  patient: {
    title: '환자 관련',
    path: '/patients',
    icon: Users,
    children: [
      { title: '입원 현황', path: '/patients/list', icon: Bed },
      { title: '월별 현황', path: '/patients/status', icon: Calendar1 },
      { title: '환자 목록', path: '/patients', icon: List },
      { title: '환자 추가', path: '/patients/add', icon: UserPlus },
    ],
  },
};

export const roleBasedMenus: RoleBasedMenus = {
  [UserRole.Super]: [
    {
      title: '유저 관리',
      icon: Users,
      children: [
        {
          title: '승인대기 중 유저',
          path: '/super/users/pending',
          icon: UserPlus,
        },
        {
          title: '유저 목록',
          path: '/super/users',
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
          path: '/super/hospitals/pending',
          icon: Clock,
        },
        {
          title: '병원 목록',
          path: '/super/hospitals',
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
          path: '/admin/users/pending',
          icon: UserPlus,
        },
        {
          title: '유저 목록',
          path: '/admin/users',
          icon: List,
        },
      ],
    },
    // 병원 관련 메뉴를 공통 메뉴로 대체
    commonMenus.hospital,
    commonMenus.employee,
    commonMenus.patient,
  ],
  [UserRole.Staff]: {
    withoutHospital: [
      {
        title: '병원 가입 신청',
        icon: Building2,
        children: [
          {
            title: '병원 찾기',
            path: '/staff/hospitals/search',
            icon: Search,
          },
          {
            title: '신청 상태',
            path: '/staff/hospitals/pending',
            icon: Clock,
          },
        ],
      },
    ],
    withHospital: [
      // 병원 관련 메뉴를 공통 메뉴로 대체
      commonMenus.hospital,
      commonMenus.employee,
      commonMenus.patient,
    ],
  },
};
