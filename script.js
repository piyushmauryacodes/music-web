
console.log("script is running...");
let currentSong = new Audio();

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00 ";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

// async function getSongs() {
//   // Your getSongs function is fine, no changes needed here.
//   let a = await fetch("https://github.com/piyushmauryacodes/music-web/tree/main/songs/");
//   let response = await a.text();
//   let div = document.createElement("div");
//   div.innerHTML = response;
//   let as = div.getElementsByTagName("a");
//   let songs = [];
//   for (let index = 0; index < as.length; index++) {
//     const element = as[index];
//     if (element.href.endsWith(".mp3")) {
//       songs.push(element.href.split("/songs/")[1])
//     }
//   }
//   return songs;
// }

async function getSongs() {
  // Fetch the list of songs from your new JSON file.
  let response = await fetch("./songs/songs.json");
  let data = await response.json(); // Parse the JSON data
  
  // The 'data' object contains your songs array.
  // We can return the array of song objects directly.
  return data.songs; 
}

const playMusic = (track, pause = false) => {
  // Use a relative path with "./" to ensure it works on GitHub Pages
  currentSong.src = "./songs/" + track;
  if (!pause) {
    currentSong.play()
    play.src = "pause.svg"
  }
  document.querySelector(".songinfo").innerHTML = decodeURI(track.replaceAll("%20", " "))
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}
async function main() {

  let songs = await getSongs();
  console.log(songs);

  // Now you can use the song list to build your playlist.
  // For example, to get the path for the first song:
  if (songs.length > 0) {
    let firstSongPath = `./songs/${songs[0].filename}`;
    console.log("Path to first song:", firstSongPath);
    // You can set this path as the src for your <audio> element.
  }

  //get the list of all the songs
  // let songs = await getSongs()
  // playMusic(songs[0], true)
  // ... inside main()*****
// Get the 'filename' property from the first song object
playMusic(songs[0].filename, true)
  console.log(songs)
  //show all the song in the playlist
  let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]

  // for (const song of songs) {
  //   songUL.innerHTML = songUL.innerHTML + `
  // <li>
  //     <div class="info">
  //         <div>${song}</div>
  //         <div>${song.split('-')[0].trim().replaceAll("%20", " ")}</div>
  //     </div>
  //     <div class="playnow">
  //         <img src="play.svg" alt="playbutton">
  //     </div>
  //   </li>`

  // }

  for (const song of songs) {
  // Use the .title and .artist properties for a clean display*********************
  // Store the actual filename in a 'data-filename' attribute for later***************8
  songUL.innerHTML = songUL.innerHTML + `
  <li data-filename="${song.filename}">
    <div class="info">
        <div>${song.title}</div>
        <div>${song.artist}</div>
    </div>
    <div class="playnow">
        <img src="play.svg" alt="playbutton">
    </div>
  </li>`
}
  //attach an evertlistener to each song
  // Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
  //   e.addEventListener("click", element => {
  //     console.log(e.querySelector(".info").firstElementChild.innerHTML)
  //     playMusic(e.querySelector(".info").firstElementChild.innerHTML)
  //   })
  // })
// ****************************************************************
  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
  e.addEventListener("click", element => {
    // Read the filename from the data-filename attribute of the clicked <li>
    console.log(e.dataset.filename)
    playMusic(e.dataset.filename)
  })
})

  //attach an event listener to play, next and previous
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play()
      play.src = "pause.svg"

    }
    else {
      currentSong.pause();
      play.src = "play.svg"
    }
  })
  //listen for time update event
 currentSong.addEventListener("timeupdate", () => {
        // This code is fine, no changes needed here.
        if (!isNaN(currentSong.duration)) {
            document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;
            document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
        }
    });

    // =========================================================
    
    // =========================================================
    document.querySelector(".seekbaar").addEventListener("click", (e) => {
        if (!isNaN(currentSong.duration)) {
            let percent = (e.offsetX / e.currentTarget.getBoundingClientRect().width);
            currentSong.currentTime = percent * currentSong.duration;
            document.querySelector(".circle").style.left = percent * 100 + "%";
        }
    });
}
main();

