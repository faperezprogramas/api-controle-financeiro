import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriarTransacaoDto } from './dto/criar-transacao.dto';
import { TransacoesService } from './transacoes.service';

@Controller('transacoes')
export class TransacoesController {
  constructor(private readonly transacoesService: TransacoesService) {}

  @Post()
  criar(@Body() dto: CriarTransacaoDto) { return this.transacoesService.criar(dto); }

  @Get()
  listar() { return this.transacoesService.listarComMetricas(); }
}
