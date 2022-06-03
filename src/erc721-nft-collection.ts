// import { BigInt, log } from "@graphprotocol/graph-ts";
// import { PrivateModeIsOn } from "../generated/templates/ERC721NFTCollection/ERC721NFTCollection";
// import { NFTCollectionEntity } from "../generated/schema";

// export function handlePrivateModeIsOn(event: PrivateModeIsOn): void {
// 	let entity = NFTCollectionEntity.load(event.address.toHexString());

// 	if (entity == null) {
// 		log.error("NOT FOUND!!!!!!!!!", [event.address.toHexString()]);
// 		return;
// 	}

// 	entity.mintMode = BigInt.fromI32(12).plus(entity.mintMode);
// 	entity.save();
// }

import { Address, BigInt, crypto, log } from "@graphprotocol/graph-ts";
import {
	baseURIIsSet,
	WinnersAreSet,
	UserMinted,
	ERC721NFTCollection,
	PrivateModeIsOn,
	WhitelistModeIsOn,
	PublicModeIsOn,
	MintPriceChanged,
	MintCapChanged,
	UsersUnfreezed,
	BalanceWithdrawn,
} from "../generated/templates/ERC721NFTCollection/ERC721NFTCollection";
import { NFTCollectionEntity } from "../generated/schema";
// import {createUser} from "./GeneralMapping";
import { ByteArray } from "@graphprotocol/graph-ts/common/collections";

export function handlePrivateModeIsOn(event: PrivateModeIsOn): void {
	log.debug("handlePrivateModeIsOn event received, address: {}, txHash: {}", [
		event.address.toHexString(),
		event.transaction.hash.toHexString(),
	]);

	let nftCollectionEntity = NFTCollectionEntity.load(event.address.toHexString());
	if (nftCollectionEntity == null) {
		log.error(
			"handlePrivateModeIsOn failed, nftCollectionEntity not found, address: {}, txHash: {}",
			[event.address.toHexString(), event.transaction.hash.toHexString()]
		);
		return;
	}

	nftCollectionEntity.mintMode = 1;
	nftCollectionEntity.save();
	log.info("handlePrivateModeIsOn success, PrivateModeIsOnAt: {}, address: {}, txHash: {}", [
		event.block.timestamp.toHexString(),
		event.address.toHexString(),
		event.transaction.hash.toHexString(),
	]);
}
