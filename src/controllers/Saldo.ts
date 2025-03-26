import { formatarData, formatarMoeda } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import Conta from "../types/Conta.js";
import { DomInject } from "../decorators/domInject.js";

export class Saldo {
  @DomInject(".saldo-valor .valor")
    elementoSaldo: HTMLElement;
  @DomInject(".block-saldo time")
    elementoDataAcesso: HTMLElement;  

    constructor() {
      this.reinderizarSaldo();
      this.reinderizarDataAcesso();
    }

  reinderizarSaldo(): void {
      if (this.elementoSaldo != null) {
          this.elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
      }
  }
  reinderizarDataAcesso(): void {
    if (this.elementoDataAcesso != null) {
        this.elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
    }
  }
}
const Saldo1 = new Saldo();
export default Saldo1;