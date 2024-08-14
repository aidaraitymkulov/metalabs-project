import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import styles from './layout.module.scss'
import '../../styles/index.scss'
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Football project",
  description: "Football stats, matches, teams and players info ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.background}>
          <img src="./background.png" alt="backgroundImage" className={styles.background__image} />
        </div>
        <div className={styles.all}>
        <Header />
          <main className={styles.all__children}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
