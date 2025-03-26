import { TipoTransacao } from "./TipoTransacao.js";

export type TransacaoType = {
    tipoTransacao: TipoTransacao;
    valor: number;
    data: Date;
}