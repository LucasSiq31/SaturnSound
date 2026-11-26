//Informações da playlist
tempo_total = 0;
quantidade = 0;

//Exibe musicas cadastradas
musicas.forEach((m, index) => {
    document.getElementById("tracks").innerHTML += `<div id=${m.id} class="track" onclick="start(${m.id})"><div><img class="capa" src="${m.capa}" alt=""><div><b>${m.nome}</b><p>${m.artista}</p></div></div><span class="tempo">${time(m.duracao)}</span></div>`
    quantidade += 1;
    tempo_total += m.duracao

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
    // document.getElementById("reprodutor").style.display = "block"
    // document.getElementById("divFundo").style.display = "block"

    const m = musicas[id];

    document.title = `Saturn Sound | ${m.nome} - ${m.artista}`;
    document.getElementById("song").src = m.audio;
    document.getElementById("capa").src = m.capa;
    document.getElementById("divFundo").style.backgroundImage = `url(${m.capa})`;
    document.getElementById("nome").textContent = m.nome;
    document.getElementById("nome").dataset.text = m.nome;
    document.getElementById("artista").textContent = m.artista;

    //Meche no oveflow da playlist
    const tracks = document.getElementById("tracks");
    const musicaSelecionada = document.querySelector(".track.selected");

    if (musicaSelecionada) {
        const top = musicaSelecionada.offsetTop - tracks.offsetTop;

        tracks.scrollTo({
            top,
            behavior: "smooth"
        });
    }

    checkMarquee()
    play()
}


//Exibindo dados da playlist
document.getElementById("dadosPlaylist").innerHTML = `${quantidade} faixas · ${Math.floor(tempo_total / 60)}m`;

//CONFIGURAÇÕES DO PLAYER
const audio = document.getElementById("song");
const progress = document.getElementById("progress");

// Atualiza a barra conforme a música toca
audio.addEventListener("timeupdate", () => {
    progress.max = audio.duration;
    progress.value = audio.currentTime;
    document.getElementById("min").innerHTML = time(Math.floor(audio.currentTime))
    document.getElementById("max").innerHTML = time(Math.floor(audio.duration))

    porcentagem = (audio.currentTime / audio.duration)*100;
    progress.style.background = `
        linear-gradient(
            to right,
            #f28c20 0%,
            #f28c20 ${porcentagem /2}%,
            #e6b47f ${porcentagem}%,
            rgba(128, 128, 128, 0.5) ${porcentagem}%,
            rgba(128, 128, 128, 0.5) 100%
        )
    `;
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

function checkMarquee() {
  const container = document.querySelector('.marquee-container');
  const nome = document.getElementById('nome');

  if (!container || !nome) return;

  // Remove a animação antes para medir o tamanho real sem o ::after
  nome.classList.remove('animating');

  // Se o texto for maior do que a largura do container visível
  if (nome.scrollWidth > container.clientWidth) {
    nome.classList.add('animating');
  }
}

window.addEventListener('load', checkMarquee);
window.addEventListener('resize', checkMarquee);
