import { ModeToggle } from "@/components/ModeToggle";
import TokenForm from "@/components/TokenForm";

export default function Home() {
	return (
		<main className="h-screen py-24">
			<ModeToggle />
			<div className="flex flex-col items-center justify-center space-y-32">
				<div className="flex flex-col items-center space-y-4">
					<h1 className="text-5xl font-bold">
						Welcome to TokenTeller
					</h1>
					<p className="text-xl text-muted-foreground">
						Enter the token address and chain to get started
					</p>
				</div>

				<TokenForm />
			</div>

		</main>
	)
}
