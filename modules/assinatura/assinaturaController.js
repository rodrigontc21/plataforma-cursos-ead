class AssinaturaController {
    constructor() {
        this.key = 'plataforma_assinaturas';
    }

    listarTodos() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    salvarNoStorage(lista) {
        localStorage.setItem(this.key, JSON.stringify(lista));
    }

    _parseData(strDDMMYYYY) {
        const [d, m, y] = strDDMMYYYY.split('/');
        return new Date(Number(y), Number(m) - 1, Number(d));
    }

    estaAtiva(assinatura) {
        return this._parseData(assinatura.DataFim) >= new Date();
    }

    validarAcesso(idUsuario) {
        const temAtiva = this.listarTodos().some(
            a => a.ID_Usuario === Number(idUsuario) && this.estaAtiva(a)
        );
        if (!temAtiva)
            throw new Error('Acesso negado: Este curso exige uma assinatura ativa.');
    }

    verificarAtivaParaPlano(idUsuario, idPlano) {
        return this.listarTodos().some(
            a => a.ID_Usuario === Number(idUsuario) &&
                 a.ID_Plano   === Number(idPlano)   &&
                 this.estaAtiva(a)
        );
    }

    assinar(idUsuario, idPlano) {
        if (!new UsuarioController().buscarPorId(idUsuario))
            throw new Error('Usuário não encontrado.');
        const plano = new PlanoController().buscarPorId(idPlano);
        if (!plano)
            throw new Error('Plano não encontrado.');
        if (this.verificarAtivaParaPlano(idUsuario, idPlano))
            throw new Error(`O usuário já possui uma assinatura ativa no plano "${plano.Nome}".`);

        const inicio = new Date();
        const fim    = new Date(inicio);
        fim.setMonth(fim.getMonth() + plano.DuracaoMeses);

        const lista = this.listarTodos();
        const nova  = new Assinatura(
            gerarId(lista, 'ID_Assinatura'),
            idUsuario,
            idPlano,
            inicio.toLocaleDateString('pt-BR'),
            fim.toLocaleDateString('pt-BR')
        );
        lista.push(nova);
        this.salvarNoStorage(lista);
        return nova;
    }

    buscarPorId(id) {
        return this.listarTodos().find(a => a.ID_Assinatura === Number(id)) || null;
    }

    listarPorUsuario(idUsuario) {
        return this.listarTodos()
            .filter(a => a.ID_Usuario === Number(idUsuario))
            .sort((a, b) => b.ID_Assinatura - a.ID_Assinatura);
    }

    remover(id) {
        const lista = this.listarTodos().filter(a => a.ID_Assinatura !== Number(id));
        this.salvarNoStorage(lista);
    }
}
