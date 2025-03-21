import { FormatoData } from "../types/FormatoData.js";
export function formatarMoeda(valor) {
    var _a;
    return (_a = Number(valor)) === null || _a === void 0 ? void 0 : _a.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}
export function formatarData(data, formato) {
    var _a, _b;
    if (formato === void 0) { formato = FormatoData.PADRAO; }
    if (formato === FormatoData.DIA_SEMANA_DIA_MES_ANO) {
        return (_a = new Date(data)) === null || _a === void 0 ? void 0 : _a.toLocaleDateString("pt-br", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }
    else if (formato === FormatoData.DIA_MES) {
        return (_b = new Date(data)) === null || _b === void 0 ? void 0 : _b.toLocaleDateString("pt-br", { day: "2-digit", month: "2-digit" });
    }
    return data.toLocaleDateString("pt-br");
}
