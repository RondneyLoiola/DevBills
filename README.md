# 💰 DevBills

Sistema completo de gestão financeira desenvolvido para ajudar desenvolvedores a controlar suas despesas, receitas e manter a saúde financeira em dia.

## 📋 Sobre o Projeto

DevBills é uma aplicação Full Stack que permite gerenciar suas finanças pessoais de forma simples e eficiente. Com uma interface moderna e intuitiva, você pode:

- ✅ Registrar receitas e despesas
- 📊 Visualizar relatórios financeiros
- 🏷️ Categorizar transações
- 📈 Acompanhar seu saldo em tempo real
- 🔍 Filtrar e buscar transações por período

## 🚀 Tecnologias Utilizadas

### Frontend
- **React** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Estilização de componentes
- **Axios** - Cliente HTTP para requisições
- **React Hook Form** - Gerenciamento de formulários
- **React Router** - Navegação entre páginas

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Fastify** - Framework web para Node.js
- **TypeScript** - Tipagem estática
- **MongoDB** - Banco de dados NoSQL
- **Zod** - Validação de dados

## 📦 Instalação

### Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local ou Atlas)

### Clonando o Repositório

```bash
git clone https://github.com/RondneyLoiola/DevBills.git
cd DevBills
```

### Configurando o Backend

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz da pasta backend:
```env
PORT=3000
MONGODB_URI=sua_url_do_mongodb
NODE_ENV=development
```

4. Inicie o servidor:
```bash
npm run dev
```

O backend estará rodando em `http://localhost:3000`

### Configurando o Frontend

1. Abra um novo terminal e navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz da pasta frontend:
```env
VITE_API_URL=http://localhost:3000
```

4. Inicie a aplicação:
```bash
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## 🎯 Como Usar

1. **Cadastrar Transação**: Clique no botão "Nova Transação" e preencha os dados
2. **Visualizar Dashboard**: Acompanhe o resumo financeiro na página inicial
3. **Filtrar por Período**: Use os filtros para visualizar transações específicas
4. **Categorias**: Organize suas transações em categorias personalizadas
5. **Relatórios**: Visualize gráficos e relatórios detalhados

## 📁 Estrutura do Projeto

```
DevBills/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── styles/
    │   ├── types/
    │   └── App.tsx
    ├── package.json
    └── vite.config.ts
```

## 🛠️ Scripts Disponíveis

### Backend
```bash
npm run dev/yarn dev      # Inicia o servidor em modo de desenvolvimento
npm run build/yarn build    # Compila o TypeScript
npm start/yarn dev        # Inicia o servidor em produção
```

### Frontend
```bash
npm run dev/yarn dev      # Inicia o app em modo de desenvolvimento
npm run build/ yarn build    # Cria build de produção
npm run preview/ yarn dev  # Visualiza o build de produção
```

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Se você quer contribuir com o projeto:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Rondney Loiola**

- GitHub: [@RondneyLoiola](https://github.com/RondneyLoiola)
- LinkedIn: https://www.linkedin.com/in/rondneyloiola/

## 📞 Suporte

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma [issue](https://github.com/RondneyLoiola/DevBills/issues).

---

⭐️ Se este projeto te ajudou, deixe uma estrela no repositório!
