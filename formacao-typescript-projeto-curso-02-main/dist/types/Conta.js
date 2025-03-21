var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Armazenador } from "./Armazenador.js";
import { ValidaDebito, ValidaDeposito } from "./Decorator.js";
import { TipoTransacao } from "./TipoTransacao.js";
export var Conta = /** @class */ (function () {
    function Conta(nome) {
        this.saldo = Armazenador.obter("saldo") || 0;
        this.transacoes = JSON.parse(Armazenador.obter("transacoes", function (key, value) {
            if (key === "data") {
                return new Date(value);
            }
            return value;
        }))
            || [];
        this.nome = nome;
    }
    Conta.prototype.getGruposTransacoes = function () {
        var _a;
        var gruposTransacoes = [];
        var listaTransacoes = this.transacoes;
        var transacoesOrdenadas = listaTransacoes.sort(function (a, b) { return new Date(b.data).getTime() - new Date(a.data).getTime(); });
        var labelAtualGrupoTransacao = "";
        for (var _i = 0, transacoesOrdenadas_1 = transacoesOrdenadas; _i < transacoesOrdenadas_1.length; _i++) {
            var transacao = transacoesOrdenadas_1[_i];
            var labelGrupoTransacao = (_a = new Date(transacao.data)) === null || _a === void 0 ? void 0 : _a.toLocaleDateString("pt-br", {
                month: "long",
                year: "numeric",
            });
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: [],
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }
        return gruposTransacoes;
    };
    Conta.prototype.getSaldo = function () {
        return this.saldo;
    };
    Conta.prototype.getDataAcesso = function () {
        return new Date();
    };
    Conta.prototype.registrarTransacao = function (novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA ||
            novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else {
            throw new Error("Tipo de Transação é inválido!");
        }
        this.transacoes.push(novaTransacao);
        Armazenador.salvar("transacoes", JSON.stringify(this.transacoes));
    };
    Conta.prototype.debitar = function (valor) {
        this.saldo -= valor;
        Armazenador.salvar("saldo", this.saldo.toString());
    };
    Conta.prototype.depositar = function (valor) {
        this.saldo += valor;
        Armazenador.salvar("saldo", this.saldo.toString());
    };
    __decorate([
        ValidaDebito
    ], Conta.prototype, "debitar", null);
    __decorate([
        ValidaDeposito
    ], Conta.prototype, "depositar", null);
    return Conta;
}());
var ContaPremium = /** @class */ (function (_super) {
    __extends(ContaPremium, _super);
    function ContaPremium() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContaPremium.prototype.registrarTransacao = function (transacao) {
        if (transacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            console.log("Ganhou um bonus de 0.50 centavois");
            transacao.valor += 0.5;
        }
        _super.prototype.registrarTransacao.call(this, transacao);
    };
    return ContaPremium;
}(Conta));
export { ContaPremium };
var Conta1 = new Conta("Conta Corrente");
export default Conta1;
