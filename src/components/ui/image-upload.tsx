import { useState, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Link2, X } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

export function ImageUpload({ label, value, onChange, id }: ImageUploadProps) {
  const [urlInput, setUrlInput] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Verificar tamanho (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Imagem muito grande. Tamanho máximo: 2MB');
      return;
    }

    // Verificar tipo
    if (!file.type.startsWith('image/')) {
      toast.error('Arquivo inválido. Selecione uma imagem.');
      return;
    }

    // Converter para base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      onChange(base64String);
      toast.success('Imagem carregada com sucesso!');
    };
    reader.onerror = () => {
      toast.error('Erro ao carregar imagem');
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      toast.error('Insira uma URL válida');
      return;
    }
    onChange(urlInput);
    toast.success('URL da imagem salva!');
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <Label htmlFor={id}>{label}</Label>
      
      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="url">
            <Link2 className="w-4 h-4 mr-2" />
            URL
          </TabsTrigger>
          <TabsTrigger value="upload">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              className="flex-1"
            />
            <Button type="button" onClick={handleUrlSubmit} variant="secondary">
              Aplicar
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-3">
          <div className="flex gap-2">
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="flex-1"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Formatos: JPG, PNG, WEBP. Tamanho máximo: 2MB
          </p>
        </TabsContent>
      </Tabs>

      {value && (
        <div className="relative border rounded-lg overflow-hidden">
          <img 
            src={value} 
            alt="Preview" 
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleClear}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
