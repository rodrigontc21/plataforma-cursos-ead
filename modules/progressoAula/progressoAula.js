class ProgressoAula {
    constructor(idUsuario, idAula) {
        this.ID_Usuario    = Number(idUsuario);
        this.ID_Aula       = Number(idAula);
        this.DataConclusao = new Date().toLocaleDateString('pt-BR');
        this.Status        = 'Concluido';
    }
}
