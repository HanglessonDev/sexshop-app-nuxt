// cz-config.cjs
module.exports = {
  types: [
    { value: ':sparkles: feat', name: '✨ feat:     Uma nova funcionalidade' },
    { value: ':bug: fix', name: '🐛 fix:      Correção de bugs' },
    { value: ':memo: docs', name: '📝 docs:     Documentação' },
    {
      value: ':lipstick: style',
      name: '💄 style:    Alterações de estilo (código-formatting, etc)',
    },
    {
      value: ':recycle: refactor',
      name: '♻️  refactor: Mudança de código que não corrige um bug nem adiciona uma funcionalidade',
    },
    { value: ':zap: perf', name: '⚡️ perf:     Melhoria de performance' },
    { value: ':white_check_mark: test', name: '✅ test:     Adiciona ou corrige testes' },
    {
      value: ':hammer: chore',
      name: '🔨 chore:    Tarefas de manutenção e outras mudanças que não alteram o código fonte ou os testes',
    },
    { value: ':rewind: revert', name: '⏪ revert:   Reversão de commit' },
    {
      value: ':rocket: build',
      name: '🚀 build:    Mudanças que afetam o sistema de build ou dependências externas (ex: gulp, npm)',
    },
    {
      value: ':green_heart: ci',
      name: '💚 ci:       Mudanças em arquivos e scripts de configuração de CI (ex: Travis, Circle, BrowserStack)',
    },
    { value: ':tada: init', name: '🎉 init:     Inicialização do projeto' },
    { value: ':lock: security', name: '🔒 security: Correção de vulnerabilidades de segurança' },
    { value: ':package: deps', name: '📦 deps:     Adição ou atualização de dependências' },
    { value: ':wrench: config', name: '🔧 config:   Alterações em arquivos de configuração' },
  ],
  scopes: [
    { name: 'api' },
    { name: 'frontend' },
    { name: 'backend' },
    { name: 'infra' },
    { name: 'db' },
    { name: 'auth' },
    { name: 'config' },
    { name: 'docs' },
    { name: 'tests' },
    { name: 'build' },
    { name: 'ci' },
    { name: 'localization' },
    { name: 'i18n' },
    { name: 'devops' },
  ],
  messages: {
    type: 'Selecione o tipo de mudança que você está comitando:',
    scope: 'Qual o escopo desta mudança (opcional):',
    customScope: 'Defina o escopo da mudança:',
    subject: 'Escreva uma descrição curta e imperativa da mudança:\n',
    body: 'Escreva uma descrição detalhada da mudança (opcional). Use "|" para quebrar linhas:\n',
    breaking: 'Liste qualquer mudança de quebra (breaking changes) (opcional):\n',
    footer: 'Liste quaisquer issues fechadas por esta mudança (opcional). Ex.: #31, #34:\n',
    confirmCommit: 'Você tem certeza que deseja prosseguir com o commit acima?',
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  subjectLimit: 100,
  breaklineChar: '|', // It is supported for fields body and footer.
  footerPrefix: 'META:', // Prompt messages in the footer section.
  askForBreakingChangeFirst: true, // Invert order of questions about breaking changes and body
  skipScopes: true, // Esta linha é uma sugestão para indicar que escopo pode ser pulado
}
