class ProgressoAulaController {
    constructor() {
        this.key = 'plataforma_progresso_aulas';
    }

    listarTodos() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    salvarNoStorage(lista) {
        localStorage.setItem(this.key, JSON.stringify(lista));
    }

    verificarConclusao(idUsuario, idAula) {
        return this.listarTodos().some(
            p => p.ID_Usuario === Number(idUsuario) && p.ID_Aula === Number(idAula)
        );
    }

    // Retorna true se marcou, false se desmarcou (toggle)
    marcarComoConcluido(idUsuario, idAula) {
        if (!new UsuarioController().buscarPorId(idUsuario))
            throw new Error('Usuário não encontrado.');
        if (!new AulaController().buscarPorId(idAula))
            throw new Error('Aula não encontrada.');
        new AssinaturaController().validarAcesso(idUsuario);

        const lista = this.listarTodos();
        const idx = lista.findIndex(
            p => p.ID_Usuario === Number(idUsuario) && p.ID_Aula === Number(idAula)
        );

        if (idx !== -1) {
            lista.splice(idx, 1);
            this.salvarNoStorage(lista);
            return false;
        } else {
            lista.push(new ProgressoAula(idUsuario, idAula));
            this.salvarNoStorage(lista);
            return true;
        }
    }

    listarPorUsuario(idUsuario) {
        return this.listarTodos().filter(p => p.ID_Usuario === Number(idUsuario));
    }

    listarPorAula(idAula) {
        return this.listarTodos().filter(p => p.ID_Aula === Number(idAula));
    }
}
