# Pokédex

Uma Pokédex moderna construída em **React + TypeScript**, consumindo a [PokeAPI](https://pokeapi.co/). Além de listar e detalhar Pokémons, a aplicação traz uma **busca com debounce**, **filtros avançados** (tipo, geração e ordenação) e um **simulador de batalha 1v1** que calcula o vencedor a partir dos stats base e da eficácia de tipos.

> Projeto originalmente criado em um bootcamp e depois refatorado: migração de Create React App → **Vite**, de JavaScript → **TypeScript**, e adoção de **TanStack React Query** com cache persistente em **IndexedDB**.

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Stack](#stack)
- [Começando](#começando)
- [Scripts disponíveis](#scripts-disponíveis)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Arquitetura e decisões](#arquitetura-e-decisões)
- [Como funciona a batalha](#como-funciona-a-batalha)
- [Testes](#testes)
- [Créditos](#créditos)

---

## Funcionalidades

- **Listagem com paginação** ("Load more") de mais de 1000 Pokémons.
- **Busca com debounce** por nome ou número da Pokédex (ex.: `pikachu` ou `25`), tolerante a `#` e zeros à esquerda.
- **Filtros avançados** reunidos em um único painel:
  - Filtro por **tipo** (multi-seleção via chips coloridos).
  - Filtro por **geração**.
  - **Ordenação** por relevância, número ou nome.
- **Modal de detalhes** com descrição (flavor text), peso, altura, habilidades, fraquezas e estatísticas base.
- **Comparador / Simulador de batalha**: escolha dois Pokémons e descubra quem venceria, com barras de HP, ordem por velocidade e vantagem de tipo.
- **Cache persistente**: respostas da API ficam guardadas no navegador (IndexedDB), reduzindo requisições e respeitando a *fair use policy* da PokeAPI.
- **UI responsiva** com `styled-components`, do desktop ao mobile.

## Stack

| Camada            | Tecnologia                                                        |
| ----------------- | ----------------------------------------------------------------- |
| Build / Dev       | [Vite](https://vitejs.dev/)                                       |
| Linguagem         | [TypeScript](https://www.typescriptlang.org/)                     |
| UI                | [React 18](https://react.dev/)                                    |
| Dados / cache     | [TanStack React Query](https://tanstack.com/query) + IndexedDB (`idb-keyval`) |
| Estilos           | [styled-components](https://styled-components.com/)               |
| Rotas             | [React Router](https://reactrouter.com/)                          |
| Ícones            | [react-icons](https://react-icons.github.io/react-icons/)         |
| Testes            | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) + jsdom |

## Começando

### Pré-requisitos

- [Node.js](https://nodejs.org/) **18 ou superior**
- npm (acompanha o Node)

### Instalação

```bash
git clone git@github.com:PedroLimass/pokedex-bootcamp.git
cd pokedex-bootcamp
npm install
```

### Rodando em desenvolvimento

```bash
npm run dev
```

A aplicação abre em [http://localhost:3000](http://localhost:3000).

### Build de produção

```bash
npm run build    # checagem de tipos + bundle em dist/
npm run preview  # serve o build localmente para conferência
```

## Scripts disponíveis

| Script                  | Descrição                                              |
| ----------------------- | ------------------------------------------------------ |
| `npm run dev`           | Sobe o servidor de desenvolvimento (Vite).             |
| `npm run build`         | Roda `tsc --noEmit` e gera o bundle de produção.       |
| `npm run preview`       | Pré-visualiza o build de produção.                     |
| `npm test`              | Executa a suíte de testes uma vez.                     |
| `npm run test:watch`    | Executa os testes em modo watch.                       |
| `npm run test:coverage` | Gera o relatório de cobertura.                         |
| `npm run lint`          | Roda o ESLint em `src`.                                |

## Estrutura do projeto

```
src/
├── assets/            # Imagens e SVGs
├── components/        # Componentes reutilizáveis (cada um com index + styles)
│   ├── CustomLink/    # Link de navegação com estado ativo
│   ├── FilterBar/     # Painel de busca + filtros + ordenação
│   ├── Header/        # Cabeçalho com navegação (desktop e mobile)
│   ├── Modal/         # Detalhes do Pokémon
│   ├── PokemonCard/   # Card da listagem
│   ├── PokemonPicker/ # Seletor de Pokémon (usado no comparador)
│   ├── ProgressState/ # Barras de estatísticas base
│   ├── StatsSection/  # Peso, altura e habilidade
│   └── Tag/           # Tag/chip de tipo
├── constants/         # Listas de tipos, gerações e opções de ordenação
├── hooks/             # Hooks de dados e UI
│   ├── useDebounce.ts
│   ├── usePokemons.ts      # Listagem + filtros + paginação
│   ├── useTypeChart.ts     # Carrega e cacheia dados de tipos
│   └── useCompareBattle.ts # Orquestra a simulação da batalha
├── lib/               # queryClient e persister (IndexedDB)
├── pages/             # Home, Pokemons (listagem) e Compare (batalha)
├── routes/            # Definição das rotas
├── services/          # Camada de acesso à PokeAPI
├── styles/            # Tema e estilos globais
├── test/              # Setup, helpers e factories de teste
├── types/             # Tipos da PokeAPI
└── utils/             # Funções puras (filtros, busca, eficácia de tipo, batalha…)
```

## Arquitetura e decisões

- **React Query como camada de dados.** Toda chamada à PokeAPI passa por `useQuery`/`useQueries`, ganhando deduplicação, cache, *retry* com backoff e estados de loading/erro de graça.
- **Cache persistente em IndexedDB.** O cache do React Query é serializado no IndexedDB (`@tanstack/query-async-storage-persister` + `idb-keyval`), então os dados sobrevivem a recarregamentos e novas sessões — alinhado à [fair use policy](https://pokeapi.co/docs/v2#fairuse) da PokeAPI.
- **Busca e filtros locais.** A PokeAPI não oferece busca parcial via REST. Por isso baixamos uma vez o **índice completo** (leve, só nome + URL) e aplicamos busca, filtros e ordenação no cliente; apenas os detalhes dos Pokémons visíveis são buscados sob demanda.
- **Funções puras isoladas.** Regras de negócio (filtros, busca por id/nome, eficácia de tipos, simulação de batalha) ficam em `utils/`, o que as torna fáceis de testar e reutilizar.
- **Tipagem ponta a ponta.** Respostas da API são tipadas em `types/`, e os `styled-components` usam *transient props* (`$prop`) para evitar warnings de atributos no DOM.

## Como funciona a batalha

A simulação (`utils/battleSimulator.ts`) usa os **stats base** e o **dano de tipo** da PokeAPI:

1. A **velocidade** define quem ataca primeiro a cada turno.
2. O dano considera ataque/defesa e o **multiplicador de eficácia de tipo** (super eficaz, pouco eficaz, imune).
3. Em caso de **empate de velocidade**, ambos atacam na mesma rodada — permitindo nocaute mútuo e um empate real entre Pokémons idênticos.
4. O resultado mostra o vencedor, o HP final de cada lado e um comparativo de HP, velocidade e vantagem de tipo.

## Testes

A suíte usa **Vitest + Testing Library** (ambiente `jsdom`). As chamadas de rede são interceptadas por um mock de `fetch` (`src/test/mockFetch.ts`), e há helpers de render com os providers (`src/test/utils.tsx`).

```bash
npm test              # roda todos os testes
npm run test:coverage # relatório de cobertura
```

A configuração de cobertura mede apenas código com lógica (componentes, hooks e utils), excluindo arquivos de estilo e de teste, e impõe *thresholds* mínimos no `vite.config.ts`.

## Créditos

- Dados de Pokémon fornecidos pela [PokeAPI](https://pokeapi.co/).
- Desenvolvido por [Pedro Lima](https://github.com/PedroLimass).
