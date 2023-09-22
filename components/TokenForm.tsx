"use client";

import { useState } from "react";
import Image from "next/image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import Results from "./Results";
import { chains } from "@/constants/chains";

const formSchema = z.object({
    chain: z.string().min(1),
    address: z.string().min(1),
});

const TokenForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [results, setResults] = useState(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            chain: "ether",
            address: "",
        },
    });

    const selectedChainSlug = form.watch("chain");
    const selectedChain = chains.find((chain) => chain.slug === selectedChainSlug)!;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        try {
            const response = await fetch("/api/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();

            if (response.ok && data.data) {
                // Success
                setResults(data.data);
                setIsDialogOpen(true);
            } else if (data.errorCode) {
                // Error
                if (data.errorCode === 200) {
                    // Bad Address value
                    toast({
                        variant: "destructive",
                        title: `Error: ${data.errorMessage}`,
                        description: "The address you've entered is invalid. Please double-check the address and ensure you've chosen the correct chain.",
                    })
                } else if (data.errorCode === 301) {
                    // Token not found
                    toast({
                        variant: "destructive",
                        title: `Error: ${data.errorMessage}`,
                        description: "The token you've entered could not be found. Please double-check the address and ensure you've chosen the correct chain.",
                    })
                }
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8 px-6 sm:px-8 md:px-12 w-full max-w-xl mx-auto">
                <FormField
                    control={form.control}
                    name="chain"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center justify-between text-xl">
                                Chain
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <QuestionMarkCircledIcon className="w-5 h-5 mr-2 cursor-pointer text-muted-foreground transition duration-300 hover:text-primary" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>
                                                This refers to the specific blockchain network where the token resides.<br />
                                                Different tokens can exist on different chain, so it&apos;s important to select the correct one.
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </FormLabel>
                            <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a chain" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="max-h-[300px] overflow-y-auto">
                                    {chains.map((chain, index) => (
                                        <SelectItem key={index} value={chain.slug}>
                                            <div className="flex items-center">
                                                <Image src={chain.logo} alt={chain.slug} width={10} height={10} className="mr-2" />
                                                <p>
                                                    {chain.name}
                                                </p>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                The Token&apos;s chain
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center justify-between text-xl">
                                Address
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <QuestionMarkCircledIcon className="w-5 h-5 mr-2 cursor-pointer text-muted-foreground transition duration-300 hover:text-primary" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>
                                                This is a unique identifier for the token on its respective blockchain.<br />
                                                It typically starts with &quot;0x&quot; followed by a series of alphanumeric characters.
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isLoading} />
                            </FormControl>
                            <FormDescription>
                                The Token&apos;s address
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isLoading} type="submit">
                    {isLoading ? "Loading..." : "Submit"}
                </Button>
            </form>

            {results && <Results isOpen={isDialogOpen} onClose={handleCloseDialog} results={results} chain={selectedChain} />}
        </Form>
    );
};

export default TokenForm;