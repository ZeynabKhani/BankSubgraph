import { BigInt, log } from "@graphprotocol/graph-ts";
import { NFTCollectionCreated } from "../generated/NFTCollectionFactory/NFTCollectionFactory";
import { NFTCollectionEntity } from "../generated/schema";

export function handleNFTCollectionCreated(event: NFTCollectionCreated): void {
	let entity = NFTCollectionEntity.load(event.params.nftCollection.toHexString());

	if (!entity) {
		entity = new NFTCollectionEntity(event.params.nftCollection.toHexString());

		entity.mintMode = 0;
	} else {
		log.error("ALREADY EXISTS!!!!!!", [event.address.toHexString()]);
		return;
	}

	entity.save();

	// It is also possible to access smart contracts from mappings. For
	// example, the contract that has emitted the event can be connected to
	// with:
	//
	// let contract = Contract.bind(event.address)
	//
	// The following functions can then be called on this contract to access
	// state variables and other data:
	//
	// - contract.ADMIN_ROLE(...)
	// - contract.BANK_CREATOR_ROLE(...)
	// - contract.DEFAULT_ADMIN_ROLE(...)
	// - contract.createBankProxy(...)
	// - contract.getRoleAdmin(...)
	// - contract.hasRole(...)
	// - contract.launchpadFeePercentage(...)
	// - contract.launchpadFeeWallet(...)
	// - contract.mintCap(...)
	// - contract.nftBankImpl(...)
	// - contract.superAdmin(...)
	// - contract.supportsInterface(...)
}
