import { DomInject } from "../decorators/domInject.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { TransacaoType } from "../types/Transacao.js";
import Conta from "./Conta.js";
import Extrato from "./Extrato.js";
import Saldo from "./Saldo.js";

export class Transacao {
  @DomInject(".block-nova-transacao form")
  elementoFormulario: HTMLFormElement;
  @DomInject("#tipoTransacao")
  inputTipoTransacao: HTMLSelectElement;
  @DomInject("#valor")
  inputValor: HTMLInputElement;    
  @DomInject("#data")
  inputData: HTMLInputElement;    
  novaTransacao: TransacaoType; 
  
  constructor() {
    this.elementoFormulario.addEventListener("submit", (event) => {
      try 
      {
          event.preventDefault();
          if (!this.elementoFormulario.checkValidity()) {
              alert("Por favor, preencha todos os campos da transação!");
              return;
          }
  
          this.novaTransacao = {
              tipoTransacao: this.inputTipoTransacao.value as TipoTransacao,
              valor: this.inputValor.valueAsNumber, 
              data: new Date(this.inputData.value + " 00:00:00"),
          }
  
          Conta.registrarTransacao(this.novaTransacao);
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

const Transacao1 = new Transacao();

export default Transacao1;