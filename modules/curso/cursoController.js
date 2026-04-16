class CursoController {
    constructor() {
        this.key = 'plataforma_cursos';
    }

    listarTodos() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    salvarNoStorage(lista) {
        localStorage.setItem(this.key, JSON.stringify(lista));
    }

    validar(titulo, idInstrutor, idCategoria, nivel) {
        if (!titulo || titulo.trim() === '') {
            throw new Error('Título do Curso é obrigatório.');
        }

        const userCtrl = new UsuarioController();
        if (!userCtrl.buscarPorId(idInstrutor)) {
            throw new Error('Instrutor selecionado não encontrado.');
        }

        const catCtrl = new CategoriaController();
        if (!catCtrl.buscarPorId(idCategoria)) {
            throw new Error('Categoria selecionada não encontrada.');
        }

        const niveisValidos = ['Iniciante', 'Intermediário', 'Avançado'];
        if (!niveisValidos.includes(nivel)) {
            throw new Error('Nível deve ser: Iniciante, Intermediário ou Avançado.');
        }
    }

    cadastrar(titulo, descricao, idInstrutor, idCategoria, nivel, totalAulas, totalHoras) {
        this.validar(titulo, idInstrutor, idCategoria, nivel);
        const cursos = this.listarTodos();
        const novo = new Curso(
            gerarId(cursos, 'ID_Curso'),
            titulo.trim(),
            descricao ? descricao.trim() : '',
            idInstrutor,
            idCategoria,
            nivel,
            totalAulas,
            totalHoras
        );
        cursos.push(novo);
        this.salvarNoStorage(cursos);
        return novo;
    }

    buscarPorId(id) {
        return this.listarTodos().find(c => c.ID_Curso === Number(id)) || null;
    }

    listarPorCategoria(idCategoria) {
        return this.listarTodos().filter(c => c.ID_Categoria === Number(idCategoria));
    }

    remover(id) {
        const lista = this.listarTodos().filter(c => c.ID_Curso !== Number(id));
        this.salvarNoStorage(lista);
    }
}
