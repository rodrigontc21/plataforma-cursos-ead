class Matricula {
    constructor(id, idUsuario, idCurso, dataConclusao) {
        this.ID_Matricula  = id;
        this.ID_Usuario    = Number(idUsuario);
        this.ID_Curso      = Number(idCurso);
        this.DataMatricula = new Date().toLocaleDateString('pt-BR');
        this.DataConclusao = dataConclusao || null;
    }
}
