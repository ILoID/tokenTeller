import { ModeToggle } from "@/components/ModeToggle";
import TokenForm from "@/components/TokenForm";

export default function Home() {
	return (
		<main className="h-screen relative py-24">
			<ModeToggle />
			<div className="flex flex-col justify-center space-y-32">
				<div className="flex flex-col items-center space-y-4">
					<h1 className="text-5xl font-bold text-center">
						Welcome to TokenTeller
					</h1>
					<p className="text-xl text-muted-foreground text-center">
						Enter the token chain and address to get started
					</p>
				</div>
				<TokenForm />
			</div>
		</main>
	)
}
