// gera o próximo ID disponível
function gerarId(lista, campoId) {
    if (!lista || lista.length === 0) return 1;
    return Math.max(...lista.map(item => item[campoId])) + 1;
}
