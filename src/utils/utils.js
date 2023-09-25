function coeficientePassada(altura) {
    if (playlistDTO.altura < 1,75) {
        return 0,4
    }
    else if(playlistDTO.altura >= 1,75 && playlistDTO.altura < 2) {
        return 0,5
    }
    else if (playlistDTO.altura >= 2) {
        return 0,6
    }
    
}

function calcularBPM(altura, velocidade){

    passada = altura * ceficientePassada(altura);
    passosPorHora = velocidade / passada;
    passosPorMinuto = passosPorHora / 60;

    return BPM
}

module.exports = {calcularBPM}