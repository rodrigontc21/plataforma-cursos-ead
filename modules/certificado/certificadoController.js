class CertificadoController {
    constructor() {
        this.key = 'plataforma_certificados';
    }

    listarTodos() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    salvarNoStorage(lista) {
        localStorage.setItem(this.key, JSON.stringify(lista));
    }

    _gerarCodigo() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let codigo;
        do {
            codigo = 'CERT-' + Array.from({ length: 8 }, () =>
                chars[Math.floor(Math.random() * chars.length)]
            ).join('');
        } while (this.listarTodos().some(c => c.CodigoVerificacao === codigo));
        return codigo;
    }

    buscarPorUsuarioCurso(idUsuario, idCurso) {
        return this.listarTodos().find(
            c => c.ID_Usuario === Number(idUsuario) && c.ID_Curso === Number(idCurso)
        ) || null;
    }

    gerarCertificado(idUsuario, idCurso) {
        if (!new UsuarioController().buscarPorId(idUsuario))
            throw new Error('Usuário não encontrado.');

        const curso = new CursoController().buscarPorId(idCurso);
        if (!curso)
            throw new Error('Curso não encontrado.');

        const matriculado = new MatriculaController()
            .listarPorUsuario(idUsuario)
            .some(m => m.ID_Curso === Number(idCurso));
        if (!matriculado)
            throw new Error('O usuário não está matriculado neste curso.');

        if (this.buscarPorUsuarioCurso(idUsuario, idCurso))
            throw new Error('Certificado já emitido para este aluno neste curso.');

        if (curso.TotalAulas === 0)
            throw new Error('O curso não possui aulas registradas em seu cadastro (TotalAulas = 0).');

        // Calcula aulas concluidas que pertencem a este curso
        const modulos = new ModuloController().listarPorCurso(idCurso);
        const idsAulasDoCurso = new Set(
            modulos.flatMap(m => new AulaController().listarPorModulo(m.ID_Modulo).map(a => a.ID_Aula))
        );
        const aulasConcluidas = new ProgressoAulaController()
            .listarPorUsuario(idUsuario)
            .filter(p => idsAulasDoCurso.has(p.ID_Aula))
            .length;

        if (aulasConcluidas < curso.TotalAulas)
            throw new Error(
                `Você concluiu ${aulasConcluidas} de ${curso.TotalAulas} aulas. ` +
                `Complete todas as aulas para receber o certificado.`
            );

        const lista = this.listarTodos();
        const novo  = new Certificado(
            gerarId(lista, 'ID_Certificado'),
            idUsuario,
            idCurso,
            this._gerarCodigo()
        );
        lista.push(novo);
        this.salvarNoStorage(lista);
        return novo;
    }

    listarPorUsuario(idUsuario) {
        return this.listarTodos().filter(c => c.ID_Usuario === Number(idUsuario));
    }

    listarPorCurso(idCurso) {
        return this.listarTodos().filter(c => c.ID_Curso === Number(idCurso));
    }

    remover(id) {
        const lista = this.listarTodos().filter(c => c.ID_Certificado !== Number(id));
        this.salvarNoStorage(lista);
    }
}
