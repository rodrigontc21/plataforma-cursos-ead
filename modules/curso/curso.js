class Curso {
    constructor(id, titulo, descricao, idInstrutor, idCategoria, nivel, totalAulas, totalHoras) {
        this.ID_Curso       = id;
        this.Titulo         = titulo;
        this.Descricao      = descricao;
        this.ID_Instrutor   = Number(idInstrutor);
        this.ID_Categoria   = Number(idCategoria);
        this.Nivel          = nivel;
        this.DataPublicacao = new Date().toLocaleDateString('pt-BR');
        this.TotalAulas     = Number(totalAulas) || 0;
        this.TotalHoras     = Number(totalHoras) || 0;
    }
}
