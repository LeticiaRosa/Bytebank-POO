import { TransacaoType } from "../types/Transacao.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import Conta from "../controllers/Conta.js";
import Extrato from "../controllers/Extrato.js";
import Saldo from "../controllers/Saldo.js";

const elementoFormulario = document.querySelector(".block-nova-transacao form") as HTMLFormElement;
elementoFormulario.addEventListener("submit", function(event) {
    try 
    {
        event.preventDefault();
        if (!elementoFormulario.checkValidity()) {
            alert("Por favor, preencha todos os campos da transação!");
            return;
        }
        const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao") as HTMLSelectElement;
        const inputValor = elementoFormulario.querySelector("#valor") as HTMLInputElement;
        const inputData = elementoFormulario.querySelector("#data") as HTMLInputElement;

        let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
        let valor: number = inputValor.valueAsNumber;
        let data: Date = new Date(inputData.value + " 00:00:00");

        const novaTransacao: TransacaoType = {
            tipoTransacao: tipoTransacao,
            valor: valor, 
            data: data,
        }

        Conta.registrarTransacao(novaTransacao);
        Saldo.reinderizarSaldo();
        Extrato.reinderizarExtrato();
        elementoFormulario.reset();
    }
    catch(erro) {
        alert(erro.message);
    }
});