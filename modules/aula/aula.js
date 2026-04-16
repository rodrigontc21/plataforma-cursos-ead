class Aula {
    constructor(id, idModulo, titulo, tipoConteudo, urlConteudo, duracaoMinutos, ordem) {
        this.ID_Aula        = id;
        this.ID_Modulo      = Number(idModulo);
        this.Titulo         = titulo;
        this.TipoConteudo   = tipoConteudo;
        this.URL_Conteudo   = urlConteudo;
        this.DuracaoMinutos = Number(duracaoMinutos);
        this.Ordem          = Number(ordem);
    }
}
