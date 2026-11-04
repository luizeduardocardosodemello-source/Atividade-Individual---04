# Multiverso — app React Native + Expo consumindo uma API

Lista personagens de Rick and Morty usando a API pública https://rickandmortyapi.com (sem chave).

## Como rodar

```bash
npx create-expo-app@latest multiverso --template blank
cd multiverso
npx expo install react-native-safe-area-context
```

Depois copie para dentro do projeto, substituindo o que já existe:

- `App.js`
- a pasta `src/`

Então:

```bash
npx expo start
```

Abra no celular com o app **Expo Go** (QR code) ou pressione `a` (Android) / `i` (iOS) para usar um emulador.

## O que o app faz

- Consome a API com `fetch` e exibe os dados em grade de 2 colunas (`FlatList`)
- Busca por nome com debounce (400 ms)
- Paginação infinita ao rolar até o fim da lista
- Puxar para atualizar
- Estados de carregamento, erro (com botão "Tentar novamente") e lista vazia
- Detalhes do personagem em um modal

## Estrutura

```
App.js                         tela principal
src/api/characters.js          chamada à API
src/hooks/useCharacters.js     estado, paginação, busca e erros
src/components/CharacterCard.js
src/components/CharacterModal.js
src/theme.js                   cores
```

Para usar outra API, altere apenas `src/api/characters.js` e ajuste os campos exibidos nos componentes.
