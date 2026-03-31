# Guia Completo do Estilo Visual - Autoescola IDEAL

## 1. Objetivo do estilo

Este projeto foi desenhado para transmitir uma percepcao de marca:

- seria
- confiavel
- premium
- direta para conversao

A referencia conceitual foi um visual editorial/suico: tipografia dominante, estrutura limpa, espaco em branco estrategico e contraste alto.

## 2. Direcao visual aplicada

### 2.1 Minimalista premium

Em vez de decoracao excessiva, o layout prioriza:

- blocos limpos
- contraste entre preto, branco e cores institucionais
- elementos funcionais com hierarquia clara

### 2.2 Tipografia como protagonista

A tipografia e o principal elemento de identidade. Os titulos sao grandes, em caixa alta e com tracking ajustado para gerar presenca visual.

Implementacao:

- Fonte de display: Space Grotesk
- Fonte de texto: IBM Plex Sans
- Classes de titulo reutilizaveis em [src/index.css](src/index.css)
  - .headline-xl
  - .headline-lg
  - .headline-md

### 2.3 Alto contraste no lugar de gradientes

A composicao evita gradientes roxo/azul e efeitos genericos de template. O contraste foi construido com:

- fundos chapados
- blocos escuros contra tipografia clara
- CTA em amarelo e preto para destaque maximo

## 3. Paleta e sistema de cor

Cores solicitadas e aplicadas:

- #0619DD (brandBlue)
- #050F93 (brandNavy)
- #FFCB00 (brandYellow)
- #FF9500 (brandOrange)
- branco e preto

Mapeamento tecnico no tema Tailwind:

- [tailwind.config.js](tailwind.config.js)

```js
colors: {
  brandBlue: "#0619DD",
  brandNavy: "#050F93",
  brandYellow: "#FFCB00",
  brandOrange: "#FF9500"
}
```

## 4. Anti-padroes evitados (conforme requisito)

### 4.1 Nao usar gradiente padrao roxo/azul

Feito: interface com blocos de cor solida e contraste forte.

### 4.2 Nao usar botao pill de SaaS

Feito: botoes com .rounded-md (canto discreto), borda definida e peso tipografico.

### 4.3 Nao usar grade generica de 3 colunas com icones

Feito: composicao assimetrica por secao com spans diferentes (ex.: col-span 7/5, 8/4, cards variaveis nos cursos).

### 4.4 Nao usar sombra exagerada / glassmorphism

Feito: interface majoritariamente flat, sem vidro e sem blur decorativo excessivo.

### 4.5 Nao parecer template

Feito: ritmo editorial customizado, blocos alternados, CTA dominante e assinatura tipografica forte.

## 5. Arquitetura tecnica usada

Stack:

- React (Vite)
- Tailwind CSS
- PostCSS + Autoprefixer

Arquivos-base:

- [package.json](package.json)
- [vite.config.js](vite.config.js)
- [tailwind.config.js](tailwind.config.js)
- [postcss.config.js](postcss.config.js)
- [src/main.jsx](src/main.jsx)
- [src/App.jsx](src/App.jsx)
- [src/index.css](src/index.css)

## 6. Estrutura de componentes (reutilizacao)

### 6.1 Componentes criados

- [src/components/ButtonLink.jsx](src/components/ButtonLink.jsx)
  - Botao/Link reutilizavel com variantes (main e secondary).
- [src/components/SectionTitle.jsx](src/components/SectionTitle.jsx)
  - Padrao de cabecalho de secao (overline, titulo, subtitulo).
- [src/components/CourseCard.jsx](src/components/CourseCard.jsx)
  - Cartao de curso com conteudo e CTA.
- [src/components/PlanSimulator.jsx](src/components/PlanSimulator.jsx)
  - Simulador de plano em React (estado, validacao e resultado).

### 6.2 Dados desacoplados da UI

- [src/data/siteData.js](src/data/siteData.js)

Esse arquivo concentra:

- navegacao
- categorias
- servicos
- diferenciais
- cursos
- observacoes legais
- utilitarios de link WhatsApp

Beneficio: facilita manutencao sem mexer na estrutura dos componentes.

