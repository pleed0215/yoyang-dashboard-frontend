import { type RouteConfig, index, route, layout, prefix } from '@react-router/dev/routes';

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
    ]),
    ...prefix('/admin', [
      index('features/admin/pages/admin-dashboard-index.tsx'),
      ...prefix('/users', [
        index('features/admin/pages/admin-users-index.tsx'),
        route('/pending', 'features/admin/pages/admin-users-pending.tsx'),
      ]),
      ...prefix('/hospitals', [
        index('features/admin/pages/admin-hospital-index.tsx'),

      ]),
    ]),
  ]),
] satisfies RouteConfig;
