import { TokenInfo } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { linkTypes } from "@/constants/links";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";

interface ResultsProps {
    isOpen: boolean;
    onClose: () => void;
    results: TokenInfo;
    chain: {
        name: string;
        slug: string;
        logo: string;
    };
};

const Results: React.FC<ResultsProps> = ({
    isOpen,
    onClose,
    results,
    chain
}) => {
    console.log(results)
    const circulatingPercentage = (results.metrics.circulatingSupply / results.metrics.totalSupply) * 100;
    const formattedDate = new Date(results.audit.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="h-[90%] overflow-y-auto flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center text-4xl">
                        {results.name}
                        <span className="ml-4 font-light text-3xl">
                            ({results.symbol})
                        </span>
                    </DialogTitle>
                    <DialogDescription className="flex items-center">
                        <Image src={chain.logo} alt="default.svg" width={10} height={10} className="mr-2" />
                        {chain.name}
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="info">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="info">
                            Info
                        </TabsTrigger>
                        <TabsTrigger value="audit">
                            Audit
                        </TabsTrigger>
                        <TabsTrigger value="metrics">
                            Metrics
                        </TabsTrigger>
                        <TabsTrigger value="links">
                            Links
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="info">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-3xl">
                                    Info
                                </CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    General information about the token
                                </CardDescription>
                            </CardHeader>
                            <Separator className="mb-4" />
                            <CardContent className="flex flex-col space-y-4">
                                <div className="flex flex-col space-y-4 p-4 rounded-md bg-muted">
                                    <div className="flex flex-col space-y-2">
                                        <h3 className="text-xl font-bold">Token Description</h3>
                                        <p className="italic">{results.info.description}</p>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <h3 className="text-xl font-bold">Contact Email</h3>
                                        <p className="">{results.info.email}</p>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <h3 className="text-xl font-bold">Extra Info</h3>
                                        <p>{results.info.extraInfo ? (
                                            results.info.extraInfo
                                        ) : (
                                            "No extra info provided"
                                        )}</p>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <h3 className="text-xl font-bold">NFT Collection</h3>
                                        <p>{results.info.nftCollection ? (
                                            results.info.nftCollection
                                        ) : (
                                            "No NFT's found"
                                        )}</p>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <h3 className="text-xl font-bold">Ventures</h3>
                                        <p>{results.info.ventures ? (
                                            results.info.ventures
                                        ) : (
                                            "No ventures found"
                                        )}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="audit">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-3xl">
                                    Audit
                                </CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    Detailed audit information about the token
                                </CardDescription>
                            </CardHeader>
                            <Separator className="mb-4" />
                            <CardContent className="flex flex-col space-y-4">
                                <h3 className="text-xl font-bold">
                                    Verification & Contract
                                </h3>
                                <div className="flex flex-col space-y-4 p-4 rounded-md bg-muted">
                                    <div className="flex items-center justify-between">
                                        <h4>Code</h4>
                                        {results.audit.codeVerified ? (
                                            <div className="flex items-center">
                                                <span>Verified on {formattedDate}</span>
                                                <CheckIcon className="w-6 h-6 ml-4 text-green-500" />
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <span>Not verified</span>
                                                <Cross1Icon className="w-6 h-6 ml-4 text-red-500" />
                                            </div>
                                        )}
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <h4>Contract</h4>
                                        {results.audit.is_contract_renounced ? (
                                            <div className="flex items-center">
                                                <span>Renounced</span>
                                                <CheckIcon className="w-6 h-6 ml-4 text-green-500" />
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <span>Not renounced</span>
                                                <Cross1Icon className="w-6 h-6 ml-4 text-red-500" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold">
                                    Transaction & Minting
                                </h3>
                                <div className="flex flex-col space-y-4 p-4 rounded-md bg-muted">
                                    <div className="flex items-center justify-between">
                                        <h4>Transactions</h4>
                                        {results.audit.lockTransactions ? (
                                            <div className="flex items-center">
                                                <span>Locked</span>
                                                <CheckIcon className="w-6 h-6 ml-4 text-green-500" />
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <span>Unlocked</span>
                                                <Cross1Icon className="w-6 h-6 ml-4 text-red-500" />
                                            </div>
                                        )}
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <h4>Minting</h4>
                                        {results.audit.mint ? (
                                            <div className="flex items-center">
                                                <span>Token can be minted</span>
                                                <CheckIcon className="w-6 h-6 ml-4 text-green-500" />
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <span>Token cannot be minted</span>
                                                <Cross1Icon className="w-6 h-6 ml-4 text-red-500" />
                                            </div>
                                        )}
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <h4>Fees</h4>
                                        {results.audit.unlimitedFees ? (
                                            <div className="flex items-center">
                                                <span>Unlimited</span>
                                                <Cross1Icon className="w-6 h-6 ml-4 text-red-500" />
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <span>Limited</span>
                                                <CheckIcon className="w-6 h-6 ml-4 text-green-500" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold">
                                    Other Details
                                </h3>
                                <div className="flex flex-col space-y-4 p-4 rounded-md bg-muted">
                                    <div className="flex items-center justify-between">
                                        <h4>Audit Status</h4>
                                        {results.audit.status === "OK" ? (
                                            <div className="flex items-center">
                                                <span>OK</span>
                                                <CheckIcon className="w-6 h-6 ml-4 text-green-500" />
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <span>Not OK</span>
                                                <Cross1Icon className="w-6 h-6 ml-4 text-red-500" />
                                            </div>
                                        )}
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <h4>Audit Provider</h4>
                                        <span>{results.audit.provider}</span>
                                    </div>
                                </div>
                                {/* <div className="flex flex-col">
                                <p>{results.audit.provider}</p>
                                    <p>{results.audit.proxy ? "Token uses a proxy design pattern" : "Token does not use a proxy design pattern"}</p>
                                </div> */}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="metrics">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-3xl">
                                    Metrics
                                </CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    Key metrics about the token
                                </CardDescription>
                            </CardHeader>
                            <Separator className="mb-4" />
                            <CardContent className="flex flex-col space-y-4">
                                <div className="flex flex-col space-y-4 p-4 rounded-md bg-muted">
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-bold">Creation Block:</span>
                                        <span className="text-2xl">{results.creationBlock.toLocaleString("en-US")}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex flex-col">
                                        {results.metrics.circulatingSupply > 0 ? (
                                            <span className="text-3xl font-bold">{results.metrics.circulatingSupply.toLocaleString("en-US")} {results.symbol}</span>
                                        ) : (
                                            <span className="text-3xl font-bold">Unknown</span>
                                        )}
                                        <span className="text-muted-foreground">Circulating Supply</span>
                                    </div>

                                    <Progress value={circulatingPercentage} />

                                    <div className="flex flex-col">
                                        <span className="text-3xl font-bold">{results.metrics.totalSupply.toLocaleString("en-US")} {results.symbol}</span>
                                        <span className="text-muted-foreground">Total Supply</span>
                                    </div>
                                </div>

                                <div className="flex justify-between space-x-4">
                                    <div className="w-full flex flex-col p-4 rounded-md bg-muted">
                                        <span className="text-3xl font-bold">{results.metrics.holders.toLocaleString("en-US")}</span>
                                        <span className="text-muted-foreground">Holders</span>
                                    </div>
                                    <div className="w-full flex flex-col p-4 rounded-md bg-muted">
                                        <span className="text-3xl font-bold">{results.metrics.txCount.toLocaleString("en-US")}</span>
                                        <span className="text-muted-foreground">Transactions</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="links">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-3xl">
                                    Links
                                </CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    Links to the token&apos;s website and social media
                                </CardDescription>
                            </CardHeader>
                            <Separator className="mb-4" />
                            <CardContent className="grid grid-cols-2 gap-4">
                                {linkTypes.map(link => {
                                    const url = results.links[link.key as keyof typeof results.links];
                                    if (url) {
                                        return (
                                            <a key={link.key} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center rounded-md shadow-md p-4 transition duration-300 hover:shadow-xl">
                                                <Image src={link.icon} alt={link.key} width={32} height={32} className="mr-4" />
                                                {link.title}
                                            </a>
                                        )
                                    }
                                })}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
                <DialogFooter>
                    <Button>
                        Save as PDF
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default Results;

// TODO:
// - Add a way to save the results as a PDF
// - Add a way to copy the results to the clipboard
// - Add a way to share the results
// - Add a way to download the results as a JSON file
// - Data:
//    - results.logo
//    - results.info.decimals
//    - results.info.chain