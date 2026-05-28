# Gestão de Clientes — Teste Técnico Front-end Angular

Este projeto consiste em uma aplicação web para gerenciamento de clientes (CRUD), desenvolvida com o ecossistema **Angular** e **Angular Material**. A aplicação foi projetada focando em reatividade nativa, componentização limpa, arquitetura de estado centralizada e ótimas práticas de estilização estruturada.

---

## Como Executar o Projeto

### Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina o **Node.js** (v18 ou superior) e o **Angular CLI**.

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone <LINK_DO_SEU_REPOSITORIO_AQUI>
   cd teste-gestao-clientes

2. **Instalar dependências**
    ```npm install

3. **Rodar a aplicação em modo de desenvolvimento**
    ```ng serve

4. **Acessar no navegador**
    Abra http://localhost:4200 para interagir com o sistema.

### Conceitos técnicos e arquitetura

O projeto foi desenvolvido em poucas horas, mas procurei ser coerente, simples e verdadeiro, deixando o código performático, legível e robusto.

Não foram utilizadas dependências externas, os dados foram centralizados e gerenciados na própria aplicação através de `BehaviorSubject` no `ClienteService`.
Sobre as listas usei do melhor que o Angular oferece para reatividade instântanea com `Observable` consumindo os dados de forma assíncrona e nas operações de:
iserção, atualização e remoção.

O Formulário atua de maneira híbrida por conta dos decorator `@Input`, o componente detecta se deve ser cadastro ou edição. Sem duplicação de código e otimizado para 
manutenabilidade.

As máscaras no formulário possuem esse detalhe, um refinamento de UX para para formatação dos dados, além da utilização do `ReactiveFormsModule` com validações assíncronas.

Evitando fugir dos padrões de css e utlizando um método que é capaz de isolar e manter as classes limpas, a folha de estilo tem a aplicação da metodologia
BEM(Block, Element e Modifier) com o aninhamento do SCSS.

Utilizado Pipes customizados.

### Escopo
Dentro do desafio resolvi mapear e realizar um entrega em curto prazo, apesar de ter ciência de um maior período, mas em um cenário de evolução com certeza seria pensado
nas demandas de:
    - Roteamento Avançado e Lazy Loading: para carregar os módulos sob demanda e melhorar o carregamento inicial.
    - Autênticação e Guards: implementação do fluxo de login, com `HttpIntercpetor` com token anexado, além do `AuthGuard` para proteger rotas.
    - Testes unitários: validações síncronas no formulário e nas mutações de estado reativas em `ClienteService`. Escrita de testes de unidades com `Jasmine` e `Karma`.



`

