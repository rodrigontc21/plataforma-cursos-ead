class Plano {
    constructor(id, nome, descricao, preco, duracaoMeses) {
        this.ID_Plano     = id;
        this.Nome         = nome;
        this.Descricao    = descricao || '';
        this.Preco        = Number(preco);
        this.DuracaoMeses = Number(duracaoMeses);
    }
}
