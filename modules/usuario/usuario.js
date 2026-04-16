class Usuario {
    constructor(id, nomeCompleto, email, senhaHash, perfil = 'aluno') {
        this.ID_Usuario   = id;
        this.NomeCompleto = nomeCompleto;
        this.Email        = email;
        this.SenhaHash    = senhaHash;
        this.Perfil       = perfil;
        this.DataCadastro = new Date().toLocaleDateString('pt-BR');
    }
}
