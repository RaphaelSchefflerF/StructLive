import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ListVisualization from '../list-visualization';

// Mock dos componentes de visualização
vi.mock('../../types/lc/visualization', () => ({
  default: () => <div data-testid="lc-visualization">LC Visualization</div>,
}));
vi.mock('../../types/ldde/visualization', () => ({
  default: () => <div data-testid="ldde-visualization">LDDE Visualization</div>,
}));
vi.mock('../../types/ldse/visualization', () => ({
  default: () => <div data-testid="ldse-visualization">LDSE Visualization</div>,
}));
vi.mock('../../types/lee/visualization', () => ({
  default: () => <div data-testid="lee-visualization">LEE Visualization</div>,
}));
vi.mock('../../types/les/visualization', () => ({
  default: () => <div data-testid="les-visualization">LES Visualization</div>,
}));

describe('ListVisualization', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar LcVisualization quando tipo é "lc"', () => {
    render(<ListVisualization tipo="lc" />);

    expect(screen.getByTestId('lc-visualization')).toBeInTheDocument();
    expect(screen.getByText('LC Visualization')).toBeInTheDocument();
  });

  it('deve renderizar LddeVisualization quando tipo é "ldde"', () => {
    render(<ListVisualization tipo="ldde" />);

    expect(screen.getByTestId('ldde-visualization')).toBeInTheDocument();
    expect(screen.getByText('LDDE Visualization')).toBeInTheDocument();
  });

  it('deve renderizar LdseVisualization quando tipo é "ldse"', () => {
    render(<ListVisualization tipo="ldse" />);

    expect(screen.getByTestId('ldse-visualization')).toBeInTheDocument();
    expect(screen.getByText('LDSE Visualization')).toBeInTheDocument();
  });

  it('deve renderizar LeeVisualization quando tipo é "lee"', () => {
    render(<ListVisualization tipo="lee" />);

    expect(screen.getByTestId('lee-visualization')).toBeInTheDocument();
    expect(screen.getByText('LEE Visualization')).toBeInTheDocument();
  });

  it('deve renderizar LesVisualization quando tipo é "les"', () => {
    render(<ListVisualization tipo="les" />);

    expect(screen.getByTestId('les-visualization')).toBeInTheDocument();
    expect(screen.getByText('LES Visualization')).toBeInTheDocument();
  });

  it('deve renderizar mensagem padrão quando tipo não é reconhecido', () => {
    render(<ListVisualization tipo="unknown-type" />);

    expect(
      screen.getByText(
        'Selecione um tipo de lista para ver o conteúdo teórico.',
      ),
    ).toBeInTheDocument();
  });

  it('deve renderizar mensagem padrão quando tipo é string vazia', () => {
    render(<ListVisualization tipo="" />);

    expect(
      screen.getByText(
        'Selecione um tipo de lista para ver o conteúdo teórico.',
      ),
    ).toBeInTheDocument();
  });

  it('deve funcionar com diferentes casos de tipos válidos', () => {
    const tiposValidos = ['lc', 'ldde', 'ldse', 'lee', 'les'];

    tiposValidos.forEach((tipo) => {
      const { unmount } = render(<ListVisualization tipo={tipo} />);
      expect(screen.getByTestId(`${tipo}-visualization`)).toBeInTheDocument();
      unmount();
    });
  });

  it('deve não quebrar com props tipo como number', () => {
    render(<ListVisualization tipo={123 as any} />);

    expect(
      screen.getByText(
        'Selecione um tipo de lista para ver o conteúdo teórico.',
      ),
    ).toBeInTheDocument();
  });
});
