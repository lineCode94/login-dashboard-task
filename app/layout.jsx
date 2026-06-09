import './layout.scss';
import { AuthLayoutWrapper } from './AuthLayoutWrapper';

export const metadata = {
  title: 'TaskMeet Authentication App',
  description: 'Authentication dashboard for TaskMeet',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthLayoutWrapper>{children}</AuthLayoutWrapper>
      </body>
    </html>
  );
}
