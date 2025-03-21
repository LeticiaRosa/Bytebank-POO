var Armazenador = /** @class */ (function () {
    function Armazenador() {
    }
    Armazenador.salvar = function (chave, valor) {
        var valorComoString = JSON.stringify(valor);
        localStorage.setItem(chave, valorComoString);
    };
    Armazenador.obter = function (chave, reviver) {
        var valor = localStorage.getItem(chave);
        console.log("localStorage", valor);
        if (valor === null) {
            return null;
        }
        if (reviver) {
            console.log(JSON.parse(valor, reviver));
            return JSON.parse(valor, reviver);
        }
        return JSON.parse(valor);
    };
    return Armazenador;
}());
export { Armazenador };
