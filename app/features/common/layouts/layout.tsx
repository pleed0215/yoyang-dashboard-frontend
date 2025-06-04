import { AppSidebar } from '~/components/common/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import { Outlet } from 'react-router';

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full bg-muted-foreground">
          <SidebarTrigger />
          <div>대시보드</div>
        </div>
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
