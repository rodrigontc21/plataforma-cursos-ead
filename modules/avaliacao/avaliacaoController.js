class AvaliacaoController {
    constructor() {
        this.key = 'plataforma_avaliacoes';
    }

    listarTodos() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    salvarNoStorage(lista) {
        localStorage.setItem(this.key, JSON.stringify(lista));
    }

    validar(idUsuario, idCurso, nota) {
        if (!new UsuarioController().buscarPorId(idUsuario))
            throw new Error('Usuário não encontrado.');
        if (!new CursoController().buscarPorId(idCurso))
            throw new Error('Curso não encontrado.');

        const matriculado = new MatriculaController()
            .listarPorUsuario(idUsuario)
            .some(m => m.ID_Curso === Number(idCurso));
        if (!matriculado)
            throw new Error('O usuário precisa estar matriculado no curso para avaliá-lo.');

        if (Number(nota) < 1 || Number(nota) > 5)
            throw new Error('A nota deve ser entre 1 e 5.');
    }

    cadastrar(idUsuario, idCurso, nota, comentario) {
        this.validar(idUsuario, idCurso, nota);
        const lista = this.listarTodos();
        const nova = new Avaliacao(
            gerarId(lista, 'ID_Avaliacao'),
            idUsuario,
            idCurso,
            nota,
            comentario
        );
        lista.push(nova);
        this.salvarNoStorage(lista);
        return nova;
    }

    buscarPorId(id) {
        return this.listarTodos().find(a => a.ID_Avaliacao === Number(id)) || null;
    }

    listarPorCurso(idCurso) {
        return this.listarTodos().filter(a => a.ID_Curso === Number(idCurso));
    }

    listarPorUsuario(idUsuario) {
        return this.listarTodos().filter(a => a.ID_Usuario === Number(idUsuario));
    }

    mediaPorCurso(idCurso) {
        const avs = this.listarPorCurso(idCurso);
        if (avs.length === 0) return null;
        return (avs.reduce((sum, a) => sum + a.Nota, 0) / avs.length).toFixed(1);
    }

    remover(id) {
        const lista = this.listarTodos().filter(a => a.ID_Avaliacao !== Number(id));
        this.salvarNoStorage(lista);
    }
}
