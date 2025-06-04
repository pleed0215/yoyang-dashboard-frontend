import { type RouteConfig, index, route, layout, prefix } from '@react-router/dev/routes';

export default [
  index('./index.tsx'),
  route('/login', 'features/auth/login.tsx'),
  route('/logout', 'features/auth/logout.tsx'),
  layout('features/common/layouts/layout.tsx', [
    ...prefix('/dashboard', [index('features/common/pages/dashboard-index.tsx')]),
  ]),
] satisfies RouteConfig;
