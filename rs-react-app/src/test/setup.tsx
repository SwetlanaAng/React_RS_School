import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('next/image', () => import('./mocks/next-image'));
vi.mock('next/navigation', () => import('./mocks/next-navigation'));

vi.mock('@/i18n/routing', async () => {
  const navigation = await import('./mocks/next-navigation');

  return {
    Link: ({
      href,
      children,
      ...props
    }: {
      href: string;
      children: React.ReactNode;
      className?: string;
    }) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
    useRouter: navigation.useRouter,
    usePathname: navigation.usePathname,
    redirect: navigation.redirectMock,
    getPathname: vi.fn(),
    routing: {
      locales: ['en', 'ru'],
      defaultLocale: 'en',
      localePrefix: 'always',
    },
  };
});
