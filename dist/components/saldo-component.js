import { formatarData, formatarMoeda } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import Conta from "../types/Conta.js";
var elementoSaldo = document.querySelector(".saldo-valor .valor");
var elementoDataAcesso = document.querySelector(".block-saldo time");
if (elementoDataAcesso != null) {
    elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
}
renderizarSaldo();
function renderizarSaldo() {
    if (elementoSaldo != null) {
        console.log(formatarMoeda(Conta.getSaldo()));
        elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
    }
}
var SaldoComponent = {
    atualizar: function () {
        renderizarSaldo();
    }
};
export default SaldoComponent;
