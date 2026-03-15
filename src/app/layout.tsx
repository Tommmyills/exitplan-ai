import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ExitPlan AI – Find Your Perfect Country in 60 Seconds',
  description: 'Discover the best country to move to as an American. AI-powered relocation recommendations based on your budget, lifestyle, and visa options.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-obsidian text-white antialiased">
        {children}
      </body>
    </html>
  )
}
