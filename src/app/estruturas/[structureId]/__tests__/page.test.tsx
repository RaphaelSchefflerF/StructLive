import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ListPage from '../page';

// Mock das dependências
vi.mock('next-auth/react');
vi.mock('next/navigation');

// Mock dos ícones do Lucide React
vi.mock('lucide-react', () => ({
  BookOpen: () => <span data-testid="book-open-icon">BookOpen</span>,
  BookOpenCheck: () => (
    <span data-testid="book-open-check-icon">BookOpenCheck</span>
  ),
  Home: () => <span data-testid="home-icon">Home</span>,
  List: () => <span data-testid="list-icon">List</span>,
  PlayCircle: () => <span data-testid="play-circle-icon">PlayCircle</span>,
}));

// Mock dos componentes UI
vi.mock('@/components/sidebar/app-sidebar', () => ({
  AppSidebar: () => <div data-testid="app-sidebar">App Sidebar</div>,
}));

vi.mock('@/components/ui/breadcrumb', () => ({
  Breadcrumb: ({ children }: any) => (
    <nav data-testid="breadcrumb">{children}</nav>
  ),
  BreadcrumbItem: ({ children }: any) => (
    <div data-testid="breadcrumb-item">{children}</div>
  ),
  BreadcrumbLink: ({ children, href }: any) => (
    <a href={href} data-testid="breadcrumb-link">
      {children}
    </a>
  ),
  BreadcrumbList: ({ children }: any) => (
    <ul data-testid="breadcrumb-list">{children}</ul>
  ),
  BreadcrumbPage: ({ children }: any) => (
    <span data-testid="breadcrumb-page">{children}</span>
  ),
  BreadcrumbSeparator: () => <span data-testid="breadcrumb-separator">/</span>,
}));

vi.mock('@/components/ui/separator', () => ({
  Separator: () => <hr data-testid="separator" />,
}));

vi.mock('@/components/ui/sidebar', () => ({
  SidebarInset: ({ children }: any) => (
    <div data-testid="sidebar-inset">{children}</div>
  ),
  SidebarProvider: ({ children }: any) => (
    <div data-testid="sidebar-provider">{children}</div>
  ),
  SidebarTrigger: () => <button data-testid="sidebar-trigger">Toggle</button>,
}));

vi.mock('@/components/ui/tabs', () => ({
  Tabs: ({ children, defaultValue }: any) => (
    <div data-testid="tabs" data-default-value={defaultValue}>
      {children}
    </div>
  ),
  TabsContent: ({ children, value }: any) => (
    <div data-testid={`tab-content-${value}`}>{children}</div>
  ),
  TabsList: ({ children }: any) => (
    <div data-testid="tabs-list">{children}</div>
  ),
  TabsTrigger: ({ children, value }: any) => (
    <button data-testid={`tab-trigger-${value}`}>{children}</button>
  ),
}));

vi.mock('@/components/ui/select', () => ({
  Select: ({ children, value, onValueChange }: any) => (
    <div data-testid="select" data-value={value}>
      <select onChange={(e) => onValueChange(e.target.value)} value={value}>
        {children}
      </select>
    </div>
  ),
  SelectContent: ({ children }: any) => (
    <div data-testid="select-content">{children}</div>
  ),
  SelectGroup: ({ children }: any) => (
    <div data-testid="select-group">{children}</div>
  ),
  SelectItem: ({ children, value, disabled }: any) => (
    <option
      value={value}
      disabled={disabled}
      data-testid={`select-item-${value}`}
    >
      {children}
    </option>
  ),
  SelectTrigger: ({ children }: any) => (
    <div data-testid="select-trigger">{children}</div>
  ),
  SelectValue: ({ placeholder }: any) => (
    <span data-testid="select-value">{placeholder}</span>
  ),
}));

// Mock dos componentes de lista
vi.mock('@/app/estruturas/lista/components/list-activity', () => ({
  default: ({ tipo }: any) => (
    <div data-testid="list-activity">List Activity - {tipo}</div>
  ),
}));

vi.mock('@/app/estruturas/lista/components/list-visualization', () => ({
  default: ({ tipo }: any) => (
    <div data-testid="list-visualization">List Visualization - {tipo}</div>
  ),
}));

vi.mock('@/app/estruturas/lista/components/list-theory', () => ({
  default: ({ tipo }: any) => (
    <div data-testid="list-theory">List Theory - {tipo}</div>
  ),
}));

vi.mock('../components/list-challenge', () => ({
  default: ({ tipo }: any) => (
    <div data-testid="list-challenge">List Challenge - {tipo}</div>
  ),
}));

