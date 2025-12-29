import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

export default function ProjectEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { projects, addProject, updateProject } = useData();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    category: 'comercial' as 'comercial' | 'residencial' | 'industrial',
    description: '',
    details: '',
    year: new Date().getFullYear().toString(),
    location: '',
    imageUrl: '',
    displayOrder: 0,
    status: 'published' as 'draft' | 'published',
  });

  const [challenges, setChallenges] = useState<string[]>(['']);
  const [solutions, setSolutions] = useState<string[]>(['']);

  useEffect(() => {
    if (isEditing) {
      const project = projects.find(p => p.id === id);
      if (project) {
        setFormData({
          title: project.title,
          category: project.category,
          description: project.description,
          details: project.details,
          year: project.year,
          location: project.location,
          imageUrl: project.imageUrl,
          displayOrder: project.displayOrder,
          status: project.status,
        });
        setChallenges(project.challenges.length > 0 ? project.challenges : ['']);
        setSolutions(project.solutions.length > 0 ? project.solutions : ['']);
      }
    }
  }, [id, projects, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.location) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const projectData = {
      ...formData,
      challenges: challenges.filter(c => c.trim() !== ''),
      solutions: solutions.filter(s => s.trim() !== ''),
    };

    if (isEditing) {
      updateProject(id, projectData);
      toast.success('Projeto atualizado com sucesso!');
    } else {
      addProject(projectData);
      toast.success('Projeto criado com sucesso!');
    }

    navigate('/admin/projects');
  };

  const addChallenge = () => setChallenges([...challenges, '']);
  const removeChallenge = (index: number) => {
    setChallenges(challenges.filter((_, i) => i !== index));
  };
  const updateChallenge = (index: number, value: string) => {
    const newChallenges = [...challenges];
    newChallenges[index] = value;
    setChallenges(newChallenges);
  };

  const addSolution = () => setSolutions([...solutions, '']);
  const removeSolution = (index: number) => {
    setSolutions(solutions.filter((_, i) => i !== index));
  };
  const updateSolution = (index: number, value: string) => {
    const newSolutions = [...solutions];
    newSolutions[index] = value;
    setSolutions(newSolutions);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/admin/projects')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {isEditing ? 'Editar Projeto' : 'Novo Projeto'}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? 'Atualize as informações do projeto' : 'Adicione um novo projeto ao portfólio'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Nome do projeto"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: any) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comercial">Comercial</SelectItem>
                    <SelectItem value="residencial">Residencial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Localização *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ex: Talatona, Luanda"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Ano *</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2024"
                  required
                />
              </div>
            </div>

            <ImageUpload
              label="Imagem do Projeto"
              value={formData.imageUrl}
              onChange={(value) => setFormData({ ...formData, imageUrl: value })}
              id="imageUrl"
            />

            <div className="space-y-2">
              <Label htmlFor="displayOrder">Ordem de Exibição</Label>
              <Input
                id="displayOrder"
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição Curta *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Breve descrição do projeto (1-2 linhas)"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Detalhes Completos</Label>
              <Textarea
                id="details"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="Descrição detalhada do projeto, escopo, tecnologias utilizadas..."
                rows={5}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Desafios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {challenges.map((challenge, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={challenge}
                  onChange={(e) => updateChallenge(index, e.target.value)}
                  placeholder="Descreva um desafio enfrentado"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeChallenge(index)}
                  disabled={challenges.length === 1}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addChallenge}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Desafio
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Soluções</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {solutions.map((solution, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={solution}
                  onChange={(e) => updateSolution(index, e.target.value)}
                  placeholder="Descreva uma solução implementada"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSolution(index)}
                  disabled={solutions.length === 1}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addSolution}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Solução
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publicação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Rascunho</SelectItem>
                  <SelectItem value="published">Publicado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? 'Atualizar Projeto' : 'Criar Projeto'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/admin/projects')}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
