const musicContainer= document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer= document.querySelector('.progress-container')
const title= document.querySelector('#title')
const cover= document.querySelector('#cover')
const start=document.querySelector('#start')
const last=document.querySelector('#last')
const artist=document.querySelector('#artist')
const repeatBtn=document.querySelector('#repeat')
const shuffleBtn =document.querySelector('#shuffle')
var startTime =0
var LastTime =0


//song titles 
const songs = ['winter','beach','spotify']
const artists = ['ibrahim','bob','Najjar']

// keep track
 let songIndex = 2 
  
// Initially load song 

loadSong( songs[songIndex])


// update song
function loadSong(song){
    title.innerHTML = song
    audio.src = `/Assets/${song}.mp3`
    cover.src =  `/Assets/${song}.jpg`
    artist.innerHTML=artists[songIndex]

 
}
function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fa-solid').classList.remove('fa-pause')
    playBtn.querySelector('i.fa-solid').classList.add('fa-play')
    audio.pause();

}
function playSong(){
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fa-solid').classList.remove('fa-play')
    playBtn.querySelector('i.fa-solid').classList.add('fa-pause')
    audio.play()
 
  
}
function prevSong(){
    songIndex--
    if(songIndex<0){
        songIndex= songs.length-1
    }
    loadSong(songs[songIndex])
    playSong()
 

}
function nextSong(){
    songIndex++
    if(songIndex>songs.length-1){
        songIndex= 0
    }
    loadSong(songs[songIndex])
    playSong()

}
function updateProgress(event){
    const {duration , currentTime}=event.srcElement
    const progressPx = ( currentTime / duration) * 305
    progress.style.transform  = "translateX("+progressPx+"px)"
    startTime=new Date(audio.currentTime * 1000).toISOString().substring(14, 19)
    LastTime=  new Date(audio.duration * 1000).toString().substring(20, 24)
    start.innerHTML=startTime
    last.innerHTML=LastTime
  
  
    
}
 function setProgress( event ){
    const width = this.clientWidth
    const clickX= event.offsetX
    const duration = audio.duration
    audio.currentTime= (clickX/width)* duration
  


 }
 function shuffle(){
    let x=Math.random() * 3
    loadSong(songs[Math.round(x)])
 }
 



// even listners

playBtn.addEventListener('click',() => {
    const isPlaying = musicContainer.classList.contains('play')
    if(isPlaying){
        pauseSong()
    }else{
        playSong()
    }
})


// 
prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)

//bar 

audio.addEventListener('timeupdate',updateProgress)


progressContainer.addEventListener('click',setProgress)
audio.addEventListener('ended',nextSong)

repeatBtn.addEventListener('click',()=>{
    const isRepeat = musicContainer.classList.contains('repeat')
    if(!isRepeat){
        musicContainer.classList.add('repeat')
        audio.loop = true;
    }else{
        audio.loop = false;
        musicContainer.classList.remove('repeat')
    }
})
shuffleBtn.addEventListener('click',shuffle)