import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';


export const metadata: Metadata = {
	title: 'TokenTeller',
	description: 'TokenTeller is a decentralized application that allows you to get information about any token on any chain.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	)
}
