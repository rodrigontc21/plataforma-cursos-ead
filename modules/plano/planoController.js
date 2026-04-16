class PlanoController {
    constructor() {
        this.key = 'plataforma_planos';
    }

    listarTodos() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    salvarNoStorage(lista) {
        localStorage.setItem(this.key, JSON.stringify(lista));
    }

    inicializarSemente() {
        if (this.listarTodos().length > 0) return;
        [
            ['Básico',   'Acesso a cursos essenciais da plataforma.',     29.90,  1],
            ['Pro',      'Acesso ilimitado a todos os cursos por 3 meses.', 59.90,  3],
            ['Premium',  'Acesso total e suporte prioritário por 1 ano.',  99.90, 12]
        ].forEach(([nome, desc, preco, dur]) => this.cadastrar(nome, desc, preco, dur));
    }

    validar(nome, preco, duracaoMeses) {
        if (!nome || nome.trim() === '')
            throw new Error('Nome do plano é obrigatório.');
        if (Number(preco) < 0.01)
            throw new Error('Preço deve ser maior que zero.');
        if (Number(duracaoMeses) < 1)
            throw new Error('Duração deve ser de pelo menos 1 mês.');
    }

    cadastrar(nome, descricao, preco, duracaoMeses) {
        this.validar(nome, preco, duracaoMeses);
        const lista = this.listarTodos();
        const novo  = new Plano(
            gerarId(lista, 'ID_Plano'),
            nome.trim(),
            descricao ? descricao.trim() : '',
            preco,
            duracaoMeses
        );
        lista.push(novo);
        this.salvarNoStorage(lista);
        return novo;
    }

    buscarPorId(id) {
        return this.listarTodos().find(p => p.ID_Plano === Number(id)) || null;
    }

    remover(id) {
        const lista = this.listarTodos().filter(p => p.ID_Plano !== Number(id));
        this.salvarNoStorage(lista);
    }
}
