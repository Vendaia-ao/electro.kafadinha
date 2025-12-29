import { useData } from '@/contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Briefcase, Wrench, MessageSquare, Eye, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { blogPosts, projects, services, contactMessages } = useData();

  const publishedPosts = blogPosts.filter(p => p.status === 'published').length;
  const draftPosts = blogPosts.filter(p => p.status === 'draft').length;
  const publishedProjects = projects.filter(p => p.status === 'published').length;
  const publishedServices = services.filter(s => s.status === 'published').length;
  const unreadMessages = contactMessages.filter(m => m.status === 'unread').length;

  const stats = [
    {
      title: 'Posts Publicados',
      value: publishedPosts,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      link: '/admin/blog',
    },
    {
      title: 'Projetos',
      value: publishedProjects,
      icon: Briefcase,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      link: '/admin/projects',
    },
    {
      title: 'Serviços',
      value: publishedServices,
      icon: Wrench,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      link: '/admin/services',
    },
    {
      title: 'Mensagens Não Lidas',
      value: unreadMessages,
      icon: MessageSquare,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      link: '/admin/contacts',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-graphite">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Bem-vindo ao painel administrativo da Electro Kafadinha
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} to={stat.link}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-graphite mt-2">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Mensagens Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {contactMessages.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhuma mensagem recebida</p>
            ) : (
              <div className="space-y-4">
                {contactMessages.slice(0, 5).map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start gap-3 pb-4 border-b last:border-0"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        message.status === 'unread'
                          ? 'bg-red-500'
                          : message.status === 'read'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-graphite">
                        {message.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {message.subject}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(message.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
                <Link
                  to="/admin/contacts"
                  className="block text-sm text-primary hover:underline font-medium"
                >
                  Ver todas as mensagens →
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Visão Geral do Conteúdo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Posts do Blog</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {publishedPosts} publicados
                  </span>
                  {draftPosts > 0 && (
                    <span className="text-sm text-yellow-600">
                      / {draftPosts} rascunhos
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Projetos</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {projects.length} total
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wrench className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">Serviços</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {services.length} total
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium">Mensagens</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {contactMessages.length} total
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/blog/new"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
            >
              <FileText className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Novo Post no Blog</p>
            </Link>
            <Link
              to="/admin/projects/new"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
            >
              <Briefcase className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Novo Projeto</p>
            </Link>
            <Link
              to="/admin/services/new"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
            >
              <Wrench className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Novo Serviço</p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
