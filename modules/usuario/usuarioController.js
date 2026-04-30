class UsuarioController {
    constructor() {
        this.key = 'plataforma_usuarios';
    }

    listarTodos() {
        const lista = JSON.parse(localStorage.getItem(this.key)) || [];
        return lista.map(u => ({ Perfil: 'aluno', ...u }));
    }

    salvarNoStorage(lista) {
        localStorage.setItem(this.key, JSON.stringify(lista));
    }

    listarInstrutores() {
        return this.listarTodos().filter(u => u.Perfil === 'instrutor');
    }

    listarAlunos() {
        return this.listarTodos().filter(u => u.Perfil === 'aluno');
    }

    validar(nome, email, senha, perfil) {
        if (!nome || nome.trim() === '') {
            throw new Error('Nome Completo é obrigatório.');
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error('Formato de e-mail inválido.');
        }
        if (this.listarTodos().some(u => u.Email.toLowerCase() === email.toLowerCase())) {
            throw new Error('Este e-mail já está cadastrado.');
        }
        if (!senha || senha.length < 4) {
            throw new Error('Senha deve ter no mínimo 4 caracteres.');
        }
        if (!['aluno', 'instrutor'].includes(perfil)) {
            throw new Error('Perfil inválido. Use "aluno" ou "instrutor".');
        }
    }

    gerarHash(senha) {
        return btoa(senha.split('').reverse().join(''));
    }

    cadastrar(nome, email, senha, perfil = 'aluno') {
        this.validar(nome, email, senha, perfil);
        const usuarios = this.listarTodos();
        const novo = new Usuario(
            gerarId(usuarios, 'ID_Usuario'),
            nome.trim(),
            email.trim().toLowerCase(),
            this.gerarHash(senha),
            perfil
        );
        usuarios.push(novo);
        this.salvarNoStorage(usuarios);
        return novo;
    }

    buscarPorId(id) {
        return this.listarTodos().find(u => u.ID_Usuario === Number(id)) || null;
    }

    remover(id) {
        const lista = this.listarTodos().filter(u => u.ID_Usuario !== Number(id));
        this.salvarNoStorage(lista);
    }

    atualizar(id, novoNome, novoEmail, novoPerfil) {
        if (!novoNome || novoNome.trim() === '')
            throw new Error('Nome Completo é obrigatório.');
        if (!novoEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoEmail))
            throw new Error('Formato de e-mail inválido.');
        if (!['aluno', 'instrutor'].includes(novoPerfil))
            throw new Error('Perfil inválido.');

        const lista = this.listarTodos();
        const emailEmUso = lista.some(
            u => u.Email.toLowerCase() === novoEmail.toLowerCase() && u.ID_Usuario !== Number(id)
        );
        if (emailEmUso) throw new Error('Este e-mail já está cadastrado por outro usuário.');

        const atualizado = lista.map(u => {
            if (u.ID_Usuario === Number(id)) {
                return { ...u, NomeCompleto: novoNome.trim(), Email: novoEmail.trim().toLowerCase(), Perfil: novoPerfil };
            }
            return u;
        });
        this.salvarNoStorage(atualizado);
    }
}
