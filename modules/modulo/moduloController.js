class ModuloController {
    constructor() {
        this.key = 'plataforma_modulos';
    }

    listarTodos() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    salvarNoStorage(lista) {
        localStorage.setItem(this.key, JSON.stringify(lista));
    }

    validar(idCurso, titulo, ordem) {
        if (!titulo || titulo.trim() === '')
            throw new Error('Título do módulo é obrigatório.');
        if (!new CursoController().buscarPorId(idCurso))
            throw new Error('Curso inválido. Selecione um curso existente.');
        if (Number(ordem) < 1)
            throw new Error('Ordem deve ser igual ou maior que 1.');
    }

    cadastrar(idCurso, titulo, ordem) {
        this.validar(idCurso, titulo, ordem);
        const lista = this.listarTodos();
        const novo = new Modulo(
            gerarId(lista, 'ID_Modulo'),
            idCurso,
            titulo.trim(),
            ordem
        );
        lista.push(novo);
        this.salvarNoStorage(lista);
        return novo;
    }

    buscarPorId(id) {
        return this.listarTodos().find(m => m.ID_Modulo === Number(id)) || null;
    }

    listarPorCurso(idCurso) {
        return this.listarTodos()
            .filter(m => m.ID_Curso === Number(idCurso))
            .sort((a, b) => a.Ordem - b.Ordem);
    }

    remover(id) {
        const lista = this.listarTodos().filter(m => m.ID_Modulo !== Number(id));
        this.salvarNoStorage(lista);
    }
}