describe('ListPage', () => {
  const mockUseSession = vi.mocked(useSession);
  const mockUseRouter = vi.mocked(useRouter);
  const mockReplace = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseRouter.mockReturnValue({
      replace: mockReplace,
      push: vi.fn(),
      back: vi.fn(),
    } as any);
  });

  it('deve renderizar a página quando autenticado', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<ListPage />);

    // Verifica se os elementos principais estão presentes
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Listas',
    );
    expect(
      screen.getByText(
        'Estrutura de dados para armazenar e manipular coleções de elementos',
      ),
    ).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-provider')).toBeInTheDocument();
    expect(screen.getByTestId('app-sidebar')).toBeInTheDocument();
  });

  it('deve redirecionar para login quando não autenticado', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    } as any);

    render(<ListPage />);

    expect(mockReplace).toHaveBeenCalledWith('/login');
  });

  it('deve retornar null quando status é loading', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
    } as any);

    const { container } = render(<ListPage />);
    expect(container.firstChild).toBeNull();
  });

  it('deve exibir breadcrumb com navegação correta', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<ListPage />);

    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();

    // Verifica se os textos estão presentes em qualquer lugar do componente
    const container = screen.getByTestId('breadcrumb').closest('nav');
    expect(container?.textContent).toContain('Início');
    expect(container?.textContent).toContain('Estruturas de Dados');
    expect(container?.textContent).toContain('Listas');
  });

  it('deve exibir seletor de tipos de lista com valor padrão', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<ListPage />);

    expect(screen.getByTestId('select')).toBeInTheDocument();
    expect(screen.getByTestId('select')).toHaveAttribute('data-value', 'ldse');
  });

  it('deve exibir todas as opções do seletor', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<ListPage />);

    expect(screen.getByTestId('select-item-les')).toBeInTheDocument();
    expect(screen.getByTestId('select-item-lee')).toBeInTheDocument();
    expect(screen.getByTestId('select-item-ldse')).toBeInTheDocument();
    expect(screen.getByTestId('select-item-ldde')).toBeInTheDocument();
    expect(screen.getByTestId('select-item-lc')).toBeInTheDocument();
  });

  it('deve exibir tabs com conteúdo padrão', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<ListPage />);

    expect(screen.getByTestId('tabs')).toHaveAttribute(
      'data-default-value',
      'conteudo',
    );
    expect(screen.getByTestId('tab-trigger-conteudo')).toBeInTheDocument();
    expect(screen.getByTestId('tab-trigger-visualization')).toBeInTheDocument();
    expect(screen.getByTestId('tab-trigger-practice')).toBeInTheDocument();
    expect(screen.getByTestId('tab-trigger-challenge')).toBeInTheDocument();
  });

  it('deve passar o tipo correto para os componentes', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<ListPage />);

    // Verifica se os componentes estão recebendo o tipo correto (ldse é o padrão)
    expect(screen.getByText('List Theory - ldse')).toBeInTheDocument();
    expect(screen.getByText('List Visualization - ldse')).toBeInTheDocument();
    expect(screen.getByText('List Activity - ldse')).toBeInTheDocument();
    expect(screen.getByText('List Challenge - ldse')).toBeInTheDocument();
  });

  it('deve exibir texto de instrução do seletor', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<ListPage />);

    expect(
      screen.getByText('Selecione qual estrutura você deseja:'),
    ).toBeInTheDocument();
  });

  it('deve ter itens disabled no seletor', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<ListPage />);

    const disabledItems = ['les', 'lee', 'ldde', 'lc'];
    disabledItems.forEach((item) => {
      const element = screen.getByTestId(`select-item-${item}`);
      expect(element).toHaveAttribute('disabled');
    });

    // LDSE deve estar habilitado
    const ldseItem = screen.getByTestId('select-item-ldse');
    expect(ldseItem).not.toHaveAttribute('disabled');
  });

  it('deve exibir ícones nas tabs', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    render(<ListPage />);

    // Verifica se os ícones estão sendo renderizados
    expect(screen.getAllByTestId('book-open-icon')).toHaveLength(1);
    expect(screen.getAllByTestId('play-circle-icon')).toHaveLength(1);
    expect(screen.getAllByTestId('book-open-check-icon')).toHaveLength(1);
    expect(screen.getAllByTestId('list-icon')).toHaveLength(3); // Um no header, um na tab, um no título
  });

  it('deve verificar se todos os mocks estão funcionando', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: 'Test User' } },
      status: 'authenticated',
    } as any);

    const { container } = render(<ListPage />);

    // Verificações básicas
    expect(screen.getByTestId('sidebar-provider')).toBeInTheDocument();
    expect(screen.getByTestId('tabs')).toBeInTheDocument();

    // Verifica se os componentes de lista estão sendo renderizados
    expect(container.textContent).toContain('List Theory - ldse');
    expect(container.textContent).toContain('List Visualization - ldse');
    expect(container.textContent).toContain('List Activity - ldse');
    expect(container.textContent).toContain('List Challenge - ldse');
  });
});
