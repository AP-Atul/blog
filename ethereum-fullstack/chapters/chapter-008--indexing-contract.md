## Subgraph

The Graph is a decentralized protocol for indexing and querying data from blockchains, 
starting with Ethereum. It makes it possible to query data that is difficult to query directly.

### Installation

1. Install the graph cli
```
npm install -g @graphprotocol/graph-cli
```

2. Create a project directory
```
mkdir subgraph
graph init --hosted-service
```

3. Select appropriate options
```
> ethereum
> hosted-service
> name of subgraph = ap-atul/dmctoken
> create a dir = dmctoken
> choose testnet = mumbai
> contract address = paste the contract address
> provide abi file = <contract-dir>/artifacts/contracts/DMCToken.sol/DMCToken.json
> contract name = DMCToken
```

4. Install the dependencies in newly created project
```
npm install 
```

5. Run codegen, this will generate the types for our events
```
npm run codegen
```

6. Try building the graph
```
npm run build
```

### Creating our mapping

0. We want this subgraph to index `Transfer` events so that we can list all of them on our 
   website.

1. Update the `subgraph.yaml` with `startBlock` this will allow our subgraph to index from 
   the given start block if not provided then the indexer will always start from `block 0`.
```yaml
    source:
      startBlock: 30339947 # add your block, get it from mumbai.polygonscan.com
```

2. Let's take a look at files created
    - Manifest (subgraph.yaml) - The manifest defines what datasources your subgraphs will index.
    - Schema (schema.graphql) - The GraphQL schema defines what data you wish to retreive from the subgraph.
    - AssemblyScript Mappings (dmc-token.ts) - This is the code that translates data from your datasources to the entities defined in the schema.

3. Let's write our mapping function inside `dmc-token.ts`/`mapping.ts` file
```ts
export function handleTransfer(event: TransferEvent): void {
    let entity = new Transfer(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity.from = event.params.from
    entity.to = event.params.to
    entity.amount = event.params.amount

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
}
```

Let's go line by line. First we create an entity Transfer with unique id(created by concatenating transaction hash and logindex)
we then store from, to and amount values. Later on we store timestamp and block number as well as transaction hash for
future references.

4. Build the graph 
```
npm run build
```

5. Deploy the subgraph to the hosted service
Register on the [graph](https://thegraph.com/hosted-service). Get the `access token` from the [Dashboard](https://thegraph.com/hosted-service/dashboard)
Login from the cli to add the deployment key
```
graph auth 
> select hosted-service
> paste the access token
```

Create new subgraph project on the graph by clicking `Add subgraph` button. Fill in the details.
The name of the new subgraph should be `dmc-token`. Once it is done we can deploy from the command line
as below

```
npm run deploy
# OR
graph deploy --product hosted-service ap-atul/dmc-token
```

6. Once the subgraph is deployed you can see the indexing status, once the indexer finishes indexing 
we can use the playground to test. Go to the playground and run following query

```graphql
{
  transfers {
      from
      to
      blockTimestamp
  }
}
```

