# API de Controle Financeiro Pessoal

API REST construída com NestJS e MongoDB para registrar receitas e despesas e consultar o histórico financeiro com métricas consolidadas. O projeto trata de organização financeira cotidiana, letramento financeiro e consumo responsável, em diálogo com os ODS 1 e 12.

## Tecnologias

- NestJS e TypeScript
- MongoDB com Mongoose
- class-validator para validar as requisições
- Jest para testes unitários

## Configuração

É necessário ter Node.js 20 ou superior, npm e acesso a uma instância MongoDB local ou MongoDB Atlas.

Instale as dependências:

```bash
npm install
```

Configure `MONGODB_URI` no ambiente. Para uso local, a aplicação utiliza `mongodb://127.0.0.1:27017/controle-financeiro` como valor padrão. A porta padrão é `3000`; ela pode ser alterada pela variável `PORT`.

Inicie em modo de desenvolvimento:

```bash
npm run start:dev
```

Execute a compilação e os testes:

```bash
npm run build
npm test
```

## Endpoints

### `POST /transacoes`

Registra uma receita ou despesa. Todos os campos são obrigatórios; o valor precisa ser positivo e o tipo deve ser `receita` ou `despesa`.

```json
{
  "descricao": "Conta de Luz",
  "valor": 145.9,
  "tipo": "despesa",
  "categoria": "Moradia",
  "consumoConsciente": true
}
```

### `GET /transacoes`

Retorna o histórico e as métricas calculadas pela API:

```json
{
  "historico": [],
  "metricas": {
    "saldoTotal": 0,
    "totalDespesas": 0,
    "totalGastoImpulso": 0
  }
}
```

`saldoTotal` corresponde às receitas menos as despesas. `totalDespesas` soma as despesas registradas. `totalGastoImpulso` soma as despesas marcadas com `consumoConsciente: false`.
