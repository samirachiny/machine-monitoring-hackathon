import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Machine Monitoring Dashboard - Intelligence Industrielle',
  description: 'Dashboard de surveillance temps réel des machines industrielles - Hackathon Full-Stack Challenge',
  keywords: 'monitoring, machines, industrie, dashboard, IoT, hackathon, intelligence industrielle',
  authors: [{ name: 'Votre Nom' }],
  openGraph: {
    title: 'Machine Monitoring Dashboard',
    description: 'Surveillance industrielle en temps réel',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}