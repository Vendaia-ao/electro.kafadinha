import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Search, Eye, Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactMessages() {
  const { contactMessages, updateContactMessage } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  const filteredMessages = contactMessages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || message.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const currentMessage = selectedMessage
    ? contactMessages.find((m) => m.id === selectedMessage)
    : null;

  const handleView = (id: string) => {
    const message = contactMessages.find((m) => m.id === id);
    if (message) {
      setSelectedMessage(id);
      setAdminNotes(message.adminNotes || '');
      if (message.status === 'unread') {
        updateContactMessage(id, {
          status: 'read',
          readAt: new Date().toISOString(),
        });
      }
    }
  };

  const handleMarkAsReplied = () => {
    if (selectedMessage) {
      updateContactMessage(selectedMessage, {
        status: 'replied',
        adminNotes,
      });
      toast.success('Mensagem marcada como respondida');
      setSelectedMessage(null);
    }
  };

  const handleSaveNotes = () => {
    if (selectedMessage) {
      updateContactMessage(selectedMessage, { adminNotes });
      toast.success('Notas salvas com sucesso');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unread':
        return <Badge variant="destructive">Não lida</Badge>;
      case 'read':
        return <Badge variant="secondary">Lida</Badge>;
      case 'replied':
        return <Badge variant="default">Respondida</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-graphite">Mensagens de Contato</h1>
        <p className="text-muted-foreground mt-1">
          Visualize e gerencie mensagens recebidas através do formulário de contato
        </p>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar mensagens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
              size="sm"
            >
              Todas ({contactMessages.length})
            </Button>
            <Button
              variant={filterStatus === 'unread' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('unread')}
              size="sm"
            >
              Não lidas ({contactMessages.filter((m) => m.status === 'unread').length})
            </Button>
            <Button
              variant={filterStatus === 'read' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('read')}
              size="sm"
            >
              Lidas ({contactMessages.filter((m) => m.status === 'read').length})
            </Button>
            <Button
              variant={filterStatus === 'replied' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('replied')}
              size="sm"
            >
              Respondidas ({contactMessages.filter((m) => m.status === 'replied').length})
            </Button>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Assunto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhuma mensagem encontrada
                  </TableCell>
                </TableRow>
              ) : (
                filteredMessages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="font-medium">{message.name}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell>{message.phone}</TableCell>
                    <TableCell className="max-w-xs truncate">{message.subject}</TableCell>
                    <TableCell>{getStatusBadge(message.status)}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {new Date(message.createdAt).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Visualizar"
                          onClick={() => handleView(message.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <a href={`mailto:${message.email}`}>
                          <Button variant="ghost" size="icon" title="Responder por email">
                            <Mail className="w-4 h-4" />
                          </Button>
                        </a>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Message Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes da Mensagem</DialogTitle>
            <DialogDescription>
              Visualize e responda a mensagem do cliente
            </DialogDescription>
          </DialogHeader>

          {currentMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nome</p>
                  <p className="text-sm">{currentMessage.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  {getStatusBadge(currentMessage.status)}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-sm">{currentMessage.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Telefone</p>
                  <p className="text-sm">{currentMessage.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Assunto</p>
                  <p className="text-sm">{currentMessage.subject}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Data de Recebimento</p>
                  <p className="text-sm">
                    {new Date(currentMessage.createdAt).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Mensagem</p>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{currentMessage.message}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Notas Administrativas</p>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Adicione notas sobre esta mensagem..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveNotes} variant="outline" className="flex-1">
                  Salvar Notas
                </Button>
                {currentMessage.status !== 'replied' && (
                  <Button onClick={handleMarkAsReplied} className="flex-1">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Marcar como Respondida
                  </Button>
                )}
                <a href={`mailto:${currentMessage.email}`} className="flex-1">
                  <Button variant="default" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Responder por Email
                  </Button>
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
