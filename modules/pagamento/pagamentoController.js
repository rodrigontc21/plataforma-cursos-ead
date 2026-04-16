class PagamentoController {
    constructor() {
        this.key    = 'plataforma_pagamentos';
        this.metodos = ['PIX', 'Cartão', 'Boleto'];
    }

    listarTodos() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    salvarNoStorage(lista) {
        localStorage.setItem(this.key, JSON.stringify(lista));
    }

    validar(idAssinatura, valorPago, metodo) {
        if (!new AssinaturaController().buscarPorId(idAssinatura))
            throw new Error('Assinatura inválida.');
        if (Number(valorPago) < 0.01)
            throw new Error('Valor pago deve ser maior que zero.');
        if (!this.metodos.includes(metodo))
            throw new Error('Método de pagamento inválido. Use: PIX, Cartão ou Boleto.');
    }

    registrar(idAssinatura, valorPago, metodo) {
        this.validar(idAssinatura, valorPago, metodo);
        const lista = this.listarTodos();
        const novo  = new Pagamento(
            gerarId(lista, 'ID_Pagamento'),
            idAssinatura,
            valorPago,
            metodo
        );
        lista.push(novo);
        this.salvarNoStorage(lista);
        return novo;
    }

    buscarPorAssinatura(idAssinatura) {
        return this.listarTodos().find(p => p.ID_Assinatura === Number(idAssinatura)) || null;
    }

    listarPorAssinatura(idAssinatura) {
        return this.listarTodos().filter(p => p.ID_Assinatura === Number(idAssinatura));
    }

    remover(id) {
        const lista = this.listarTodos().filter(p => p.ID_Pagamento !== Number(id));
        this.salvarNoStorage(lista);
    }
}
