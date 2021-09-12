# my react ts template

## commands

```sh terminal
# ts react cra ; https://create-react-app.dev/docs/getting-started#creating-a-typescript-app
yarn create react-app . --template typescript

# eslint
yarn eslint --init
√ How would you like to use ESLint? · style
√ What type of modules does your project use? · esm
√ Which framework does your project use? · react
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
√ How would you like to define a style for your project? · guide
√ Which style guide do you want to follow? · airbnb
√ What format do you want your config file to be in? · JSON

# install eslint deps
yarn add -D \
    eslint-plugin-react@^7.21.5 \
    @typescript-eslint/eslint-plugin@latest \
    eslint-config-airbnb@latest \
    eslint@^7.2.0 \
    eslint-plugin-import@^2.22.1 \
    eslint-plugin-jsx-a11y@^6.4.1 \
    eslint-plugin-react-hooks@^4 \
    @typescript-eslint/parser@latest

# prettier
yarn add -D \
    prettier  \
    eslint-plugin-prettier  \
    eslint-config-prettier

# tsconfig path alias
yarn add -D eslint-import-resolver-typescript
```

## package.json

- remove `eslintConfig`
- use _.eslintrc_ file

## tsconfig.json

```jsonc tsconfig.json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "baseUrl": "./src"
  }
}
```

- use `baseUrl`, `path alias`

## .eslintrc.json

- https://github.com/chinsun9/react-ts-template/blob/v20210827/.eslintrc.json

## .prettierrc

```jsonc .prettierrc
// .prettierrc
{
  "endOfLine": "auto",
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all"
}
```
