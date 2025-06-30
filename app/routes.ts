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
    ...prefix('/hospitals', [
      index('features/common/pages/hospitals/hospital-index.tsx'),
      route('/duties', 'features/common/pages/hospitals/hospital-duties.tsx'),
      route('/positions', 'features/common/pages/hospitals/hospital-positions.tsx'),
      route('/wards', 'features/common/pages/hospitals/hospital-wards.tsx'),
      route('/rooms', 'features/common/pages/hospitals/hospital-rooms.tsx'),
      route('/parts', 'features/common/pages/hospitals/hospital-parts.tsx'),
      route('/comittees', 'features/common/pages/hospitals/hospital-comittees.tsx'),
    ]),
    ...prefix('/employees', [
      index('features/common/pages/employees/employee-index.tsx'),
      route('/add', 'features/common/pages/employees/employee-add.tsx'),
      route('/:employeeId', 'features/common/pages/employees/employee-detail.tsx'),
    ]),
    ...prefix('/staff', [
      index('features/staff/pages/staff-dashboard-index.tsx'),
      ...prefix('/hospitals', [
        route('/search', 'features/staff/pages/staff-hospital-find.tsx'),
        route('/request/:ykiho', 'features/staff/pages/staff-hospital-request.tsx'),
        route('/join-request/:ykiho', 'features/staff/pages/staff-hospital-join-request.tsx'),
        route('/pending', 'features/staff/pages/staff-hospital-join-request-pending.tsx'),
      ]),
    ]),
    ...prefix('/admin', [
      index('features/admin/pages/admin-dashboard-index.tsx'),
      ...prefix('/users', [
        index('features/admin/pages/admin-users-index.tsx'),
        route('/pending', 'features/admin/pages/admin-users-pending.tsx'),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
