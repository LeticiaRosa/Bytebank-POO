import { DomInject } from "../decorators/domInject.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { TransacaoType } from "../types/Transacao.js";
import Conta from "./Conta.js"; // Correção do caminho
import Extrato from "./Extrato.js";
import Saldo from "./Saldo.js";

class Transacao {
  @DomInject(".block-nova-transacao form")
  private elementoFormulario: HTMLFormElement;
  @DomInject("#tipoTransacao")
  private inputTipoTransacao: HTMLSelectElement;
  @DomInject("#valor")
  private inputValor: HTMLInputElement;    
  @DomInject("#data")
  private inputData: HTMLInputElement;    
  
  constructor() {
    this.elementoFormulario.addEventListener("submit", (event) => {
      try 
      {
          event.preventDefault();
          if (!this.elementoFormulario.checkValidity()) {
              alert("Por favor, preencha todos os campos da transação!");
              return;
          }
  
          let novaTransacao: TransacaoType = {
              tipoTransacao: this.inputTipoTransacao.value as TipoTransacao,
              valor: this.inputValor.valueAsNumber, 
              data: new Date(this.inputData.value + " 00:00:00"),
          }
          Conta.registrarTransacao(novaTransacao);
          Saldo.reinderizarSaldo();
          Extrato.reinderizarExtrato();
          this.elementoFormulario.reset();
      }
      catch(erro) {
          alert(erro.message);
      }
    })
  }
}

export default new Transacao();