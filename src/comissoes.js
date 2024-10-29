function mudaEstadoDescricao(id, idSeta){
    const desc = document.getElementById(id);
    const seta = document.getElementById(idSeta);

    if (seta.style.rotate === '') {
        seta.style.rotate = '90deg'
    }
    else {
        seta.style.rotate = '';
    }

    if (desc.style.display === 'none' || desc.style.display === '') {
        desc.style.display = 'flex';
    }
    else {
        desc.style.display = 'none';
    }
}