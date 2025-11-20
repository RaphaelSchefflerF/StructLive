import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ListActivity from '../list-activity';

// Mock dos componentes de atividade
vi.mock('../../types/lc/activity', () => ({
  default: () => <div data-testid="lc-activity">LC Activity</div>,
}));
vi.mock('../../types/ldde/activity', () => ({
  default: () => <div data-testid="ldde-activity">LDDE Activity</div>,
}));
vi.mock('../../types/ldse/activity', () => ({
  default: () => <div data-testid="ldse-activity">LDSE Activity</div>,
}));
vi.mock('../../types/lee/activity', () => ({
  default: () => <div data-testid="lee-activity">LEE Activity</div>,
}));
vi.mock('../../types/les/activity', () => ({
  default: () => <div data-testid="les-activity">LES Activity</div>,
}));

describe('ListActivity', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar LcActivity quando tipo é "lc"', () => {
    render(<ListActivity tipo="lc" />);

    expect(screen.getByTestId('lc-activity')).toBeInTheDocument();
    expect(screen.getByText('LC Activity')).toBeInTheDocument();
  });

  it('deve renderizar LddeActivity quando tipo é "ldde"', () => {
    render(<ListActivity tipo="ldde" />);

    expect(screen.getByTestId('ldde-activity')).toBeInTheDocument();
    expect(screen.getByText('LDDE Activity')).toBeInTheDocument();
  });

  it('deve renderizar LdseActivity quando tipo é "ldse"', () => {
    render(<ListActivity tipo="ldse" />);

    expect(screen.getByTestId('ldse-activity')).toBeInTheDocument();
    expect(screen.getByText('LDSE Activity')).toBeInTheDocument();
  });

  it('deve renderizar LeeActivity quando tipo é "lee"', () => {
    render(<ListActivity tipo="lee" />);

    expect(screen.getByTestId('lee-activity')).toBeInTheDocument();
    expect(screen.getByText('LEE Activity')).toBeInTheDocument();
  });

  it('deve renderizar LesActivity quando tipo é "les"', () => {
    render(<ListActivity tipo="les" />);

    expect(screen.getByTestId('les-activity')).toBeInTheDocument();
    expect(screen.getByText('LES Activity')).toBeInTheDocument();
  });

  it('deve renderizar mensagem padrão quando tipo não é reconhecido', () => {
    render(<ListActivity tipo="unknown" />);

    expect(
      screen.getByText(
        'Selecione um tipo de lista para ver o conteúdo da atividade.',
      ),
    ).toBeInTheDocument();
  });

  it('deve renderizar mensagem padrão quando tipo é vazio', () => {
    render(<ListActivity tipo="" />);

    expect(
      screen.getByText(
        'Selecione um tipo de lista para ver o conteúdo da atividade.',
      ),
    ).toBeInTheDocument();
  });
});
