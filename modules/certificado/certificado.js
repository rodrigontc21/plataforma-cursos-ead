class Certificado {
    constructor(id, idUsuario, idCurso, codigoVerificacao, idTrilha = null) {
        this.ID_Certificado    = id;
        this.ID_Usuario        = Number(idUsuario);
        this.ID_Curso          = Number(idCurso);
        this.ID_Trilha         = idTrilha ? Number(idTrilha) : null;
        this.CodigoVerificacao = codigoVerificacao;
        this.DataEmissao       = new Date().toLocaleDateString('pt-BR');
    }
}
