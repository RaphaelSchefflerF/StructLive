import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ListChallenge from '../list-challenge';

// Mock dos componentes de desafio
vi.mock('../../types/lc/challenge', () => ({
  default: () => <div data-testid="lc-challenge">LC Challenge</div>,
}));
vi.mock('../../types/ldde/challenge', () => ({
  default: () => <div data-testid="ldde-challenge">LDDE Challenge</div>,
}));
vi.mock('../../types/ldse/challenge', () => ({
  default: () => <div data-testid="ldse-challenge">LDSE Challenge</div>,
}));
vi.mock('../../types/lee/challenge', () => ({
  default: () => <div data-testid="lee-challenge">LEE Challenge</div>,
}));
vi.mock('../../types/les/challenge', () => ({
  default: () => <div data-testid="les-challenge">LES Challenge</div>,
}));

describe('ListChallenge', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar LcChallenge quando tipo é "lc"', () => {
    render(<ListChallenge tipo="lc" />);

    expect(screen.getByTestId('lc-challenge')).toBeInTheDocument();
    expect(screen.getByText('LC Challenge')).toBeInTheDocument();
  });

  it('deve renderizar LddeChallenge quando tipo é "ldde"', () => {
    render(<ListChallenge tipo="ldde" />);

    expect(screen.getByTestId('ldde-challenge')).toBeInTheDocument();
    expect(screen.getByText('LDDE Challenge')).toBeInTheDocument();
  });

  it('deve renderizar LdseChallenge quando tipo é "ldse"', () => {
    render(<ListChallenge tipo="ldse" />);

    expect(screen.getByTestId('ldse-challenge')).toBeInTheDocument();
    expect(screen.getByText('LDSE Challenge')).toBeInTheDocument();
  });

  it('deve renderizar LeeChallenge quando tipo é "lee"', () => {
    render(<ListChallenge tipo="lee" />);

    expect(screen.getByTestId('lee-challenge')).toBeInTheDocument();
    expect(screen.getByText('LEE Challenge')).toBeInTheDocument();
  });

  it('deve renderizar LesChallenge quando tipo é "les"', () => {
    render(<ListChallenge tipo="les" />);

    expect(screen.getByTestId('les-challenge')).toBeInTheDocument();
    expect(screen.getByText('LES Challenge')).toBeInTheDocument();
  });

  it('deve renderizar mensagem padrão quando tipo não é reconhecido', () => {
    render(<ListChallenge tipo="invalid" />);

    expect(
      screen.getByText(
        'Selecione um tipo de lista para ver o conteúdo teórico.',
      ),
    ).toBeInTheDocument();
  });

  it('deve renderizar mensagem padrão quando tipo é null', () => {
    render(<ListChallenge tipo={null as any} />);

    expect(
      screen.getByText(
        'Selecione um tipo de lista para ver o conteúdo teórico.',
      ),
    ).toBeInTheDocument();
  });

  it('deve tratar corretamente props tipo como string', () => {
    const props = { tipo: 'ldse' };
    render(<ListChallenge {...props} />);

    expect(screen.getByTestId('ldse-challenge')).toBeInTheDocument();
  });
});
