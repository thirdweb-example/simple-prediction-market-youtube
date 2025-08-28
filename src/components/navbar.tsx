import { ConnectButton, lightTheme, useActiveAccount } from "thirdweb/react";
import { client } from "@/app/client";
import { sepolia } from "thirdweb/chains";
import { inAppWallet, createWallet} from "thirdweb/wallets";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function Navbar() {
    const account = useActiveAccount();
    const [isClaimLoading, setIsClaimLoading] = useState(false);
    const { toast } = useToast();

    const handleClaimTokens = async () => {
        setIsClaimLoading(true);
        try {
            const resp = await fetch("/api/claimToken", {
                method: "POST",
                body: JSON.stringify({ address: account?.address }),
            });
            
            if (!resp.ok) {
                throw new Error('Failed to claim tokens');
            }

            toast({
                title: "Tokens Claimed!",
                description: "Your tokens have been successfully claimed.",
                duration: 5000,
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Claim Failed",
                description: "There was an error claiming your tokens. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsClaimLoading(false);
        }
    };

    const wallets = [
        inAppWallet({
            auth: {
                options: [
                    "google",
                    "discord",
                    "telegram",
                    "email",
                    "x",
                ],
            },
        }),
        createWallet("io.metamask"),
        createWallet("com.coinbase.wallet"),
        createWallet("me.rainbow"),
        createWallet("io.rabby"),
        createWallet("io.zerion.wallet"),
    ];
    
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">OGG Prediction Market</h1>
            <div className="items-center flex gap-2">
                {account && (
                    <Button 
                        onClick={handleClaimTokens}
                        disabled={isClaimLoading}
                        variant="outline"
                    >
                        {isClaimLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Claiming...
                            </>
                        ) : (
                            'Claim Tokens'
                        )}
                    </Button>
                )}
                <ConnectButton 
                    client={client} 
                    theme={lightTheme()}
                    chain={sepolia}
                    connectButton={{
                        style: {
                            fontSize: '0.75rem !important',
                            height: '2.5rem !important',
                        },
                        label: 'Sign In',
                    }}
                    detailsButton={{
                        displayBalanceToken: {
                            [sepolia.id]: "0x0691Df7181d2fCbF0FcEf6c1E6523948f5A01ad8"
                        }
                    }}
                    wallets={
                        wallets
                    }
                    accountAbstraction={{
                        chain: sepolia,
                        sponsorGas: true,
                    }}
                />
            </div>
        </div>
    );
}
