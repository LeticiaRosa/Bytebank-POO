import { DomInject } from "../decorators/domInject.js";
import { FormatoData } from "../types/FormatoData.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";
import Conta from "./Conta.js";

export class Extrato {

  gruposTransacoes: GrupoTransacao[]
  @DomInject(".extrato .registro-transacoes")
  elementoRegistroTransacoesExtrato: HTMLElement
  htmlRegistroTransacoes: string = "";

  constructor() {
    this.gruposTransacoes = Conta.getGruposTransacoes();
    this.reinderizarExtrato();
    this.elementoRegistroTransacoesExtrato.innerHTML = this.htmlRegistroTransacoes;
  }
  
  reinderizarExtrato(): void {
    for (let grupoTransacao of this.gruposTransacoes)
        {
            let htmlTransacaoItem: string = "";
            for (let transacao of grupoTransacao.transacoes)
            {
                htmlTransacaoItem += `
                    <div class="transacao-item">
                        <div class="transacao-info">
                            <span class="tipo">${transacao.tipoTransacao}</span>
                            <strong class="valor">${formatarMoeda(transacao.valor)}</strong>
                        </div>
                        <time class="data">${formatarData(transacao.data, FormatoData.DIA_MES)}</time>
                    </div>
                `;
            }
    
            this.htmlRegistroTransacoes += `
                <div class="transacoes-group">
                    <strong class="mes-group">${grupoTransacao.label}</strong>
                    ${htmlTransacaoItem}
                </div>
            `;
        }
    
        if (this.htmlRegistroTransacoes === "") {
          this.htmlRegistroTransacoes = "<div>Não há transações registradas.</div>";
        }
  }
     
}
const Extrato1 = new Extrato();
export default Extrato1;