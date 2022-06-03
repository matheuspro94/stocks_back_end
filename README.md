## Stocks Back End
 
Esse Back-End é baseado em um API da [Alphavantage](https://www.alphavantage.co) onde eu uso as informações retornadas para criar novos endpoints conforme as necessidades do desafio Astran.
 
A aplicação foi toda desenvolvida usando linguagem [TypeScript](https://www.typescriptlang.org/) em [Node.js](https://nodejs.org/en/docs/)  utilizando o [Express](https://expressjs.com/pt-br/).
 
## Rodando a aplicação localmente
 
```bash
No terminal, clone o projeto em SSH:
 
$ git clone git@github.com:mroenca40/stocks_back_end.git
 
Entre na pasta do projeto:
 
$ cd stocks_back_end
 
Instale as dependências:
 
$ yarn
 
Execute a aplicação:
 
$ yarn run dev
 
Pronto, agora é possível acessar a aplicação Back-End a partir da rota http://localhost:3333/
 
OBS: No endpoint acima coloque as rotas que deseja usar.
```
## Endpoints
 
#### `/stocks/:stock_name/quote` - Retorna a cotação mais recente para a ação ####
 
Entrada:
 
- `stock_name` - parâmetro passado na URI indicando o nome da ação (PETR4.SA, VALE5.SA)
 
Retorno:
 
```js
{
  "name": "CSMG3.SA",
  "lastprice": "13.18",
  "priceAt": "2022-06-01T21:00:00.000-03:00"
}
```
 
#### `/stocks/:stock_name/history?from=<string>&to=<string>` - Retorna preço histórico da ação num intervalo inclusivo ####
 
Entrada:
 
- `stock_name` - parâmetro passado na URI indicando o nome da ação (PETR4.SA, VALE5.SA)
- `from` - string com data em formato ISO 8601
- `to` - string com data em format ISO 8601
 
Retorno:
 
```js
{
  "name": "CSMG3.SA",
  "price": [
    {
      "opening": "11.60",
      "low": "11.45",
      "high": "11.75",
      "closing": "11.50",
      "pricedAt": "2022-01-09T21:00:00.000-03:00"
    },
    {
      "opening": "11.50",
      "low": "11.40",
      "high": "11.66",
      "closing": "11.54",
      "pricedAt": "2022-01-10T21:00:00.000-03:00"
    },
    {
      "opening": "11.60",
      "low": "11.56",
      "high": "11.90",
      "closing": "11.87",
      "pricedAt": "2022-01-11T21:00:00.000-03:00"
    },
    {
      "opening": "11.80",
      "low": "11.79",
      "high": "11.98",
      "closing": "11.86",
      "pricedAt": "2022-01-12T21:00:00.000-03:00"
    },
    {
      "opening": "11.90",
      "low": "11.85",
      "high": "12.05",
      "closing": "11.99",
      "pricedAt": "2022-01-13T21:00:00.000-03:00"
    },
    {
      "opening": "12.10",
      "low": "12.00",
      "high": "12.32",
      "closing": "12.11",
      "pricedAt": "2022-01-16T21:00:00.000-03:00"
    }
  ]
}
```
 
#### `/stocks/:stock_name/compare` - Compara uma ação com uma ou mais ações ####
 
Entrada:
 
- `stock_name` - parâmetro passado na URI indicando o nome da ação (PETR4.SA, VALE5.SA)
- Payload JSON com uma lista de ações:
 
```js
{
  "stocks": [<string>, <string>, ...]
}
```
 
Caso não informado os `stocks` ele retorna um erro:
 
```js
{
  "error": "\"stocks\" does not contain 1 required value(s)"
}
```
 
Retorno:
 
```js
{
  "lastprice": [
    {
      "name": "PETR4.SA",
      "lastprice": "29.76",
      "priceAt": "2022-06-01T21:00:00.000-03:00"
    },
    [
      {
        "name": "TIMP3.SA",
        "lastprice": "13.46",
        "priceAt": "2020-10-08T21:00:00.000-03:00"
      },
      {
        "name": "VIVT4.SA",
        "lastprice": "45.34",
        "priceAt": "2020-11-19T21:00:00.000-03:00"
      }
    ]
  ]
}
```
#### `/stocks/:stock_name/gains?purchasedAmount=<number>&purchasedAt=<string>` - Projeta ganhos com compra em uma data específica ####
 
Entrada:
 
- `stock_name` - parâmetro passado na URI indicando o nome da ação (PETR4.SA, VALE5.SA)
- `purchasedAmount` - `number` com o número de ações
- `purchasedAt` - `string` com data de compra em formato ISO 8601
 
Retorno:
 
```js
{
  "name": "USIM5.SA",
  "purchasedAmount": "100",
  "purchasedAt": "2016-05-30T21:00:00.000-03:00",
  "priceAtDate": 1.65,
  "lastPrice": "1.67",
  "capitalGain": -98.33
}
```
 
## Contato
 
<a targer="_blank" href="https://www.linkedin.com/in/matheus-proenca-dev/"><img src="https://img.icons8.com/fluency/48/000000/linkedin.png"/></a>
 
## Desenvolvedor
 
[<img src="https://avatars.githubusercontent.com/u/74427703?v=4" width=115><br><sub>Matheus Proença</sub>](https://github.com/mroenca40)
 
### Contribuições
 
Caso você queira fazer alguma contribuição, fique a vontade para comentar, fazer pull requests. Toda ajuda para melhorar o código é bem vinda! :D
 
###

