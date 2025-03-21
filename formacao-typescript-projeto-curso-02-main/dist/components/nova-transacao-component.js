import SaldoComponent from "./saldo-component.js";
import Conta from "../types/Conta.js";
import ExtratoComponent from "./extrato-component.js";
var elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario.addEventListener("submit", function (event) {
    try {
        event.preventDefault();
        if (!elementoFormulario.checkValidity()) {
            alert("Por favor, preencha todos os campos da transação!");
            return;
        }
        var inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao");
        var inputValor = elementoFormulario.querySelector("#valor");
        var inputData = elementoFormulario.querySelector("#data");
        var tipoTransacao = inputTipoTransacao.value;
        var valor = inputValor.valueAsNumber;
        var data = new Date(inputData.value + " 00:00:00");
        var novaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data,
        };
        Conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
        elementoFormulario.reset();
    }
    catch (erro) {
        alert(erro.message);
    }
});
