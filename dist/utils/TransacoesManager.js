var transacoes = JSON.parse(localStorage.getItem('transacoes'), function (key, value) {
    if (key === 'data') {
        return new Date(value);
    }
    return value;
}) || [];
export var TransacoesManager = {
    registrarTransacao: function (novaTransacao) {
        transacoes.push(novaTransacao);
    },
    getTransacoes: function () {
        return Array.from(transacoes);
    }
};
