class Pagamento {
    constructor(id, idAssinatura, valorPago, metodo) {
        this.ID_Pagamento         = id;
        this.ID_Assinatura        = Number(idAssinatura);
        this.ValorPago            = Number(valorPago);
        this.DataPagamento        = new Date().toLocaleDateString('pt-BR');
        this.MetodoPagamento      = metodo;
        this.Id_Transacao_Gateway = 'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    }
}
