# 🗓️ Tarefa 3 - Gerenciador de Tarefas (TodoManager)

## 🎯 Objetivo

Implementar um sistema simples de gerenciamento de tarefas com funcionalidades básicas de CRUD e filtragem.

---

## 📝 Descrição do Problema

Você deve criar um sistema para gerenciar tarefas, permitindo criar, listar, atualizar, remover e filtrar tarefas. Cada tarefa terá um status e uma prioridade.

### **Funcionalidades:**

1.  **Criar tarefas** com título, descrição e prioridade
2.  **Listar tarefas** existentes
3.  **Atualizar tarefas** (título, descrição, prioridade)
4.  **Remover tarefas** por ID
5.  **Alterar status** das tarefas (TODO → IN_PROGRESS → DONE)
6.  **Filtrar tarefas** por status e prioridade
7.  **Buscar tarefas** por título
8.  **Contar tarefas** por status

### **Estrutura de Dados:**

**Status possíveis:**

- `'todo'` - Tarefa pendente
- `'in_progress'` - Tarefa em andamento
- `'done'` - Tarefa concluída

**Prioridades possíveis:**

- `'low'` - Prioridade baixa
- `'medium'` - Prioridade média
- `'high'` - Prioridade alta

**Estrutura da tarefa:**

```javascript
Task = {
  id: 1,
  code: "PROJ-123", // Código único estilo Jira
  title: "Implementar login",
  description: "Criar sistema de autenticação",
  status: "todo",
  priority: "high",
  createdAt: Date,
  updatedAt: Date,
  completedAt: null,
};
```

### **Sistema de Códigos (Estilo Jira):**

- **Formato**: `PROJ-123`, `TASK-456`, `FEAT-789`
- **Geração automática**: Cada tarefa recebe um código único
- **Busca por código**: Pode encontrar tarefa pelo código
- **Contadores**: Mantém contador por projeto

---

## ✅ Requisitos obrigatórios

### 1. **Gerenciamento de Tarefas**

- **Criar tarefas** com título, descrição e prioridade
- **Cada tarefa deve ter** um ID único e um código único (estilo Jira)
- **Cada tarefa deve ter** status inicial como 'todo'
- **Cada tarefa deve ter** timestamps de criação e atualização
- **Atualizar tarefas** existentes (título, descrição, prioridade)
- **Remover tarefas** por ID
- **Listar todas as tarefas** existentes

### 2. **Controle de Status**

- **Mudar status** das tarefas entre 'todo', 'in_progress' e 'done'
- **Registrar data de conclusão** quando status for 'done'
- **Atualizar timestamp** sempre que tarefa for modificada

### 3. **Sistema de Códigos Únicos**

- **Gerar códigos automáticos** no formato PROJ-123, TASK-456, etc.
- **Suportar múltiplos projetos** com códigos únicos por projeto
- **Buscar tarefas por código** (ex: encontrar tarefa pelo código PROJ-123)

### 4. **Filtros e Busca**

- **Filtrar tarefas por status** (mostrar apenas 'todo', 'in_progress' ou 'done')
- **Filtrar tarefas por prioridade** (mostrar apenas 'low', 'medium' ou 'high')
- **Buscar tarefas por título** (busca parcial no título)
- **Contar tarefas por status** (quantas tarefas em cada status)

### 5. **Validação e Tratamento de Erros**

- **Validar dados de entrada** antes de criar/atualizar tarefas
- **Tratar operações em tarefas inexistentes** (IDs inválidos)
- **Validar status** antes de mudanças (apenas status válidos)
- **Retornar erros apropriados** para operações inválidas

---

## 🧩 Estrutura esperada

O código deve ser implementado no arquivo:

```
tarefa3-todo-manager/todoManager.js
```

### **Estrutura obrigatória:**

- **Classe ou função para representar tarefas** - deve armazenar todos os dados da tarefa
- **Classe ou função para gerenciar tarefas** - deve implementar todas as funcionalidades
- **Sistema de códigos únicos** - deve gerar e gerenciar códigos estilo Jira
- **Validação de dados** - deve validar entradas e tratar erros

---

## 🧪 Testes e Cobertura

Implemente testes unitários no arquivo `todoManager.test.js` para validar:

### **5 Testes Essenciais:**

1.  ✅ **Criação de tarefa** - com título, descrição, prioridade e código Jira automático.
2.  ✅ **Atualização de tarefa** - mudar título, descrição, prioridade e status.
3.  ✅ **Listagem e filtragem** - listar todas, filtrar por status e por prioridade.
4.  ✅ **Busca e remoção** - buscar por título e remover uma tarefa existente.
5.  ✅ **Tratamento de erros** - tentar atualizar/remover tarefa inexistente, mudar status inválido.

**Executar testes:**

```bash
npm run test:tarefa3
```

A **cobertura de testes** será considerada na avaliação da qualidade do código.

---

## 🧠 Critérios de Avaliação

| Critério               | Descrição                                   |
| ---------------------- | ------------------------------------------- |
| ✅ Funcionalidade      | Implementa a lógica de negócio corretamente |
| 🚀 Performance         | Solução eficiente (tempo e espaço)          |
| 🧹 Qualidade do código | Código limpo, legível e bem estruturado     |
| 🧪 Cobertura de testes | Testes abrangentes com boa cobertura        |

```

```
