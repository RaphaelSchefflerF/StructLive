import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ListTheory from '../list-theory';

// Mock dos componentes de teoria
vi.mock('../../types/lc/theory', () => ({
  default: () => <div data-testid="lc-theory">LC Theory</div>,
}));
vi.mock('../../types/ldse/theory', () => ({
  default: () => <div data-testid="ldse-theory">LDSE Theory</div>,
}));
vi.mock('../../types/ldde/theory', () => ({
  default: () => <div data-testid="ldde-theory">LDDE Theory</div>,
}));
vi.mock('../../types/lee/theory', () => ({
  default: () => <div data-testid="lee-theory">LEE Theory</div>,
}));
vi.mock('../../types/les/theory', () => ({
  default: () => <div data-testid="les-theory">LES Theory</div>,
}));

describe('ListTheory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar LcTheory quando tipo é "lc"', () => {
    render(<ListTheory tipo="lc" />);

    expect(screen.getByTestId('lc-theory')).toBeInTheDocument();
    expect(screen.getByText('LC Theory')).toBeInTheDocument();
  });

  it('deve renderizar LdseTheory quando tipo é "ldse"', () => {
    render(<ListTheory tipo="ldse" />);

    expect(screen.getByTestId('ldse-theory')).toBeInTheDocument();
    expect(screen.getByText('LDSE Theory')).toBeInTheDocument();
  });

  it('deve renderizar LddeTheory quando tipo é "ldde"', () => {
    render(<ListTheory tipo="ldde" />);

    expect(screen.getByTestId('ldde-theory')).toBeInTheDocument();
    expect(screen.getByText('LDDE Theory')).toBeInTheDocument();
  });

  it('deve renderizar LeeTheory quando tipo é "lee"', () => {
    render(<ListTheory tipo="lee" />);

    expect(screen.getByTestId('lee-theory')).toBeInTheDocument();
    expect(screen.getByText('LEE Theory')).toBeInTheDocument();
  });

  it('deve renderizar LesTheory quando tipo é "les"', () => {
    render(<ListTheory tipo="les" />);

    expect(screen.getByTestId('les-theory')).toBeInTheDocument();
    expect(screen.getByText('LES Theory')).toBeInTheDocument();
  });

  it('deve renderizar mensagem padrão quando tipo não é reconhecido', () => {
    render(<ListTheory tipo="xyz" />);

    expect(
      screen.getByText(
        'Selecione um tipo de lista para ver o conteúdo teórico.',
      ),
    ).toBeInTheDocument();
  });

  it('deve renderizar mensagem padrão quando tipo é undefined', () => {
    render(<ListTheory tipo={undefined as any} />);

    expect(
      screen.getByText(
        'Selecione um tipo de lista para ver o conteúdo teórico.',
      ),
    ).toBeInTheDocument();
  });

  it('deve aceitar props adicionales sem quebrar', () => {
    const extraProps = { 'data-testid': 'theory-container' };
    render(<ListTheory tipo="ldse" {...extraProps} />);

    expect(screen.getByTestId('ldse-theory')).toBeInTheDocument();
  });
});
