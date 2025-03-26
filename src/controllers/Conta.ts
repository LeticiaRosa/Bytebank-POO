import { ValidaDebito } from "../decorators/validaDebito.js";
import { ValidaDeposito } from "../decorators/validaDeposito.js";
import { Armazenador } from "../types/Armazenador.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { TransacaoType } from "../types/Transacao.js";

export class Conta {
  protected nome: string;
  protected saldo: number = Armazenador.obter<number>("saldo") || 0;
  private transacoes: TransacaoType[] =
   JSON.parse(Armazenador.obter("transacoes",
      (key: string, value: string) => {
        if (key === "data") {
          return new Date(value);
        }
        return value;
      }
    ) )
    || [];
  
  constructor(nome: string) {
    this.nome = nome;
  }

  getGruposTransacoes(): GrupoTransacao[] {
    const gruposTransacoes: GrupoTransacao[] = [];
    const listaTransacoes: TransacaoType[] = this.transacoes ;
    const transacoesOrdenadas = listaTransacoes.sort((a, b) =>  new Date(b.data).getTime() - new Date(a.data).getTime());


    let labelAtualGrupoTransacao: string = "";

    for (let transacao of transacoesOrdenadas) {
      let labelGrupoTransacao: string = new Date(transacao.data)?.toLocaleDateString("pt-br", {
        month: "long",
        year: "numeric",
      });
      if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
        labelAtualGrupoTransacao = labelGrupoTransacao;
        gruposTransacoes.push({
          label: labelGrupoTransacao,
          transacoes: [],
        });
      }
      gruposTransacoes.at(-1).transacoes.push(transacao);
    }

    return gruposTransacoes;
  }

  getSaldo() {
    return this.saldo;
  }

  getDataAcesso(): Date {
    return new Date();
  }

  registrarTransacao(novaTransacao: TransacaoType): void {
    console.log(novaTransacao);
    if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
      this.depositar(novaTransacao.valor);
    } else if (
      novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA ||
      novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO
    ) {
      this.debitar(novaTransacao.valor);
      novaTransacao.valor *= -1;
    } else {
      throw new Error("Tipo de Transação é inválido!");
    }

    this.transacoes.push(novaTransacao);
    Armazenador.salvar("transacoes", JSON.stringify(this.transacoes));
  }

  @ValidaDebito
  debitar(valor: number): void {
    this.saldo -= valor;
    Armazenador.salvar("saldo", this.saldo.toString());
  }

  @ValidaDeposito
  depositar(valor: number): void {
    this.saldo += valor;
    Armazenador.salvar("saldo", this.saldo.toString());
  }
}

export class ContaPremium extends Conta {
  registrarTransacao(transacao: TransacaoType): void {
    if (transacao.tipoTransacao === TipoTransacao.DEPOSITO) {
      console.log("Ganhou um bonus de 0.50 centavois");
      transacao.valor += 0.5;
    }
    super.registrarTransacao(transacao);
  }
}

const Conta1 = new Conta("Conta Corrente");
export default Conta1;
