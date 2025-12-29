import React, { createContext, useContext, useEffect, useState } from 'react';
import { getImage } from '@/lib/images';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  author: string;
  status: 'draft' | 'published';
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'comercial' | 'residencial' | 'industrial';
  description: string;
  details: string;
  year: string;
  location: string;
  imageUrl: string;
  challenges: string[];
  solutions: string[];
  displayOrder: number;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  category: 'comercial' | 'residencial' | 'industrial';
  title: string;
  description: string;
  details: string;
  imageUrl: string;
  features: string[];
  benefits: string[];
  displayOrder: number;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  adminNotes?: string;
  createdAt: string;
  readAt?: string;
}

export interface SiteSetting {
  key: string;
  value: string;
  category: 'contact' | 'social' | 'general';
}

interface DataContextType {
  blogPosts: BlogPost[];
  projects: Project[];
  services: Service[];
  contactMessages: ContactMessage[];
  siteSettings: SiteSetting[];
  
  // Blog methods
  addBlogPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  
  // Project methods
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Service methods
  addService: (service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  
  // Contact methods
  addContactMessage: (message: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => void;
  updateContactMessage: (id: string, message: Partial<ContactMessage>) => void;
  
  // Settings methods
  updateSiteSetting: (key: string, value: string) => void;
  getSiteSetting: (key: string) => string | undefined;
  
  // Image helper
  resolveImage: (imageUrl: string) => string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  BLOG_POSTS: 'ek_blog_posts',
  PROJECTS: 'ek_projects',
  SERVICES: 'ek_services',
  CONTACT_MESSAGES: 'ek_contact_messages',
  SITE_SETTINGS: 'ek_site_settings',
};

// Initial services data with image keys
const initialServices: Service[] = [
  {
    id: '1',
    title: 'Instalação de Transformadores',
    category: 'comercial',
    description: 'Instalação e manutenção de postos de transformação (PTs) para empresas e edifícios comerciais.',
    details: 'Oferecemos serviços completos de instalação, manutenção e monitoramento de postos de transformação para empresas de todos os portes. Nossa equipe especializada garante instalações seguras e eficientes conforme as normas técnicas angolanas.',
    features: ['Transformadores de 100 a 1000 kVA', 'Manutenção preventiva programada', 'Monitoramento 24/7', 'Certificação técnica completa'],
    benefits: ['Redução de custos operacionais', 'Fornecimento estável de energia', 'Atendimento prioritário', 'Garantia estendida'],
    imageUrl: 'services/commercial-transformer',
    displayOrder: 1,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Redes de Distribuição',
    category: 'comercial',
    description: 'Projeto e implementação de redes elétricas privadas para complexos comerciais.',
    details: 'Desenvolvemos e implementamos redes de distribuição elétrica privadas para complexos empresariais, garantindo eficiência e confiabilidade no fornecimento de energia.',
    features: ['Projeto customizado', 'Instalação de cabos subterrâneos', 'Quadros de distribuição', 'Sistema de proteção'],
    benefits: ['Controle total da rede', 'Expansão facilitada', 'Menor custo por kWh', 'Autonomia energética'],
    imageUrl: 'services/commercial-distribution',
    displayOrder: 2,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Gestão de Energia',
    category: 'comercial',
    description: 'Consultoria e soluções para otimização do consumo energético empresarial.',
    details: 'Consultoria especializada em gestão e otimização do consumo de energia, identificando oportunidades de economia e eficiência.',
    features: ['Auditoria energética', 'Análise de consumo', 'Relatórios detalhados', 'Recomendações personalizadas'],
    benefits: ['Economia de até 30%', 'Sustentabilidade', 'ROI em 12-24 meses', 'Certificação ambiental'],
    imageUrl: 'services/commercial-energy-management',
    displayOrder: 3,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Instalações Elétricas',
    category: 'residencial',
    description: 'Instalação completa de sistemas elétricos para residências novas e reformas.',
    details: 'Serviços completos de instalação elétrica residencial, incluindo projeto, execução e certificação. Garantimos segurança e qualidade em todas as etapas.',
    features: ['Projeto elétrico completo', 'Instalação de quadros', 'Cabeamento estruturado', 'Iluminação LED'],
    benefits: ['Segurança certificada', 'Economia de energia', 'Valorização do imóvel', 'Garantia de 2 anos'],
    imageUrl: 'services/residential-electrical',
    displayOrder: 4,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Ligação de Água EPAL',
    category: 'residencial',
    description: 'Como agente autorizado, facilitamos ligações à rede de distribuição de água.',
    details: 'Como agente autorizado EPAL-EP, facilitamos todo o processo de ligação de água potável para sua residência, desde a solicitação até a instalação final.',
    features: ['Processo simplificado', 'Documentação incluída', 'Instalação rápida', 'Suporte técnico'],
    benefits: ['Água de qualidade', 'Sem burocracia', 'Preços transparentes', 'Atendimento personalizado'],
    imageUrl: 'services/residential-water',
    displayOrder: 5,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Manutenção Doméstica',
    category: 'residencial',
    description: 'Serviços de eletricidade, canalização e manutenção geral para sua casa.',
    details: 'Oferecemos pacotes de manutenção preventiva e corretiva para sistemas elétricos e hidráulicos residenciais, garantindo o funcionamento perfeito de sua casa.',
    features: ['Manutenção elétrica', 'Reparos hidráulicos', 'Atendimento emergencial', 'Planos mensais'],
    benefits: ['Tranquilidade', 'Economia a longo prazo', 'Atendimento rápido', 'Preços acessíveis'],
    imageUrl: 'services/residential-maintenance',
    displayOrder: 6,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Sistemas de Alta Tensão',
    category: 'industrial',
    description: 'Instalação e manutenção de infraestrutura elétrica industrial de grande porte.',
    details: 'Soluções completas para instalações industriais de alta tensão, incluindo subestações, transformadores de grande porte e sistemas de distribuição.',
    features: ['Subestações até 33kV', 'Proteção e controle', 'Sistemas SCADA', 'Manutenção especializada'],
    benefits: ['Máxima confiabilidade', 'Redução de paradas', 'Conformidade regulatória', 'Suporte técnico 24/7'],
    imageUrl: 'services/industrial-high-voltage',
    displayOrder: 7,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    title: 'Automação Industrial',
    category: 'industrial',
    description: 'Soluções de automação e controle para processos industriais.',
    details: 'Implementamos sistemas de automação industrial que aumentam a eficiência, reduzem custos operacionais e melhoram a qualidade de produção.',
    features: ['CLPs e inversores', 'Interface HMI', 'Sensoriamento', 'Integração de sistemas'],
    benefits: ['Aumento de produtividade', 'Redução de desperdícios', 'Controle preciso', 'Dados em tempo real'],
    imageUrl: 'services/industrial-automation',
    displayOrder: 8,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    title: 'Energia de Backup',
    category: 'industrial',
    description: 'Sistemas de geração e backup energético para continuidade operacional.',
    details: 'Fornecemos e instalamos sistemas de backup energético, incluindo geradores, UPS e baterias, garantindo a continuidade operacional de sua indústria.',
    features: ['Geradores diesel', 'Sistemas UPS', 'Transferência automática', 'Monitoramento remoto'],
    benefits: ['Zero tempo de inatividade', 'Proteção de equipamentos', 'Produtividade garantida', 'Economia com perdas'],
    imageUrl: 'services/industrial-backup',
    displayOrder: 9,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Initial projects data with image keys
const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Centro Empresarial Talatona',
    category: 'comercial',
    description: 'Instalação completa de infraestrutura elétrica incluindo posto de transformação de 500 kVA.',
    year: '2024',
    location: 'Talatona, Luanda',
    details: 'Projeto complexo que envolveu a instalação de um posto de transformação de 500 kVA, rede de distribuição interna e sistema de backup com gerador. O projeto foi concluído em 6 meses, atendendo a todas as normas de segurança.',
    challenges: ['Instalação em prédio ocupado', 'Prazo reduzido de 6 meses', 'Integração com sistema existente'],
    solutions: ['Trabalho noturno e fins de semana', 'Equipe dedicada de 15 profissionais', 'Planejamento detalhado por fases'],
    imageUrl: 'projects/commercial-talatona',
    displayOrder: 1,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Condomínio Água Viva',
    category: 'residencial',
    description: 'Ligação de água EPAL-EP para 120 residências e instalação de rede elétrica completa.',
    year: '2023',
    location: 'Maiombe, Luanda',
    details: 'Como agente EPAL-EP, realizamos a ligação completa de água potável para 120 residências, além da instalação de toda a rede elétrica do condomínio.',
    challenges: ['Grande número de unidades', 'Coordenação com EPAL-EP', 'Infraestrutura subterrânea'],
    solutions: ['Sistema modular de instalação', 'Comunicação direta com EPAL-EP', 'Uso de tecnologia de perfuração direcional'],
    imageUrl: 'projects/residential-condominium',
    displayOrder: 2,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Fábrica Industrial Luanda Sul',
    category: 'industrial',
    description: 'Sistema de energia backup e manutenção preventiva de alta tensão.',
    year: '2024',
    location: 'Viana, Luanda',
    details: 'Instalação de sistema completo de backup energético com geradores de 1000 kVA e implementação de programa de manutenção preventiva para instalações de alta tensão.',
    challenges: ['Instalações de alta tensão', 'Necessidade de zero downtime', 'Ambientes industriais complexos'],
    solutions: ['Instalação em etapas', 'Geradores temporários durante transição', 'Equipe especializada certificada'],
    imageUrl: 'projects/industrial-factory',
    displayOrder: 3,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Shopping Center Viana',
    category: 'comercial',
    description: 'Projeto de distribuição elétrica e sistema de emergência para centro comercial.',
    year: '2023',
    location: 'Viana, Luanda',
    details: 'Infraestrutura elétrica completa para shopping center incluindo iluminação, climatização, sistema de emergência e backup com geradores.',
    challenges: ['Alta demanda energética', 'Múltiplos pontos de consumo', 'Requisitos de segurança rigorosos'],
    solutions: ['Transformadores de 750 kVA', 'Sistemas redundantes', 'Monitoramento centralizado'],
    imageUrl: 'projects/commercial-shopping',
    displayOrder: 4,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Residencial Benfica',
    category: 'residencial',
    description: 'Reforma e modernização de instalações elétricas e hidráulicas.',
    year: '2024',
    location: 'Benfica, Luanda',
    details: 'Modernização completa das instalações elétricas e hidráulicas de um conjunto residencial de 80 apartamentos.',
    challenges: ['Prédio antigo', 'Residentes ocupando durante obra', 'Infraestrutura obsoleta'],
    solutions: ['Cronograma por blocos', 'Comunicação constante com moradores', 'Mínima interrupção de serviços'],
    imageUrl: 'projects/residential-benfica',
    displayOrder: 5,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Parque Industrial Viana',
    category: 'industrial',
    description: 'Instalação de transformadores e rede elétrica privada de média tensão.',
    year: '2023',
    location: 'Viana, Luanda',
    details: 'Desenvolvimento de rede elétrica privada de média tensão para parque industrial com 15 unidades fabris.',
    challenges: ['Grande extensão territorial', 'Diferentes demandas energéticas', 'Coordenação com múltiplos clientes'],
    solutions: ['Sistema modular escalável', 'Subestações distribuídas', 'Contratos individualizados'],
    imageUrl: 'projects/industrial-park',
    displayOrder: 6,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Initial blog posts data with image keys
const initialBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'novas-tecnologias-distribuicao-eletrica',
    title: 'Novas tecnologias em distribuição elétrica',
    excerpt: 'Descubra como as tecnologias smart grid estão revolucionando a distribuição de energia em Angola.',
    content: `<h2>A Revolução das Smart Grids em Angola</h2>
<p>As tecnologias de rede inteligente (smart grid) estão transformando a maneira como distribuímos e gerenciamos energia elétrica em Angola. Essas inovações permitem um controle mais preciso, eficiente e sustentável do sistema elétrico.</p>

<h3>Principais Benefícios</h3>
<ul>
  <li><strong>Monitoramento em Tempo Real:</strong> Permite identificar e resolver problemas rapidamente, reduzindo o tempo de inatividade.</li>
  <li><strong>Eficiência Energética:</strong> Otimiza o consumo de energia, reduzindo desperdícios e custos operacionais.</li>
  <li><strong>Integração de Renováveis:</strong> Facilita a incorporação de fontes de energia solar e eólica à rede.</li>
  <li><strong>Manutenção Preditiva:</strong> Antecipa falhas antes que ocorram, aumentando a confiabilidade do sistema.</li>
</ul>

<h3>Implementação na Electro Kafadinha</h3>
<p>A Electro Kafadinha está na vanguarda dessa transformação, implementando sensores inteligentes e sistemas de gestão avançados em nossas redes privadas.</p>`,
    imageUrl: 'blog/technology',
    category: 'Inovação',
    author: 'Equipe Técnica',
    status: 'published',
    publishedAt: '2024-01-15',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    slug: 'parceria-epal-expansao-servicos',
    title: 'Parceria EPAL: Expansão de serviços',
    excerpt: 'A Electro Kafadinha amplia sua atuação como agente autorizado EPAL-EP em novas regiões.',
    content: `<h2>Expandindo o Acesso à Água em Angola</h2>
<p>Como agente autorizado da EPAL-EP (Empresa Pública de Água), a Electro Kafadinha está orgulhosa de anunciar a expansão de nossos serviços de distribuição de água para novas regiões de Luanda.</p>

<h3>Novas Áreas de Cobertura</h3>
<ul>
  <li>Região de Viana Sul</li>
  <li>Bairro do Maiombe (expansão)</li>
  <li>Áreas industriais de Cacuaco</li>
  <li>Novos condomínios em Talatona</li>
</ul>

<h3>Benefícios para a Comunidade</h3>
<p>Esta expansão significa acesso mais rápido e confiável à água potável para milhares de famílias e empresas.</p>`,
    imageUrl: 'blog/partnership',
    category: 'Água',
    author: 'Direção Comercial',
    status: 'published',
    publishedAt: '2024-01-10',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    slug: 'importancia-manutencao-preventiva',
    title: 'Importância da manutenção preventiva',
    excerpt: 'Entenda por que a manutenção preventiva é essencial para evitar falhas elétricas em sua empresa.',
    content: `<h2>Por Que a Manutenção Preventiva é Crucial?</h2>
<p>A manutenção preventiva é a chave para garantir a continuidade operacional e a segurança de sua instalação elétrica.</p>

<h3>Principais Benefícios</h3>
<ul>
  <li><strong>Redução de Custos:</strong> Pequenos ajustes regulares custam muito menos do que reparos de emergência.</li>
  <li><strong>Segurança:</strong> Identifica e corrige riscos antes que causem acidentes.</li>
  <li><strong>Eficiência:</strong> Mantém o sistema operando em máxima eficiência.</li>
  <li><strong>Longevidade:</strong> Prolonga a vida útil dos equipamentos elétricos.</li>
</ul>

<h3>O Que Inclui Nossa Manutenção Preventiva?</h3>
<p>Na Electro Kafadinha, nossos planos de manutenção preventiva incluem inspeção termográfica, teste de disjuntores, verificação de aterramentos e mais.</p>`,
    imageUrl: 'blog/maintenance',
    category: 'Manutenção',
    author: 'Eng. Especializado',
    status: 'published',
    publishedAt: '2024-01-05',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    slug: 'energia-renovavel-angola',
    title: 'Energia renovável em Angola',
    excerpt: 'O futuro da energia sustentável e como sua empresa pode se beneficiar dessas soluções.',
    content: `<h2>O Futuro é Renovável</h2>
<p>Angola está caminhando para um futuro mais sustentável, e a energia renovável desempenha um papel fundamental nessa transição.</p>

<h3>Energia Solar em Angola</h3>
<p>Com uma média de 300 dias ensolarados por ano, Angola tem um potencial enorme para energia solar.</p>

<h3>Benefícios</h3>
<ul>
  <li>Redução de até 70% na conta de energia</li>
  <li>Independência energética</li>
  <li>Retorno do investimento em 5-7 anos</li>
  <li>Contribuição para um planeta mais limpo</li>
</ul>`,
    imageUrl: 'blog/technology',
    category: 'Sustentabilidade',
    author: 'Equipe Técnica',
    status: 'published',
    publishedAt: '2023-12-28',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    slug: 'normas-seguranca-eletrica',
    title: 'Normas de segurança elétrica',
    excerpt: 'Conheça as principais normas de segurança que devem ser seguidas em instalações elétricas.',
    content: `<h2>Segurança em Primeiro Lugar</h2>
<p>A segurança elétrica não é apenas uma questão de conformidade legal - é uma questão de proteger vidas e propriedades.</p>

<h3>Requisitos Essenciais</h3>
<ul>
  <li>Sistema de aterramento adequado</li>
  <li>Dispositivos de proteção contra sobrecorrente</li>
  <li>Proteção contra choques elétricos (DR)</li>
  <li>Proteção contra descargas atmosféricas</li>
  <li>Sinalização de segurança apropriada</li>
</ul>`,
    imageUrl: 'blog/partnership',
    category: 'Segurança',
    author: 'Dept. Segurança',
    status: 'published',
    publishedAt: '2023-12-20',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    slug: 'como-economizar-energia-eletrica',
    title: 'Como economizar energia elétrica',
    excerpt: 'Dicas práticas para reduzir o consumo de energia em sua residência ou empresa.',
    content: `<h2>Economize Energia, Economize Dinheiro</h2>
<p>Reduzir o consumo de energia não só ajuda o meio ambiente, mas também diminui suas contas mensais.</p>

<h3>Iluminação Eficiente</h3>
<ul>
  <li>Substitua lâmpadas incandescentes por LED</li>
  <li>Use sensores de presença em áreas de circulação</li>
  <li>Aproveite ao máximo a luz natural</li>
</ul>

<h3>Climatização Inteligente</h3>
<ul>
  <li>Mantenha ar condicionado em 24°C</li>
  <li>Limpe filtros regularmente</li>
  <li>Isole adequadamente portas e janelas</li>
</ul>`,
    imageUrl: 'blog/maintenance',
    category: 'Dicas',
    author: 'Consultoria',
    status: 'published',
    publishedAt: '2023-12-15',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSetting[]>([]);

  // Resolve image URL from key or return as-is if already a URL
  const resolveImage = (imageUrl: string): string => {
    return getImage(imageUrl);
  };

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const storedBlogPosts = localStorage.getItem(STORAGE_KEYS.BLOG_POSTS);
        const storedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
        const storedServices = localStorage.getItem(STORAGE_KEYS.SERVICES);
        const storedMessages = localStorage.getItem(STORAGE_KEYS.CONTACT_MESSAGES);
        const storedSettings = localStorage.getItem(STORAGE_KEYS.SITE_SETTINGS);

        if (storedBlogPosts) {
          setBlogPosts(JSON.parse(storedBlogPosts));
        } else {
          setBlogPosts(initialBlogPosts);
          localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(initialBlogPosts));
        }
        
        if (storedProjects) {
          setProjects(JSON.parse(storedProjects));
        } else {
          setProjects(initialProjects);
          localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
        }
        
        if (storedServices) {
          setServices(JSON.parse(storedServices));
        } else {
          setServices(initialServices);
          localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(initialServices));
        }
        
        if (storedMessages) setContactMessages(JSON.parse(storedMessages));
        if (storedSettings) {
          setSiteSettings(JSON.parse(storedSettings));
        } else {
          const defaultSettings: SiteSetting[] = [
            { key: 'company_name', value: 'Electro Kafadinha, LDA', category: 'general' },
            { key: 'company_address', value: 'Luanda, Angola', category: 'contact' },
            { key: 'company_phone', value: '+244 900 000 000', category: 'contact' },
            { key: 'company_email', value: 'info@electrokafadinha.ao', category: 'contact' },
            { key: 'company_whatsapp', value: '+244900000000', category: 'contact' },
            { key: 'facebook_url', value: 'https://facebook.com/electrokafadinha', category: 'social' },
            { key: 'instagram_url', value: 'https://instagram.com/electrokafadinha', category: 'social' },
            { key: 'linkedin_url', value: 'https://linkedin.com/company/electrokafadinha', category: 'social' },
          ];
          setSiteSettings(defaultSettings);
          localStorage.setItem(STORAGE_KEYS.SITE_SETTINGS, JSON.stringify(defaultSettings));
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    };

    loadData();
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (blogPosts.length > 0) {
      localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(blogPosts));
    }
  }, [blogPosts]);

  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    }
  }, [projects]);

  useEffect(() => {
    if (services.length > 0) {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    }
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SITE_SETTINGS, JSON.stringify(siteSettings));
  }, [siteSettings]);

  // Blog methods
  const addBlogPost = (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setBlogPosts(prev => [newPost, ...prev]);
  };

  const updateBlogPost = (id: string, post: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(p => 
      p.id === id ? { ...p, ...post, updatedAt: new Date().toISOString() } : p
    ));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(p => p.id !== id));
  };

  // Project methods
  const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (id: string, project: Partial<Project>) => {
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, ...project, updatedAt: new Date().toISOString() } : p
    ));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Service methods
  const addService = (service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newService: Service = {
      ...service,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setServices(prev => [...prev, newService].sort((a, b) => a.displayOrder - b.displayOrder));
  };

  const updateService = (id: string, service: Partial<Service>) => {
    setServices(prev => prev.map(s => 
      s.id === id ? { ...s, ...service, updatedAt: new Date().toISOString() } : s
    ).sort((a, b) => a.displayOrder - b.displayOrder));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Contact methods
  const addContactMessage = (message: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const newMessage: ContactMessage = {
      ...message,
      id: Date.now().toString(),
      status: 'unread',
      createdAt: new Date().toISOString(),
    };
    setContactMessages(prev => [newMessage, ...prev]);
  };

  const updateContactMessage = (id: string, message: Partial<ContactMessage>) => {
    setContactMessages(prev => prev.map(m => 
      m.id === id ? { ...m, ...message } : m
    ));
  };

  // Settings methods
  const updateSiteSetting = (key: string, value: string) => {
    setSiteSettings(prev => prev.map(s => 
      s.key === key ? { ...s, value } : s
    ));
  };

  const getSiteSetting = (key: string) => {
    return siteSettings.find(s => s.key === key)?.value;
  };

  const value = {
    blogPosts,
    projects,
    services,
    contactMessages,
    siteSettings,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    addProject,
    updateProject,
    deleteProject,
    addService,
    updateService,
    deleteService,
    addContactMessage,
    updateContactMessage,
    updateSiteSetting,
    getSiteSetting,
    resolveImage,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
