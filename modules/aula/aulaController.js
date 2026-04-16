class AulaController {
    constructor() {
        this.key = 'plataforma_aulas';
        this.tiposValidos = ['Vídeo', 'Texto', 'Quiz'];
    }

    listarTodos() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    salvarNoStorage(lista) {
        localStorage.setItem(this.key, JSON.stringify(lista));
    }

    validar(idModulo, titulo, tipoConteudo, urlConteudo, duracaoMinutos, ordem) {
        if (!titulo || titulo.trim() === '')
            throw new Error('Título da aula é obrigatório.');
        if (!new ModuloController().buscarPorId(idModulo))
            throw new Error('Módulo inválido. Selecione um módulo existente.');
        if (!this.tiposValidos.includes(tipoConteudo))
            throw new Error('Tipo de conteúdo inválido. Use: Vídeo, Texto ou Quiz.');
        if (!urlConteudo || urlConteudo.trim() === '')
            throw new Error('URL do conteúdo é obrigatória.');
        if (Number(duracaoMinutos) < 1)
            throw new Error('Duração deve ser de no mínimo 1 minuto.');
        if (Number(ordem) < 1)
            throw new Error('Ordem deve ser igual ou maior que 1.');
    }

    cadastrar(idModulo, titulo, tipoConteudo, urlConteudo, duracaoMinutos, ordem) {
        this.validar(idModulo, titulo, tipoConteudo, urlConteudo, duracaoMinutos, ordem);
        const lista = this.listarTodos();
        const nova = new Aula(
            gerarId(lista, 'ID_Aula'),
            idModulo,
            titulo.trim(),
            tipoConteudo,
            urlConteudo.trim(),
            duracaoMinutos,
            ordem
        );
        lista.push(nova);
        this.salvarNoStorage(lista);
        return nova;
    }

    buscarPorId(id) {
        return this.listarTodos().find(a => a.ID_Aula === Number(id)) || null;
    }

    listarPorModulo(idModulo) {
        return this.listarTodos()
            .filter(a => a.ID_Modulo === Number(idModulo))
            .sort((a, b) => a.Ordem - b.Ordem);
    }

    remover(id) {
        const lista = this.listarTodos().filter(a => a.ID_Aula !== Number(id));
        this.salvarNoStorage(lista);
    }
}
