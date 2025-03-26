import { TransacaoType } from "./Transacao.js";

export type GrupoTransacao = {
    label: string;
    transacoes: TransacaoType[];
}