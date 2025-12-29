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

export default function ServiceEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { services, addService, updateService } = useData();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    category: 'comercial' as 'comercial' | 'residencial' | 'industrial',
    description: '',
    details: '',
    imageUrl: '',
    displayOrder: 0,
    status: 'published' as 'draft' | 'published',
  });

  const [features, setFeatures] = useState<string[]>(['']);
  const [benefits, setBenefits] = useState<string[]>(['']);

  useEffect(() => {
    if (isEditing) {
      const service = services.find(s => s.id === id);
      if (service) {
        setFormData({
          title: service.title,
          category: service.category,
          description: service.description,
          details: service.details,
          imageUrl: service.imageUrl,
          displayOrder: service.displayOrder,
          status: service.status,
        });
        setFeatures(service.features.length > 0 ? service.features : ['']);
        setBenefits(service.benefits.length > 0 ? service.benefits : ['']);
      }
    }
  }, [id, services, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.details) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const serviceData = {
      ...formData,
      features: features.filter(f => f.trim() !== ''),
      benefits: benefits.filter(b => b.trim() !== ''),
    };

    if (isEditing) {
      updateService(id, serviceData);
      toast.success('Serviço atualizado com sucesso!');
    } else {
      addService(serviceData);
      toast.success('Serviço criado com sucesso!');
    }

    navigate('/admin/services');
  };

  const addFeature = () => setFeatures([...features, '']);
  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };
  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addBenefit = () => setBenefits([...benefits, '']);
  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };
  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/admin/services')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {isEditing ? 'Editar Serviço' : 'Novo Serviço'}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? 'Atualize as informações do serviço' : 'Adicione um novo serviço ao catálogo'}
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
                  placeholder="Nome do serviço"
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

            <ImageUpload
              label="Imagem do Serviço"
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
                placeholder="Breve descrição do serviço (1-2 linhas)"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Detalhes Completos *</Label>
              <Textarea
                id="details"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="Descrição detalhada do serviço, o que está incluído, como funciona..."
                rows={5}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Características</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="Descreva uma característica do serviço"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFeature(index)}
                  disabled={features.length === 1}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addFeature}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Característica
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Benefícios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={benefit}
                  onChange={(e) => updateBenefit(index, e.target.value)}
                  placeholder="Descreva um benefício do serviço"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeBenefit(index)}
                  disabled={benefits.length === 1}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addBenefit}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Benefício
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
            {isEditing ? 'Atualizar Serviço' : 'Criar Serviço'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/admin/services')}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