## 7. Como o layout foi montado (ritmo visual)

## 7.1 Hero com hierarquia imediata

- Grid principal em 12 colunas.
- Bloco de copia maior + painel lateral de categorias.
- CTA primario no topo da pagina e no bloco principal.

Objetivo UX: o usuario entende oferta e acao em poucos segundos.

## 7.2 Alternancia de blocos

As secoes alternam composicao e fundo para criar ritmo:

- secoes em branco
- secao de urgencia em amarelo
- secao de planos com bloco azul de valores
- secao de cursos em fundo neutro cinza claro
- rodape preto com CTA final

Objetivo UX: evitar fadiga visual e guiar leitura em etapas.

## 7.3 Grid assimetrico

Exemplos aplicados:

- secao Sobre: 7/5 e depois 4/8
- secao Planos: 7/5 e depois 8/4
- cursos com cartoes que alternam largura (layout wide em alguns itens)

Objetivo UX: quebrar previsibilidade e reforcar identidade premium.

## 8. Estrategia de CTA (dominancia de conversao)

### 8.1 CTA principal recorrente

Mensagem principal de conversao:

- "GARANTIR MINHA VAGA AGORA"

Locais de destaque:

- bloco de urgencia
- rodape
- barra fixa mobile

### 8.2 Barra fixa no mobile

Implementada em [src/App.jsx](src/App.jsx):

- fixa no rodape da tela
- foco em toque com area ampla
- visivel apenas em telas pequenas

Objetivo UX: reduzir friccao de contato no celular.

## 9. Mobile-first real (na pratica)

### 9.1 Prioridades no mobile

- botoes em largura total nas principais acao
- espacamento vertical para leitura com polegar
- CTA persistente no rodape
- tipografia escalonada para legibilidade

### 9.2 Escala responsiva

Tailwind breakpoints usados para crescimento progressivo:

- base mobile
- sm
- md
- lg

Resultado: layout funciona primeiro no celular e expande para desktop.

## 10. Simulador de planos em React

Arquivo:

- [src/components/PlanSimulator.jsx](src/components/PlanSimulator.jsx)

### 10.1 O que ele faz

- recebe tipo de plano (ambos/carro/moto)
- calcula aulas, aluguel, juros e total
- valida regras minimas
- gera mensagem pronta para WhatsApp

### 10.2 Regras implementadas

- minimos por plano
- faixas de preco por quantidade de aulas
- aluguel com regras de desconto/isenção
- taxas de maquininha 1x a 12x

### 10.3 Resultado orientado a conversao

- resumo financeiro claro
- lista de itens inclusos
- CTA para envio imediato da simulacao no WhatsApp

## 11. Animacao e movimento

No novo estilo, a animacao foi mantida discreta e funcional, sem "efeito show".

Implementacao em [src/index.css](src/index.css):

- utilitarios .stagger-in e delays
- keyframe staggerIn com entrada vertical curta

Motivo: movimento para reforcar hierarquia, nao para distrair.

## 12. Acessibilidade e legibilidade

Boas praticas presentes:

- link de pulo para conteudo no topo (skip link)
- contraste forte entre texto e fundo
- textos secundarios com opacidade controlada, mantendo leitura
- alvos de toque amplos no mobile

## 13. Como manter esse estilo sem perder qualidade

Checklist para novas secoes/componentes:

1. Comece pela hierarquia tipografica, nao por decoracao.
2. Garanta um objetivo unico por secao.
3. Use no maximo 1 CTA principal por bloco.
4. Prefira cores chapadas e contraste alto.
5. Evite cards com sombra pesada e bordas "fofas".
6. Mantenha layout assimetrico quando fizer sentido.
7. Em mobile, priorize toque e clareza de acao.

## 14. Como rodar o projeto

```bash
npm install
npm run dev
```

Build de producao:

```bash
npm run build
```

## 15. Resumo executivo

O resultado final entrega um site de autoescola com identidade mais madura e confiavel:

- visual editorial premium
- foco em conversao real
- sem estetica SaaS generica
- codigo modular em React + Tailwind
- componentes e dados reutilizaveis para evolucao futura
