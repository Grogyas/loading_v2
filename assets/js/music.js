const playlist = [
  {
    "author": "Kygo",
    "name": "Stole the show",
    "cover": "./assets/img/covers/show.jpg",
    "src": "http://grandvincent-marion.fr/img-codePen/kygo-stole-the-show.mp3"
  },
  {
    "author": "Dreamcatcher",
    "name": "Mood Cover",
    "cover": "./assets/img/covers/mood.jpg",
    "src": "./assets/audio/mood.mp3"
  },
  {
    "author": "Axel Johansson",
    "name": "The River",
    "cover": "./assets/img/covers/theriver.jpg",
    "src": "./assets/audio/theriver.mp3"
  },
  {
    "author": "Reece Brunke",
    "name": "S.O.S. (Lost At Sea)",
    "cover": "./assets/img/covers/lost.jpg",
    "src": "./assets/audio/lost.mp3"
  },
  {
    "author": "David Guetta",
    "name": "Hey Mama ERS Remix",
    "cover": "./assets/img/covers/heymama.png",
    "src": "./assets/audio/heymama.mp3"
  },
  {
    "author": "Saesong",
    "name": "Villain Cover",
    "cover": "./assets/img/covers/villain.jpg",
    "src": "./assets/audio/villain.mp3"
  }
]

function MusicInit() {
  const SongsTotal = Object.keys(playlist).length - 1
  const RandomSong = Math.floor((Math.random() * SongsTotal));

  audio = new Audio()
  audio.loop = false
  Volume = .05
  CurrentColor = "#000"

  $('document').ready(function() {
    NextSong = RandomSong + 1
    audio = new Audio(`${playlist[RandomSong].src}`)
    audio.volume = Volume
    audio.play()
    GenerateSong(NextSong - 1)
  });

  $("#Next").click(function() {
    PlayNextSong()
  })
  
  $("#Prev").click(function() {
    PlayPrevSong()
  })

  $("#VolumeBtn").click(function() {
    $("#VolumeProgressbar").slideToggle(250)
  })

  $("#Loop").click(function() {
    if (!audio.loop) {
      audio.loop = true
      $("#Loop").attr('style', 'border-bottom: 2px solid red; margin-bottom: -2px')
    } else {
      $("#Loop").attr('style', 'border-bottom: none')
      audio.loop = false
    }
  })

  $("#PlayToggle").click(function() {
    if (!audio.paused) {
      $("#PlayToggleI").replaceWith(`<i id="PlayToggleI" class="CurrentColorC uil uil-play-circle"></i>`);
      audio.pause()
      $(".cover").removeClass('rotate')
    } else {
      $("#PlayToggleI").replaceWith(`<i id="PlayToggleI" class="CurrentColorC uil uil-pause-circle"></i>`);
      audio.play()
      $(".cover").addClass('rotate')
    }
  })

  setInterval(() => {
    minutes = Math.floor(audio.currentTime / 60);
    seconds = Math.floor(audio.currentTime - minutes * 60);
    time = checkTime(minutes) + ":" + checkTime(seconds)

    $("#SongProgress").attr("aria-valuenow", `${audio.currentTime / audio.duration * 100}`);
    $("#SongProgress").attr("style", `width: ${audio.currentTime / audio.duration * 100}%; background-color: ${CurrentColor}`);
    $(".time").replaceWith(`<p class="time BarText">${time}</p>`);
    $(".percentage").replaceWith(`<p class="percentage BarText">${Math.floor(Volume * 100)}%</p>`);

    if (audio.currentTime / audio.duration * 100 == 100) {
      PlayNextSong()
    }
  }, 100);

  $('#TimeProgressbar').click(function(e){
    var perc = (e.pageX - this.offsetLeft) / $(this).outerWidth() * 100;
    audio.currentTime = perc * audio.duration / 100 
  });

  $('#VolumeProgressbar').click(function(e){
    var perc = (1 - (e.pageY - this.offsetTop) / $(this).outerHeight());
    Volume = perc
    audio.volume = Volume
    $("#VolumeBar").attr("aria-valuenow", `${perc * 100}`);
    $("#VolumeBar").attr("style", `height: ${perc * 100}%; background-color: ${CurrentColor}`);
  });

  function PlayNextSong() {
    audio.pause()
    audio = new Audio(`${playlist[NextSong].src}`)
    audio.volume = Volume
    audio.play()
    GenerateSong(NextSong)

    if (NextSong == SongsTotal) {
      NextSong = 0
    } else {
      NextSong = NextSong + 1
    }
  }

  function PlayPrevSong() {
    if (NextSong == 0) {
      NextSong = SongsTotal
    } else {
      NextSong = NextSong - 1
    }

    audio.pause()
    audio = new Audio(`${playlist[NextSong].src}`)
    audio.volume = Volume
    audio.play()
    GenerateSong(NextSong)
  }

  function GenerateSong(Song) {
    $(".author").replaceWith(`<p class="author">${playlist[Song].author}</p>`);
    $(".name").replaceWith(`<p class="name">${playlist[Song].name}</p>`);
    $(".cover").replaceWith(`<img class="cover" alt="${playlist[Song].name}" src="${playlist[Song].cover}">`);
    $(".cover").addClass('rotate');
    $(".cover").attr('style', `background-color: ${CurrentColor}`);
    
    const fac = new FastAverageColor();
    fac.getColorAsync(`${playlist[Song].cover}`)
    .then(color => {
      $(".uil").attr('style', `color: ${color.hex}`);
      CurrentColor = color.hex
    })
    .catch(e => {
        console.log(e);
    });
  }
  
  function checkTime(i) { if (i < 10) {i="0" + i}; return i; }
}

MusicInit()