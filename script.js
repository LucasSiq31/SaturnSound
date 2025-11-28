//Exibe musicas cadastradas
musicas.forEach((m, index) => {
    document.getElementById("songs").innerHTML += `<div id=${m.id} class="track" onclick="start(${m.id})"><div><img class="capa" src="${m.capa}" alt=""><div><b>${m.nome}</b><p>${m.artista}</p></div></div><p>${time(m.duracao)}</p></div>`
});

//Musica selecionada
playing = null

function start(id){
    playing = id; //Salva a musica que está tocando

    //Adiciona a classe selected na musica escolhida
    const selecionadas = document.querySelectorAll(".track.selected");
    selecionadas.forEach(el => el.classList.remove("selected"));

    document.getElementById(id).className="track selected"

    //Aparece o player de música
    document.getElementById("vazio").style.display = "none"
    document.getElementById("player").style.display = "flex"

    const m = musicas[id];

    console.log(m.audio)
    document.getElementById("song").src = m.audio;
    document.getElementById("capa").src = m.capa;
    document.getElementById("nome").textContent = m.nome;
    document.getElementById("artista").textContent = m.artista;

    play()
}

//CONFIGURAÇÕES DO PLAYER
const audio = document.getElementById("song");
const progress = document.getElementById("progress");

// Atualiza a barra conforme a música toca
audio.addEventListener("timeupdate", () => {
    progress.max = audio.duration;
    progress.value = audio.currentTime;
    document.getElementById("min").innerHTML = time(Math.floor(audio.currentTime))
    document.getElementById("max").innerHTML = time(Math.floor(audio.duration))
});

// Permite arrastar a barra e mudar o tempo
progress.addEventListener("input", () => {
    audio.currentTime = progress.value;
});

//Ao acabar, pular para a próxima
audio.addEventListener("ended", () => {
    next()
});

//Continuar musica
function play(){
    audio.play()
    document.getElementById("play").style.display = "none"
    document.getElementById("pause").style.display = "block"
}

//Parar musica
function pause(){
    audio.pause()
    document.getElementById("pause").style.display = "none"
    document.getElementById("play").style.display = "block"
}

//Voltar musica
function back(){
    if(playing > 0){
        start(playing-1)
    }
}

//Avançar musica
function next(){
    if(playing < (musicas.length -1)){
        start(playing+1)
    }
}

//Adiantar ou voltar 5seg da musica
less.onclick = () => audio.currentTime -= 5;
plus.onclick = () => audio.currentTime += 5;

function pause(){
    audio.pause()
    document.getElementById("pause").style.display = "none"
    document.getElementById("play").style.display = "block"
}

//Pause na musica
function time(seg){
    tempo_min = 0
    tempo_seg = seg

    tempo_min = Math.floor(tempo_seg / 60)
    tempo_seg = Math.floor(tempo_seg % 60)

    if(tempo_seg < 10){
        tempo_seg = `0${tempo_seg}`
    }

    return(`${tempo_min}:${tempo_seg}`)
}