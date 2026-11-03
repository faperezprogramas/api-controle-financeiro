import { TransacoesService } from '../src/transacoes/transacoes.service';

describe('TransacoesService', () => {
  const registros = [
    { descricao: 'Salário', valor: 2000, tipo: 'receita', consumoConsciente: true },
    { descricao: 'Luz', valor: 150, tipo: 'despesa', consumoConsciente: true },
    { descricao: 'Compra por impulso', valor: 80, tipo: 'despesa', consumoConsciente: false },
  ];
  const model: any = {
    find: jest.fn(() => ({ sort: jest.fn().mockReturnThis(), exec: jest.fn().mockResolvedValue(registros) })),
    create: jest.fn(),
  };

  it('retorna histórico e métricas consolidadas', async () => {
    const result = await new TransacoesService(model).listarComMetricas();
    expect(result.historico).toHaveLength(3);
    expect(result.metricas).toEqual({ saldoTotal: 1770, totalDespesas: 230, totalGastoImpulso: 80 });
  });

  it('calcula métricas zeradas para histórico vazio', async () => {
    model.find.mockImplementationOnce(() => ({ sort: jest.fn().mockReturnThis(), exec: jest.fn().mockResolvedValue([]) }));
    const result = await new TransacoesService(model).listarComMetricas();
    expect(result.metricas).toEqual({ saldoTotal: 0, totalDespesas: 0, totalGastoImpulso: 0 });
  });
});
