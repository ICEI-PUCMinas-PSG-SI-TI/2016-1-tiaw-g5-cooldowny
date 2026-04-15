# Especificações Do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Contexto.md"> Documentação de Contexto</a></span>

> Apresente uma visão geral do que será abordado nesta parte do
> documento, enumerando as técnicas e/ou ferramentas utilizadas para
> realizar a especificações do projeto

## Personas

Pedro Paulo tem 26 anos, é arquiteto recém-formado e autônomo. Pensa em
se desenvolver profissionalmente através de um mestrado fora do país,
pois adora viajar, é solteiro e sempre quis fazer um intercâmbio. Está
buscando uma agência que o ajude a encontrar universidades na Europa
que aceitem alunos estrangeiros.


> Enumere e detalhe as personas da sua solução. Para
> tanto, baseie-se tanto nos documentos disponibilizados na disciplina
> e/ou nos seguintes links:
>
> **Links Úteis**:
> - [Rock Content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de Empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de Stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
> Lembre-se que você deve ser enumerar e descrever precisamente e
> personalizada todos os clientes ideais que sua solução almeja.
>
> Persona 1:
> ![Persona1](docs/images/persona_lucas_rocha_formatado.pdf(3)(1).pdf)
>
> Persona 2:
> ![Persona2](/images/persona111(2).pdf)
>
> Persona 3:
> ![Persona3](docs/images/persona222(1).pdf)

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Registrar minhas tarefas           | Não esquecer de fazê-las               |
|Administrador       | Alterar permissões                 | Permitir que possam administrar contas |

> Apresente aqui as histórias de usuário que são relevantes para o
> projeto de sua solução. As Histórias de Usuário consistem em uma
> ferramenta poderosa para a compreensão e elicitação dos requisitos
> funcionais e não funcionais da sua aplicação. Se possível, agrupe as
> histórias de usuário por contexto, para facilitar consultas
> recorrentes à essa parte do documento.
>
> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
>
> História 1
> Eu como: Jogador de LOL
Preciso de: Diminuir o tempo que fico jogando
Para/Porque: Quero investir meu tempo em outras coisas
>
> História 2
> Eu como: Streamer de jogos
Preciso de: Ver quanto tempo fico em cada jogo
Para/Porque: Quero ter controle sobre minha rotina
>
> História 3
> Eu como: Jogador preocupado com o bem-estar físico.
Preciso de: Receber um alerta a cada 1 hora de jogo contínuo.
Para/Porque: Quero lembrar de levantar, me alongar e beber água para evitar o sedentarismo.
>
> História 4
> Eu como: Trabalhador remoto.
Preciso de: Bloquear o acesso a jogos durante o horário comercial.
Para/Porque: Preciso manter o foco total nas minhas entregas profissionais e evitar distrações.
>
> História 5
> Eu como: Estudante que precisa melhorar a produtividade.
Preciso de: Definir um limite diário de tempo para jogos.
Para/Porque: Quero garantir que minhas tarefas e estudos sejam concluídos antes de gastar tempo jogando.
>
> História 6
> Eu como: Jogador competitivo que quer melhorar meu desempenho.
Preciso de: Receber um relatório com o tempo total jogado e pausas feitas durante o dia.
Para/Porque: Quero analisar minha rotina e ajustar meus horários para jogar com mais qualidade e menos cansaço mental.

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário cadastre tarefas | ALTA | 
|RF-002| Emitir um relatório de tarefas no mês   | MÉDIA |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 

> Com base nas Histórias de Usuário, enumere os requisitos da sua
> solução. Classifique esses requisitos em dois grupos:
>
> - [Requisitos Funcionais
>   (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
>   correspondem a uma funcionalidade que deve estar presente na
>   plataforma (ex: cadastro de usuário).
>
> - [Requisitos Não Funcionais
>   (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
>   correspondem a uma característica técnica, seja de usabilidade,
>   desempenho, confiabilidade, segurança ou outro (ex: suporte a
>   dispositivos iOS e Android).
>
> Lembre-se que cada requisito deve corresponder à uma e somente uma
> característica alvo da sua solução. Além disso, certifique-se de que
> todos os aspectos capturados nas Histórias de Usuário foram cobertos.
>
> Requisitos Funcionais:
> 1. O site deve ter um sistema de login/entrar - ALTA
> 2. O site deve ter um sistema de cronômetro - MÉDIA
> 3. O site deve ter um sistema de tarefas diárias - MÉDIA
> 4. O site deve ter um sistema de relatórios para o usuário se informar - ALTA
> 5. O site deve ter um painel com informações e atividades do usuário - ALTA
>
> Requisitos Não Funcionais:
> 1. O site deve ser responsivo - ALTA
> 2. Deve haver segurança - ALTA
> 3. Deve ser fácil de mexer - ALTA

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


> Enumere as restrições à sua solução. Lembre-se de que as restrições
> geralmente limitam a solução candidata.
> 
> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
