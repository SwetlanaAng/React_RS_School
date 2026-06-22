import { render, screen } from '@testing-library/react';
import About from '@/app/[locale]/about/page';
import en from '@/messages/en.json';

vi.mock('next-intl/server', () => ({
  setRequestLocale: vi.fn(),
  getTranslations: async ({
    namespace,
  }: {
    locale: string;
    namespace: keyof typeof en;
  }) => {
    const messages = en[namespace] as Record<string, string>;

    return (key: string) => messages[key];
  },
}));

vi.mock('@/i18n/locale', () => ({
  resolveLocale: (locale: string) => locale,
}));

describe('About', () => {
  async function renderAbout(locale = 'en') {
    const ui = await About({ params: Promise.resolve({ locale }) });
    render(ui);
  }

  it('renders information about the app and author', async () => {
    await renderAbout();

    expect(
      screen.getByText(/this application was created by/i)
    ).toBeInTheDocument();
    expect(screen.getByText('Svetlana Angeliuk')).toBeInTheDocument();
    expect(
      screen.getByText(/search for Rick and Morty characters/i)
    ).toBeInTheDocument();
  });

  it('renders author and course links', async () => {
    await renderAbout();

    const authorLink = screen.getByRole('link', {
      name: 'Svetlana Angeliuk',
    });
    const courseLink = screen.getByRole('link', {
      name: 'RS School React Course',
    });

    expect(authorLink).toHaveAttribute(
      'href',
      'https://github.com/SwetlanaAng'
    );
    expect(authorLink).toHaveAttribute('target', '_blank');
    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(courseLink).toHaveAttribute('target', '_blank');
  });

  it('renders author image', async () => {
    await renderAbout();

    expect(screen.getByAltText('author')).toBeInTheDocument();
  });
});
