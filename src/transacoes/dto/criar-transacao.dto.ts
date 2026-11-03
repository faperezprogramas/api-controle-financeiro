import { IsBoolean, IsIn, IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CriarTransacaoDto {
  @IsString() @MinLength(1) descricao: string;
  @IsNumber({ maxDecimalPlaces: 2 }) @Min(0.01) valor: number;
  @IsIn(['receita', 'despesa']) tipo: 'receita' | 'despesa';
  @IsString() @MinLength(1) categoria: string;
  @IsBoolean() consumoConsciente: boolean;
}
