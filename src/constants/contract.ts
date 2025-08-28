import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";

export const contractAddress = "0x3aA5373746Ca78BBebe9B00cdc1bc15A70C8F84c";
export const tokenAddress = "0x0691Df7181d2fCbF0FcEf6c1E6523948f5A01ad8";

export const contract = getContract({
    client: client,
    chain: sepolia,
    address: contractAddress
});

export const tokenContract = getContract({
    client: client,
    chain: sepolia,
    address: tokenAddress
});