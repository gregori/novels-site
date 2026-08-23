# Perguntas de Verificação de Requisitos

Por favor responda cada pergunta preenchendo a letra escolhida após a tag `[Answer]:`. Se nenhuma opção corresponder ao que você quer, escolha a última opção (Other) e descreva sua preferência. Me avise quando terminar.

## Pergunta 1 — Abordagem técnica de construção do site

Como o site deve ser gerado a partir dos arquivos Markdown?

A) Gerador de site estático moderno (ex: Astro ou Eleventy/11ty) com build automatizado via GitHub Actions publicando no GitHub Pages — mais flexível para temas/tipografia customizados, exige um passo de build

B) Jekyll nativo do GitHub Pages (sem necessidade de GitHub Actions, o próprio GitHub Pages já sabe buildar) — mais simples de configurar, porém menos flexível para customizações avançadas de UI

C) Site estático "vanilla" (HTML/CSS/JS simples, sem framework) com um script próprio que converte Markdown para HTML antes do commit ou via Actions

X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Pergunta 2 — Estrutura de pastas por título

Como você imagina organizar os arquivos de cada obra?

A) Uma pasta por título, com um arquivo Markdown por capítulo dentro dela (ex: `content/titulo-x/capitulo-01.md`)

B) Uma pasta por título, com todos os capítulos em um único arquivo Markdown longo

C) Uma pasta por título, e dentro dela subpastas por volume/arco, cada uma com seus capítulos

X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Pergunta 3 — Metadados de cada título (front matter)

Além de categorias/tags, quais metadados cada título deve ter?

A) Apenas o essencial: título, autor original, categorias/tags, status (em andamento/completo/pausado)

B) O essencial + sinopse e imagem de capa

C) O essencial + sinopse, imagem de capa, e créditos/disclaimer de tradução (ex: link para a obra original, aviso de fã-tradução)

X) Other (please describe after [Answer]: tag below)

[Answer]: C

## Pergunta 4 — Páginas/navegação principal do site

Quais páginas o site deve ter?

A) Página inicial (destaques/últimos capítulos), catálogo de títulos, página de cada título (com lista de capítulos), página de leitura do capítulo

B) Mesmo que A, mais uma página de navegação por categoria (lista de categorias, cada uma mostrando os títulos daquela categoria)

C) Mesmo que B, mais uma página "Sobre" (quem traduz, contato/disclaimer geral)

X) Other (please describe after [Answer]: tag below)

[Answer]: C

## Pergunta 5 — Busca no site

Você quer busca por texto no site (por título/autor), além da navegação por categoria?

A) Sim, busca simples client-side (funciona sem servidor, ideal para GitHub Pages)

B) Não, navegação por categorias e lista de títulos é suficiente

X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Pergunta 6 — Comentários dos leitores

Você quer permitir que leitores comentem nos capítulos?

A) Sim, usando comentários baseados em GitHub Discussions (ex: giscus) — gratuito, estático, sem backend próprio

B) Não, sem sistema de comentários por enquanto

X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Pergunta 7 — Feed de atualizações

Você quer um feed RSS para que leitores saibam quando novos capítulos forem publicados?

A) Sim, gerar feed RSS automaticamente

B) Não é necessário

X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Pergunta 8 — Analytics/estatísticas de visitas

Você quer alguma ferramenta de estatísticas de visita?

A) Sim, uma opção leve e respeitosa com privacidade (ex: Plausible/GoatCounter/Umami autohospedado)

B) Não, sem analytics — site puramente estático e privado

X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Pergunta 9 — Domínio

O site será acessado por qual endereço?

A) URL padrão do GitHub Pages (ex: `usuario.github.io/novels-site`)

B) Domínio próprio customizado (você já tem ou pretende comprar um domínio)

X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Pergunta 10 — Migração do conteúdo do Blogspot

Você quer migrar as traduções já publicadas no Blogspot para este novo site?

A) Sim, quero migrar o conteúdo existente (podemos tratar isso como uma etapa separada depois que o site estiver pronto)

B) Não, vou começar do zero apenas com conteúdo novo

X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Pergunta 11 — Idioma da interface do site

Qual idioma a interface do site (botões, menus, textos fixos) deve usar?

A) Português (Brasil)

B) Inglês

C) Ambos, com opção de troca de idioma

X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Pergunta 12 — Persistência das preferências de leitura

As preferências de fonte/tamanho/espaçamento e tema (claro/escuro) escolhidas pelo leitor devem:

A) Ser salvas no navegador do leitor (localStorage) e mantidas entre visitas

B) Valer apenas durante a sessão atual (resetam ao fechar/reabrir o navegador)

X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Pergunta 13 — Extensão: Baseline de Segurança

Este projeto é um site estático (sem backend, sem dados de usuário, sem login). As regras de segurança abaixo devem ser aplicadas mesmo assim?

A) Sim — aplicar todas as regras de SEGURANÇA como restrições obrigatórias (recomendado para aplicações de produção)

B) Não — pular as regras de SEGURANÇA (adequado para PoCs, protótipos e projetos experimentais/hobby como este)

X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Pergunta 14 — Extensão: Baseline de Resiliência

Este projeto não tem infraestrutura própria (é hospedado pelo GitHub Pages). A baseline de resiliência (tolerância a falhas, alta disponibilidade, observabilidade — derivada do AWS Well-Architected Framework) deve ser aplicada?

A) Sim — aplicar a baseline de resiliência como boas práticas direcionais (recomendado para workloads críticos de negócio)

B) Não — pular a baseline de resiliência (adequado para PoCs, protótipos e projetos experimentais como este)

X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Pergunta 15 — Extensão: Testes Baseados em Propriedades (PBT)

Este projeto tem pouca lógica de negócio (principalmente exibição de conteúdo Markdown). Testes baseados em propriedades devem ser aplicados?

A) Sim — aplicar todas as regras de PBT como restrições obrigatórias (recomendado para lógica de negócio complexa, transformações de dados)

B) Parcial — aplicar regras de PBT apenas para funções puras e round-trips de serialização (ex: parsing de front matter)

C) Não — pular todas as regras de PBT (adequado para aplicações simples, projetos apenas de UI, como este)

X) Other (please describe after [Answer]: tag below)

[Answer]: B
