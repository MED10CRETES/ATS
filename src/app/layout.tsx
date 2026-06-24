import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ATS POC",
  description: "Transparency-first applicant tracking proof of concept",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="topbar">
            <div className="topbar-inner">
              <Link href="/" className="brand" aria-label="ATS POC home">
                <span className="brand-mark">ATS</span>
                <span>Transparent ATS</span>
              </Link>
              <nav className="nav" aria-label="Primary navigation">
                <Link href="/jobs">Jobs</Link>
                <Link href="/applicant">Applicant</Link>
                <Link href="/recruiter">Recruiter</Link>
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
