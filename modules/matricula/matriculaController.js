class MatriculaController {
    constructor() {
        this.key = 'plataforma_matriculas';
    }

    listarTodos() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    salvarNoStorage(lista) {
        localStorage.setItem(this.key, JSON.stringify(lista));
    }

    validar(idUsuario, idCurso) {
        if (!new UsuarioController().buscarPorId(idUsuario))
            throw new Error('Usuário não encontrado.');
        if (!new CursoController().buscarPorId(idCurso))
            throw new Error('Curso não encontrado.');
        const jaCadastrado = this.listarTodos().some(
            m => m.ID_Usuario === Number(idUsuario) && m.ID_Curso === Number(idCurso)
        );
        if (jaCadastrado)
            throw new Error('Este usuário já está matriculado neste curso.');
    }

    cadastrar(idUsuario, idCurso) {
        new AssinaturaController().validarAcesso(idUsuario);
        this.validar(idUsuario, idCurso);
        const lista = this.listarTodos();
        const nova = new Matricula(
            gerarId(lista, 'ID_Matricula'),
            idUsuario,
            idCurso,
            null
        );
        lista.push(nova);
        this.salvarNoStorage(lista);
        return nova;
    }

    buscarPorId(id) {
        return this.listarTodos().find(m => m.ID_Matricula === Number(id)) || null;
    }

    listarPorUsuario(idUsuario) {
        return this.listarTodos()
            .filter(m => m.ID_Usuario === Number(idUsuario))
            .sort((a, b) => b.ID_Matricula - a.ID_Matricula);
    }

    listarPorCurso(idCurso) {
        return this.listarTodos().filter(m => m.ID_Curso === Number(idCurso));
    }

    remover(id) {
        const lista = this.listarTodos().filter(m => m.ID_Matricula !== Number(id));
        this.salvarNoStorage(lista);
    }
}
