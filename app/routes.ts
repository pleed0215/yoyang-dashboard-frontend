import { type RouteConfig, index, route, layout, prefix } from '@react-router/dev/routes';

const  commonHospitalRoutes = [
  ...prefix('hospitals', [
    index('features/common/pages/hospital-index.tsx'),
    route('/duties', 'features/common/pages/hospital-duties.tsx'),
    route('/positions', 'features/common/pages/hospital-positions.tsx'),
    route('/wards', 'features/common/pages/hospital-wards.tsx'),
    route('/rooms', 'features/common/pages/hospital-rooms.tsx'),
  ]),
]

export default [
  index('./index.tsx'),
  route('/login', 'features/auth/login.tsx'),
  route('/logout', 'features/auth/logout.tsx'),
  route('/register', 'features/auth/register.tsx'),
  layout('features/common/layouts/dashboard-layout.tsx', [
    ...prefix('/dashboard', [index('features/common/pages/dashboard-index.tsx')]),
    ...prefix('/super', [
      index('features/super/pages/super-index.tsx'),
      ...prefix('/users', [
        index('features/super/pages/super-users-index.tsx'),
        route('/pending', 'features/super/pages/super-users-pending.tsx'),
      ]),
      ...prefix('/hospitals', [
        index('features/super/pages/super-hospitals-index.tsx'),
        route('/pending', 'features/super/pages/super-hospitals-pending.tsx'),
      ]),
    ]),
    ...prefix('/staff', [
      index('features/staff/pages/staff-dashboard-index.tsx'),
      route('/hospitals/search', 'features/staff/pages/staff-hospital-find.tsx'),
      route('/hospitals/request/:ykiho', 'features/staff/pages/staff-hospital-request.tsx'),
      route('/hospitals/join-request/:ykiho', 'features/staff/pages/staff-hospital-join-request.tsx'),
      route('/hospitals/pending', 'features/staff/pages/staff-hospital-join-request-pending.tsx'),
      ...commonHospitalRoutes,
    ]),
    ...prefix('/admin', [
      index('features/admin/pages/admin-dashboard-index.tsx'),
      ...prefix('/users', [
        index('features/admin/pages/admin-users-index.tsx'),
        route('/pending', 'features/admin/pages/admin-users-pending.tsx'),
      ]),
      ...commonHospitalRoutes,
    ]),
  ]),
] satisfies RouteConfig;
