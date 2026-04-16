class Trilha {
    constructor(id, titulo, descricao, idCategoria) {
        this.ID_Trilha    = id;
        this.Titulo       = titulo;
        this.Descricao    = descricao || '';
        this.ID_Categoria = Number(idCategoria);
    }
}
