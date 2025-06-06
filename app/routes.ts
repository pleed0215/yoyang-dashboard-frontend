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
        index('features/super/pages/users-index.tsx'),
        route('/pending', 'features/super/pages/users-pending.tsx'),
      ]),
    ]),
    ...prefix('/staff', [index('features/staff/pages/staff-dashboard-index.tsx')]),
  ]),
] satisfies RouteConfig;
