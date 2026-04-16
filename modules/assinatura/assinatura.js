class Assinatura {
    constructor(id, idUsuario, idPlano, dataInicio, dataFim) {
        this.ID_Assinatura = id;
        this.ID_Usuario    = Number(idUsuario);
        this.ID_Plano      = Number(idPlano);
        this.DataInicio    = dataInicio;
        this.DataFim       = dataFim;
    }
}
