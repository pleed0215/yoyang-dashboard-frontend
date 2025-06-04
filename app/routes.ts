import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('./index.tsx'),
  route('/login', 'features/auth/login.tsx'),
  route('/logout', 'features/auth/logout.tsx'),
] satisfies RouteConfig;
