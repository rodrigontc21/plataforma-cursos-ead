class TrilhaController {
    constructor() {
        this.key = 'plataforma_trilhas';
    }

    listarTodas() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    salvarNoStorage(lista) {
        localStorage.setItem(this.key, JSON.stringify(lista));
    }

    validar(titulo, idCategoria) {
        if (!titulo || titulo.trim() === '')
            throw new Error('Título da trilha é obrigatório.');
        if (!new CategoriaController().buscarPorId(idCategoria))
            throw new Error('Categoria inválida. Selecione uma categoria existente.');
    }

    cadastrar(titulo, descricao, idCategoria) {
        this.validar(titulo, idCategoria);
        const lista = this.listarTodas();
        const nova = new Trilha(
            gerarId(lista, 'ID_Trilha'),
            titulo.trim(),
            descricao ? descricao.trim() : '',
            idCategoria
        );
        lista.push(nova);
        this.salvarNoStorage(lista);
        return nova;
    }

    buscarPorId(id) {
        return this.listarTodas().find(t => t.ID_Trilha === Number(id)) || null;
    }

    listarPorCategoria(idCategoria) {
        return this.listarTodas().filter(t => t.ID_Categoria === Number(idCategoria));
    }

    remover(id) {
        const lista = this.listarTodas().filter(t => t.ID_Trilha !== Number(id));
        this.salvarNoStorage(lista);
    }
}
