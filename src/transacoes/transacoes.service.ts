import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarTransacaoDto } from './dto/criar-transacao.dto';
import { Transacao, TransacaoDocument } from './schemas/transacao.schema';

export interface Metricas { saldoTotal: number; totalDespesas: number; totalGastoImpulso: number; }

@Injectable()
export class TransacoesService {
  constructor(@InjectModel(Transacao.name) private readonly model: Model<TransacaoDocument>) {}

  criar(dto: CriarTransacaoDto) { return this.model.create(dto); }

  async listarComMetricas() {
    const historico = await this.model.find().sort({ createdAt: -1 }).exec();
    const metricas = historico.reduce<Metricas>((acc, item) => {
      const valor = Number(item.valor);
      if (item.tipo === 'receita') acc.saldoTotal += valor;
      else {
        acc.saldoTotal -= valor;
        acc.totalDespesas += valor;
        if (item.consumoConsciente === false) acc.totalGastoImpulso += valor;
      }
      return acc;
    }, { saldoTotal: 0, totalDespesas: 0, totalGastoImpulso: 0 });
    return { historico, metricas };
  }
}
