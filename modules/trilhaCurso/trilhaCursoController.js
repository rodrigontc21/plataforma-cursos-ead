class TrilhaCursoController {
    constructor() {
        this.key = 'plataforma_trilhas_cursos';
    }

    listarTodos() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    salvarNoStorage(lista) {
        localStorage.setItem(this.key, JSON.stringify(lista));
    }

    validar(idTrilha, idCurso, ordem) {
        if (!new TrilhaController().buscarPorId(idTrilha))
            throw new Error('Trilha inválida.');
        if (!new CursoController().buscarPorId(idCurso))
            throw new Error('Curso inválido.');
        const jaVinculado = this.listarTodos().some(
            tc => tc.ID_Trilha === Number(idTrilha) && tc.ID_Curso === Number(idCurso)
        );
        if (jaVinculado)
            throw new Error('Este curso já está vinculado a esta trilha.');
        if (Number(ordem) < 1)
            throw new Error('Ordem deve ser igual ou maior que 1.');
    }

    vincular(idTrilha, idCurso, ordem) {
        this.validar(idTrilha, idCurso, ordem);
        const lista = this.listarTodos();
        lista.push(new TrilhaCurso(idTrilha, idCurso, ordem));
        this.salvarNoStorage(lista);
    }

    desvincular(idTrilha, idCurso) {
        const lista = this.listarTodos().filter(
            tc => !(tc.ID_Trilha === Number(idTrilha) && tc.ID_Curso === Number(idCurso))
        );
        this.salvarNoStorage(lista);
    }

    desvincularTodosDaTrilha(idTrilha) {
        const lista = this.listarTodos().filter(tc => tc.ID_Trilha !== Number(idTrilha));
        this.salvarNoStorage(lista);
    }

    listarPorTrilha(idTrilha) {
        return this.listarTodos()
            .filter(tc => tc.ID_Trilha === Number(idTrilha))
            .sort((a, b) => a.Ordem - b.Ordem);
    }

    listarPorCurso(idCurso) {
        return this.listarTodos().filter(tc => tc.ID_Curso === Number(idCurso));
    }
}
