function calcularBPM(playlistDTO){
        // O método abaixo define o valor do coeficiente de passada 
        // para 0.4 , 0.5 ou 0.6, a depender da altura da pessoa. (olhar explicacao.txt) 

        CoeficientePassada(playlistDTO.altura)
        passada = playlistDTO.altura * CoeficientePassada;
        passosPorHora = playlistDTO.velocidade / passada;
        passosPorMinuto = passosPorHora / 60;
        // aqui eu quero adicionar o BPM como um atributo do DTO
        return playlistDTO.BPM

    }