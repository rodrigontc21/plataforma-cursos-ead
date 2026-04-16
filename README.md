# 🎓 Plataforma de Cursos Online - LAB03

Este projeto implementa uma **Plataforma de Cursos EAD** completa no frontend, com foco em **gestão acadêmica, financeira e de conteúdo**, utilizando uma interface premium em **Dark Mode** e arquitetura em camadas com **JavaScript ES6+**.

## 🎯 Objetivo
Desenvolver uma aplicação de plataforma de ensino a distância utilizando **JavaScript moderno (ES6+)**, aplicando o padrão de responsabilidade única através de uma estrutura de módulos organizada (Model + Controller) e persistência de dados local com `localStorage`, simulando um sistema de gestão acadêmica completo com 14 entidades.

---

## 📂 Estrutura do Projeto

```text
📁 Plataforma_de_Cursos/
├── css/
│   └── style.css                    ← Tema Dark Mode personalizado
├── js/
│   └── utils.js                     ← Funções utilitárias compartilhadas
├── modules/
│   ├── usuario/                     ← Entidade Usuário (aluno/instrutor)
│   ├── categoria/                   ← Entidade Categoria
│   ├── curso/                       ← Entidade Curso
│   ├── modulo/                      ← Entidade Módulo
│   ├── aula/                        ← Entidade Aula
│   ├── matricula/                   ← Entidade Matrícula
│   ├── progressoAula/               ← Entidade Progresso de Aula
│   ├── avaliacao/                   ← Entidade Avaliação
│   ├── trilha/                      ← Entidade Trilha de Aprendizado
│   ├── trilhaCurso/                 ← Tabela associativa Trilha ↔ Curso
│   ├── certificado/                 ← Entidade Certificado
│   ├── plano/                       ← Entidade Plano de Assinatura
│   ├── assinatura/                  ← Entidade Assinatura
│   └── pagamento/                   ← Entidade Pagamento
├── pages/
│   ├── usuario.html                 ← Gestão de usuários e matrículas
│   ├── academico.html               ← Categorias e cursos
│   ├── conteudo.html                ← Módulos e aulas
│   ├── trilha.html                  ← Trilhas de aprendizado
│   ├── certificados.html            ← Emissão de certificados
│   └── financeiro.html              ← Planos, assinaturas e pagamentos
├── index.html                       ← Dashboard principal
├── package.json                     ← Configuração do projeto
└── README.md                        ← Este arquivo
```

---

## ⚙️ Tecnologias Utilizadas

- HTML5
- CSS3 (Custom Dark Theme com CSS Variables)
- JavaScript ES6+ (Classes, Arrow Functions, Template Literals)
- `Bootstrap 5.3` para layout responsivo
- `Bootstrap Icons 1.11` para ícones dinâmicos
- `Lucide Icons` para ícones da interface
- `LocalStorage API` para persistência de dados no navegador

---

## 🧪 Funcionalidades

### 👤 Usuários
- **Cadastrar Usuário:** Registro com nome, e-mail, senha e perfil (Aluno ou Instrutor).
- **Listar Usuários:** Tabela com badge de perfil por tipo.
- **Remover Usuário:** Exclusão de registro por ID.
- **Validações:** E-mail único, formato de e-mail, senha mínima de 4 caracteres.

### 🎓 Acadêmico
- **Categorias:** CRUD completo com validação de nome único.
- **Cursos:** Cadastro vinculando instrutor e categoria, com nível e carga horária.

### 📚 Conteúdo
- **Módulos:** Organização hierárquica por curso com ordenação.
- **Aulas:** Cadastro por módulo com tipo (Vídeo, Texto ou Quiz), URL e duração.

### 🗺️ Trilhas
- **Trilhas de Aprendizado:** Agrupamento de cursos com ordenação personalizada.

### 🏆 Certificados
- **Emissão Automática:** Gerado após conclusão de 100% das aulas do curso.
- **Código de Verificação:** Código único `CERT-XXXXXXXX` gerado automaticamente.

### 💳 Financeiro
- **Planos:** CRUD de planos de assinatura com preço e duração.
- **Assinaturas:** Simulador de assinatura por usuário com controle de vigência.
- **Pagamentos:** Registro com método (PIX, Cartão ou Boleto) e ID de transação.

---

## 🧬 Armazenamento de Dados

- **Client-Side Storage:**
  - Todos os dados são salvos localmente no navegador utilizando o `localStorage`.
  - Cada entidade possui sua própria chave no padrão `plataforma_<entidade>`.
  - Os Controllers centralizam toda lógica de leitura, escrita e exclusão.
  - Dados persistem entre sessões e navegações entre páginas.

---

## 📈 Resultados (Resumo)

- Interface 100% responsiva com paleta de cores noturna (*Dark Mode*).
- 14 entidades implementadas com relacionamentos e validações completas.
- Fluxo completo de operações (Adicionar, Listar, Remover) em todos os módulos.
- Regras de negócio aplicadas: bloqueio de matrículas duplicadas, certificado só após conclusão total, assinatura necessária para matrícula.

---

## 📌 Limitações e Próximos Passos

- Dados atrelados à máquina local do usuário (limitação natural do LocalStorage).
- Necessidade futura de implementação de um Backend e Banco de Dados real para ambiente de produção.
- Possibilidade de adicionar sistema de autenticação com login/logout.
- Expansão para suporte a múltiplos idiomas.

---

## 📃 Como Executar

**1. Clone este repositório**
> git clone https://github.com/rodrigontc21/plataforma-cursos-ead.git

**2. Acesse a pasta do projeto**
> cd plataforma-cursos-ead

**3. Execute com uma das opções abaixo**

| Opção | Ferramenta | Comando |
|-------|-----------|---------|
| 1 (recomendado) | VS Code + Live Server | Botão direito → Open with Live Server |
| 2 | npx live-server | `npx live-server --port=5500` |
| 3 | npx serve | `npx serve .` |

Acesse `http://localhost:5500` no navegador.

*(Dica: Para inspecionar os dados salvos, pressione F12 → Application → Local Storage.)*

---

## 👤 Autor

**Rodrigo Vieira** — Estudante

---

## 📝 Licença

Projeto desenvolvido com fins didáticos e acadêmicos.  
Uso livre para estudos e aprimoramento de portfólio.
