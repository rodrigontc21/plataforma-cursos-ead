class Avaliacao {
    constructor(id, idUsuario, idCurso, nota, comentario) {
        this.ID_Avaliacao  = id;
        this.ID_Usuario    = Number(idUsuario);
        this.ID_Curso      = Number(idCurso);
        this.Nota          = Number(nota);
        this.Comentario    = comentario || '';
        this.DataAvaliacao = new Date().toLocaleDateString('pt-BR');
    }
}
