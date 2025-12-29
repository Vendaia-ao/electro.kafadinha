import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Wrench,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import logo from '@/assets/logo.png';
import { toast } from 'sonner';

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/admin/blog', icon: FileText, label: 'Blog' },
    { path: '/admin/projects', icon: Briefcase, label: 'Projetos' },
    { path: '/admin/services', icon: Wrench, label: 'Serviços' },
    { path: '/admin/contacts', icon: MessageSquare, label: 'Mensagens' },
    { path: '/admin/settings', icon: Settings, label: 'Configurações' },
  ];

  const handleLogout = async () => {
    signOut();
    toast.success('Logout realizado com sucesso');
    navigate('/admin/login');
  };

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-white/10">
        {sidebarOpen && (
          <Link to="/admin" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-10" />
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white hover:bg-white/10 hidden lg:flex"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileSidebarOpen(false)}
          className="text-white hover:bg-white/10 lg:hidden"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path, item.exact);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileSidebarOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                active
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-white/10 space-y-2">
        {sidebarOpen && (
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg mb-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-white/60 truncate">{user?.email}</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={`w-full text-white hover:bg-white/10 hover:text-white ${
            sidebarOpen ? 'justify-start' : 'justify-center'
          }`}
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span className="ml-3">Sair</span>}
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-graphite text-white transition-all duration-300 flex-col hidden lg:flex fixed h-screen`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="w-64 bg-graphite text-white flex flex-col fixed h-screen z-50 lg:hidden">
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} transition-all duration-300`}>
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-30">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <img src={logo} alt="Logo" className="h-8" />
          <div className="w-10" /> {/* Spacer */}
        </div>

        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
