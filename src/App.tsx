import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import BlogManager from "./pages/admin/BlogManager";
import BlogEditor from "./pages/admin/BlogEditor";
import ProjectsManager from "./pages/admin/ProjectsManager";
import ProjectEditor from "./pages/admin/ProjectEditor";
import ServicesManager from "./pages/admin/ServicesManager";
import ServiceEditor from "./pages/admin/ServiceEditor";
import ContactMessages from "./pages/admin/ContactMessages";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DataProvider>
        <TooltipProvider>
          <div className="overflow-x-hidden">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/privacidade" element={<Privacy />} />
                <Route path="/termos" element={<Terms />} />
                
                <Route path="/admin/login" element={<AdminLogin />} />
                
                <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="blog" element={<BlogManager />} />
              <Route path="blog/new" element={<BlogEditor />} />
              <Route path="blog/edit/:id" element={<BlogEditor />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="projects/new" element={<ProjectEditor />} />
              <Route path="projects/edit/:id" element={<ProjectEditor />} />
              <Route path="services" element={<ServicesManager />} />
              <Route path="services/new" element={<ServiceEditor />} />
              <Route path="services/edit/:id" element={<ServiceEditor />} />
              <Route path="contacts" element={<ContactMessages />} />
              <Route path="settings" element={<Settings />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </DataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
