# Pesquisa Porto de Santos - Landing Page de Alta Performance

Uma landing page otimizada para conversão, moderna e altamente envolvente, focada em uma pesquisa sobre profissões no Porto de Santos para adolescentes de 13 a 17 anos.

## 🚀 Características da Landing Page

- **Design Moderno**: Interface vibrante e dinâmica com gradientes e microinterações
- **Mobile-First**: Otimizada para dispositivos móveis com experiência fluida
- **Alta Performance**: Core Web Vitals otimizados, carregamento rápido
- **Acessibilidade**: WCAG AA compliant, navegação por teclado
- **SEO Otimizado**: Meta tags, schema markup, Open Graph
- **Conversão Focada**: CTAs estratégicos, barra de progresso, FAQ
- **Animações Suaves**: AOS (Animate On Scroll), contadores animados
- **LGPD Compliant**: Política de privacidade, termos de uso

## 📁 Estrutura do Projeto

```
IBISocial/
├── landing.html        # Landing page principal
├── index.html          # Questionário interativo
├── privacy-policy.html # Política de privacidade
├── terms.html          # Termos de uso
├── css/
│   ├── landing.css     # Estilos da landing page
│   └── style.css       # Estilos do questionário
├── js/
│   ├── landing.js      # JavaScript da landing page
│   └── main.js         # JavaScript do questionário
├── assets/             # Recursos estáticos
│   ├── logo.svg        # Logo principal
│   └── logo-white.svg  # Logo para footer
├── images/             # Imagens do projeto
├── src/                # Código fonte adicional
├── package.json        # Configurações do projeto
└── README.md          # Documentação
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica com landmarks e ARIA
- **CSS3**: Variáveis CSS, Grid, Flexbox, animações
- **JavaScript (ES6+)**: Intersection Observer, performance otimizada
- **AOS**: Animate On Scroll library
- **Font Awesome**: Ícones modernos
- **Google Fonts**: Inter font family
- **Responsive Design**: Mobile-first, breakpoints adaptativos

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/username/ibisocial.git
cd ibisocial
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm start
```

Ou para desenvolvimento com live-reload:
```bash
npm run dev
```

4. Abra o navegador em `http://localhost:3000/landing.html`

## 📱 Funcionalidades da Landing Page

### Seções Principais
- **Hero**: Vídeo de fundo, CTA principal, scroll indicator
- **Why Matters**: Benefícios da participação com cards animados
- **What to Expect**: Expectativas da pesquisa com ícones
- **Porto Facts**: Contadores animados com dados do porto
- **Final CTA**: Chamada final para ação
- **FAQ**: Accordion interativo
- **Survey**: Questionário embarcado com barra de progresso

### Performance
- Lazy loading de imagens e vídeos
- Preload de recursos críticos
- Otimização de animações
- Service Worker para cache
- Core Web Vitals otimizados

### Acessibilidade
- Navegação por teclado
- ARIA labels e landmarks
- Contraste adequado (WCAG AA)
- Skip links
- Suporte a screen readers

### SEO
- Meta tags otimizadas
- Open Graph e Twitter Cards
- Schema.org markup
- URLs semânticas
- Sitemap ready

## 🎨 Personalização

### Cores
As cores principais podem ser alteradas no arquivo `css/style.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #ffd700;
  --text-color: #333;
  --bg-color: #f8f9fa;
}
```

### Tipografia
A fonte pode ser alterada na propriedade `font-family` do body:

```css
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

## 📋 Scripts Disponíveis

- `npm start`: Inicia servidor HTTP na porta 3000
- `npm run dev`: Inicia servidor com live-reload
- `npm run build`: Processo de build (configurável)
- `npm test`: Executa testes (configurável)

## 🔧 Configuração de Desenvolvimento

### Estrutura de Arquivos
- `index.html`: Página principal com todas as seções
- `css/style.css`: Estilos globais e responsivos
- `js/main.js`: JavaScript principal com todas as funcionalidades

### Adicionando Novas Seções
1. Adicione a estrutura HTML em `index.html`
2. Adicione os estilos em `css/style.css`
3. Adicione funcionalidades JavaScript em `js/main.js`

## 📞 Suporte

Para dúvidas, sugestões ou problemas:

- **Email**: contato@ibisocial.com
- **Telefone**: +55 (11) 99999-9999
- **GitHub Issues**: [Criar issue](https://github.com/username/ibisocial/issues)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📈 Roadmap

- [ ] Sistema de autenticação
- [ ] Chat em tempo real com WebSocket
- [ ] Upload de imagens
- [ ] Sistema de notificações push
- [ ] PWA (Progressive Web App)
- [ ] Integração com redes sociais
- [ ] Sistema de moderação
- [ ] Analytics avançado

## 🙏 Agradecimentos

- Font Awesome pelos ícones
- Comunidade open source pelas inspirações
- Todos os contribuidores do projeto

---

**IBISocial** - Conectando pessoas através da tecnologia 🚀

