import { useState, useEffect } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageUpload } from '@/components/ui/image-upload';
import { Save, Settings as SettingsIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const { siteSettings, updateSiteSetting, getSiteSetting } = useData();
  const [formData, setFormData] = useState({
    company_name: '',
    company_address: '',
    company_phone: '',
    company_email: '',
    company_whatsapp: '',
    facebook_url: '',
    instagram_url: '',
    linkedin_url: '',
    hero_image_1: '',
    hero_image_2: '',
  });

  useEffect(() => {
    setFormData({
      company_name: getSiteSetting('company_name') || '',
      company_address: getSiteSetting('company_address') || '',
      company_phone: getSiteSetting('company_phone') || '',
      company_email: getSiteSetting('company_email') || '',
      company_whatsapp: getSiteSetting('company_whatsapp') || '',
      facebook_url: getSiteSetting('facebook_url') || '',
      instagram_url: getSiteSetting('instagram_url') || '',
      linkedin_url: getSiteSetting('linkedin_url') || '',
      hero_image_1: getSiteSetting('hero_image_1') || '',
      hero_image_2: getSiteSetting('hero_image_2') || '',
    });
  }, [siteSettings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    Object.entries(formData).forEach(([key, value]) => {
      updateSiteSetting(key, value);
    });

    toast.success('Configurações salvas com sucesso!');
  };

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-graphite">Configurações do Site</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie informações gerais, contato e redes sociais
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">Informações Gerais</TabsTrigger>
            <TabsTrigger value="hero">Imagens Hero</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
            <TabsTrigger value="social">Redes Sociais</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Gerais</CardTitle>
                <CardDescription>
                  Informações básicas sobre a empresa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company_name">Nome da Empresa</Label>
                  <Input
                    id="company_name"
                    value={formData.company_name}
                    onChange={(e) => handleChange('company_name', e.target.value)}
                    placeholder="Electro Kafadinha, LDA"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_address">Endereço</Label>
                  <Input
                    id="company_address"
                    value={formData.company_address}
                    onChange={(e) => handleChange('company_address', e.target.value)}
                    placeholder="Luanda, Angola"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Imagens do Hero</CardTitle>
                <CardDescription>
                  Gerencie as imagens do carrossel principal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ImageUpload
                  label="Imagem Hero 1 (Engenheiro Elétrico)"
                  value={formData.hero_image_1}
                  onChange={(value) => handleChange('hero_image_1', value)}
                  id="hero_image_1"
                />

                <ImageUpload
                  label="Imagem Hero 2 (Instalação de Painel)"
                  value={formData.hero_image_2}
                  onChange={(value) => handleChange('hero_image_2', value)}
                  id="hero_image_2"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
                <CardDescription>
                  Telefone, email e WhatsApp da empresa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company_phone">Telefone</Label>
                  <Input
                    id="company_phone"
                    value={formData.company_phone}
                    onChange={(e) => handleChange('company_phone', e.target.value)}
                    placeholder="+244 900 000 000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_email">Email</Label>
                  <Input
                    id="company_email"
                    type="email"
                    value={formData.company_email}
                    onChange={(e) => handleChange('company_email', e.target.value)}
                    placeholder="info@electrokafadinha.ao"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_whatsapp">WhatsApp</Label>
                  <Input
                    id="company_whatsapp"
                    value={formData.company_whatsapp}
                    onChange={(e) => handleChange('company_whatsapp', e.target.value)}
                    placeholder="+244900000000"
                  />
                  <p className="text-xs text-muted-foreground">
                    Formato: código do país + número (sem espaços ou símbolos)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Redes Sociais</CardTitle>
                <CardDescription>
                  URLs das páginas da empresa nas redes sociais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook_url">Facebook</Label>
                  <Input
                    id="facebook_url"
                    value={formData.facebook_url}
                    onChange={(e) => handleChange('facebook_url', e.target.value)}
                    placeholder="https://facebook.com/electrokafadinha"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram_url">Instagram</Label>
                  <Input
                    id="instagram_url"
                    value={formData.instagram_url}
                    onChange={(e) => handleChange('instagram_url', e.target.value)}
                    placeholder="https://instagram.com/electrokafadinha"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin_url">LinkedIn</Label>
                  <Input
                    id="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={(e) => handleChange('linkedin_url', e.target.value)}
                    placeholder="https://linkedin.com/company/electrokafadinha"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </Tabs>
      </form>
    </div>
  );
}
