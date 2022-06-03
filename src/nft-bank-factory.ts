import { BigInt, log } from "@graphprotocol/graph-ts";
import { NFTBankCreated } from "../generated/NFTBankFactory/NFTBankFactory";
import { NFTBankEntity } from "../generated/schema";

export function handleNFTBankCreated(event: NFTBankCreated): void {
	let entity = NFTBankEntity.load(event.params.nftBankProxy.toHexString());

	if (!entity) {
		entity = new NFTBankEntity(event.params.nftBankProxy.toHexString());

		// entity.mintMode = BigInt.fromI32(0);
		entity.please = false;
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
