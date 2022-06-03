import { BigInt, log } from "@graphprotocol/graph-ts";
import { PrivateModeIsOn } from "../generated/templates/NFTBank/NFTBank";
import { NFTBankEntity } from "../generated/schema";

export function handlePrivateModeIsOn(event: PrivateModeIsOn): void {
	let entity = NFTBankEntity.load(event.address.toHexString());

	if (entity == null) {
		log.error("NOT FOUND!!!!!!!!!", [event.address.toHexString()]);
		return;
	}

	entity.please = event.params.privateMode;
	entity.save();
}
