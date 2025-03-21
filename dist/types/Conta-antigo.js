import { TipoTransacao } from "./TipoTransacao.js";
var saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
var transacoes = JSON.parse(localStorage.getItem("transacoes"), function (key, value) {
    if (key === "data") {
        return new Date(value);
    }
    return value;
}) || [];
function debitar(valor) {
    if (valor <= 0) {
        throw new Error("O valor a ser debitado deve ser maior que zero!");
    }
    if (valor > saldo) {
        throw new Error("Saldo insuficiente!");
    }
    saldo -= valor;
    localStorage.setItem("saldo", saldo.toString());
}
function depositar(valor) {
    if (valor <= 0) {
        throw new Error("O valor a ser depositado deve ser maior que zero!");
    }
    saldo += valor;
    localStorage.setItem("saldo", saldo.toString());
}
var Conta = {
    getSaldo: function () {
        return saldo;
    },
    getDataAcesso: function () {
        return new Date();
    },
    getGruposTransacoes: function () {
        var gruposTransacoes = [];
        var listaTransacoes = structuredClone(transacoes);
        var transacoesOrdenadas = listaTransacoes.sort(function (t1, t2) { return t2.data.getTime() - t1.data.getTime(); });
        var labelAtualGrupoTransacao = "";
        for (var _i = 0, transacoesOrdenadas_1 = transacoesOrdenadas; _i < transacoesOrdenadas_1.length; _i++) {
            var transacao = transacoesOrdenadas_1[_i];
            var labelGrupoTransacao = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            // gruposTransacoes.at(-1).transacoes.push(transacao);
        }
        return gruposTransacoes;
    },
    registrarTransacao: function (novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else {
            throw new Error("Tipo de Transação é inválido!");
        }
        transacoes.push(novaTransacao);
        console.log(this.getGruposTransacoes());
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    }
};
export default Conta;
