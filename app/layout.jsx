import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bruno Santos | Desenvolvedor Backend',
  description: 'Automação Inteligente & Sistemas com IA',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
