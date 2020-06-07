# Parte Frontend da #NLW

App Ecoleta.

## Comando

``` bash
npx create-react-app web --template=typescript
```

## Dependências

- [React Icons](https://react-icons.github.io/react-icons/): Uma das bibliotecas mais populares de icones para o React/React Native.
- [React Router dom](https://reacttraining.com/react-router/): Rotas no React.
- [Leaflet](https://leafletjs.com/): Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps.
- [React Leaflet](https://react-leaflet.js.org/): React-Leaflet provides an abstraction of 🍃 Leaflet as ⚛️ React components.
- [React Dropzone](https://react-dropzone.js.org/): Simple React hook to create a HTML5-compliant drag'n'drop zone for files.

## Coisas legais que apredi

- JSX nada mais é do que a sintaxe do XML no código Javascript/Typescript.

- É possível deixar o jsx melhor configurado pra poder usar o intellisense com uma simples configuração no settings.json do VS Code com a adição das seguintes configurações:

``` json
"emmet.syntaxProfiles": {
  "javascript": "jsx"
},
"emmet.includeLanguages": {
  "javascript": "javascriptreact"
}
```

- Semppre que usamos um array ou objeto no Typescript, precisamos informar o tipo da variável que estamos usando. Portando, devemos sempre usar uma interface. Aqui vai um Exemplo:

```typescript

// exemplo de uma interface
interface Item {
  id: number;
  title: string;
  image_url: string;
}

// exemplo de como fica a utilização
// aqui estamos representando um array de Items
const [items, setItems] = useState<Item[]>([]);
```

- As vezes pode ser complicando entender como o TS usa suas tipagens. Então aqui está o :link: [typescript cheat sheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet) para essas horas.
