# 🚀 Plataforma de Cursos Online - Dashboard Premium

Este projeto implementa um painel administrativo completo para uma plataforma de ensino a distância (EAD), com foco em **Gestão Acadêmica e Financeira**, utilizando uma interface premium em **Dark Mode**.

## 🎯 Objetivo
Desenvolver um sistema *Single Page Application* (SPA) simulado no frontend para centralizar o controle de alunos, matrículas, cursos, trilhas de aprendizado e transações financeiras de uma escola online.

---

## 📂 Estrutura do Projeto

> 📁 PlataformaCursos/
> ├── css/                ← Arquivos de estilização (Dark Mode)
> │   └── style.css
> ├── modules/            ← Controladores JavaScript separados por domínio
> │   ├── assinatura/
> │   ├── aula/
> │   ├── certificado/
> │   ├── curso/
> │   ├── matricula/
> │   ├── modulo/
> │   ├── pagamento/
> │   ├── plano/
> │   ├── trilha/
> │   └── usuario/
> ├── pages/              ← Páginas da interface da plataforma
> │   ├── academico.html
> │   ├── certificados.html
> │   ├── conteudo.html
> │   ├── financeiro.html
> │   ├── trilha.html
> │   └── usuario.html
> ├── index.html          ← Dashboard principal
> └── README.md           ← Este arquivo

---

## ⚙️ Tecnologias Utilizadas

- HTML5
- CSS3 (Custom Dark Theme)
- JavaScript (Vanilla)
- `Bootstrap 5` para layout responsivo e modais
- `Bootstrap Icons` para iconografia visual
- `LocalStorage API` para persistência de dados no navegador

---

## 🧪 Funcionalidades

- **Dashboard Interativo:** Contadores em tempo real e atalhos rápidos de navegação.
- **Gestão de Usuários:** Cadastro de alunos, instrutores e administradores.
- **Acadêmico & Conteúdo:** Estruturação de categorias, cursos, módulos e aulas (vídeo/texto).
- **Trilhas de Aprendizado:** Agrupamento de cursos em formações completas.
- **Módulo Financeiro:** Criação de planos, controle de assinaturas ativas e histórico de logs de pagamentos (com simulação de QR Code Pix).
- **Emissão de Certificados:** Validação de progresso de aulas e geração de códigos únicos de conclusão.

---

## 🧬 Armazenamento de Dados

- **Client-Side Storage:**
  - Todos os dados da aplicação são salvos localmente no navegador do usuário utilizando o `localStorage`.
  - O sistema simula o comportamento de um banco de dados relacional (arquivos JSON), conectando chaves estrangeiras (ex: vinculando o ID do Curso na tabela de Matrículas do Aluno).

---

## 📈 Resultados (Resumo)

- Interface 100% responsiva e padronizada sob uma paleta de cores noturna (*Dark/Indigo*).
- Fluxo completo de CRUD (Criar, Ler, Atualizar, Apagar) operacional em todos os módulos da plataforma.
- Lógica de exclusão e tratamento de dados implementada de forma segura para evitar "dados órfãos".

---

## 📌 Limitações e Próximos Passos

- Dados atrelados à máquina local do usuário (limitação natural do LocalStorage).
- Necessidade futura de implementação de um Backend (Node.js/Python/Java) e Banco de Dados real (SQL/NoSQL) para ambiente de produção.
- Adicionar sistema de autenticação real (Login/Senha com JWT).

---

## 📃 Como Executar

**1. Clone este repositório**
> git clone [https://github.com/seuusuario/nomedorepositorio.git](https://github.com/seuusuario/nomedorepositorio.git)

**2. Acesse a pasta do projeto**
> cd nomedorepositorio

**3. Execute**
Basta abrir o arquivo `index.html` em qualquer navegador web moderno (Chrome, Edge, Firefox, Safari). Não é necessária a instalação de dependências via `npm` ou servidores locais.

*(Dica: Para "zerar" o banco de dados da aplicação em seus testes, limpe o cache de armazenamento do seu navegador inspecionando a página e indo em F12 > Application > Local Storage > Clear).*

---

## 👤 Autor

**Rodrigo** Estudante 

---

## 📝 Licença

Projeto desenvolvido com fins didáticos e acadêmicos.  
Uso livre para estudos e aprimoramento de portfólio.
