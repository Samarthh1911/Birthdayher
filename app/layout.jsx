import './globals.css';

export const metadata = {
  title: 'Happy Birthday Aastha 🌹',
  description: 'Made with all my love',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
