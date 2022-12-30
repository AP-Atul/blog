import { Transfer as TransferEvent } from "../generated/DMCToken/DMCToken"
import { Transfer } from "../generated/schema"

export function handleTransfer(event: TransferEvent): void {
  // we create an entity with unique id
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
