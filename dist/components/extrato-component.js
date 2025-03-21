import Conta from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { formatarMoeda, formatarData } from "../utils/formatters.js";
var elementoRegistroTransacoesExtrato = document.querySelector(".extrato .registro-transacoes");
renderizarExtrato();
function renderizarExtrato() {
    var gruposTransacoes = Conta.getGruposTransacoes();
    elementoRegistroTransacoesExtrato.innerHTML = "";
    var htmlRegistroTransacoes = "";
    for (var _i = 0, gruposTransacoes_1 = gruposTransacoes; _i < gruposTransacoes_1.length; _i++) {
        var grupoTransacao = gruposTransacoes_1[_i];
        var htmlTransacaoItem = "";
        for (var _a = 0, _b = grupoTransacao.transacoes; _a < _b.length; _a++) {
            var transacao = _b[_a];
            htmlTransacaoItem += "\n                <div class=\"transacao-item\">\n                    <div class=\"transacao-info\">\n                        <span class=\"tipo\">".concat(transacao.tipoTransacao, "</span>\n                        <strong class=\"valor\">").concat(formatarMoeda(transacao.valor), "</strong>\n                    </div>\n                    <time class=\"data\">").concat(formatarData(transacao.data, FormatoData.DIA_MES), "</time>\n                </div>\n            ");
        }
        htmlRegistroTransacoes += "\n            <div class=\"transacoes-group\">\n                <strong class=\"mes-group\">".concat(grupoTransacao.label, "</strong>\n                ").concat(htmlTransacaoItem, "\n            </div>\n        ");
    }
    if (htmlRegistroTransacoes === "") {
        htmlRegistroTransacoes = "<div>Não há transações registradas.</div>";
    }
    elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacoes;
}
var ExtratoComponent = {
    atualizar: function () {
        renderizarExtrato();
    }
};
export default ExtratoComponent;
