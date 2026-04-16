class CategoriaController {
    constructor() {
        this.key = 'plataforma_categorias';
        this.inicializarSemente();
    }

    // roda só na primeira abertura
    inicializarSemente() {
        const flagKey = 'plataforma_categorias_inicializado';

        if (localStorage.getItem(flagKey)) return;

        localStorage.setItem(flagKey, 'true');

        if (this.listarTodas().length === 0) {
            const semente = [
                new Categoria(1, 'Programação', 'Desenvolvimento de software e lógica'),
                new Categoria(2, 'Design', 'Interface, UX e experiência do usuário'),
                new Categoria(3, 'Data Science', 'Análise de dados e machine learning')
            ];
            this.salvarNoStorage(semente);
        }
    }

    listarTodas() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    salvarNoStorage(lista) {
        localStorage.setItem(this.key, JSON.stringify(lista));
    }

    validar(nome) {
        if (!nome || nome.trim() === '') {
            throw new Error('Nome da Categoria é obrigatório.');
        }
        if (this.listarTodas().some(c => c.Nome.toLowerCase() === nome.toLowerCase())) {
            throw new Error('Já existe uma categoria com este nome.');
        }
    }

    cadastrar(nome, descricao) {
        this.validar(nome);
        const categorias = this.listarTodas();
        const nova = new Categoria(
            gerarId(categorias, 'ID_Categoria'),
            nome.trim(),
            descricao ? descricao.trim() : ''
        );
        categorias.push(nova);
        this.salvarNoStorage(categorias);
        return nova;
    }

    buscarPorId(id) {
        return this.listarTodas().find(c => c.ID_Categoria === Number(id)) || null;
    }

    remover(id) {
        const lista = this.listarTodas().filter(c => c.ID_Categoria !== Number(id));
        this.salvarNoStorage(lista);
    }
}
