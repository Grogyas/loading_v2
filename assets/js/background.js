const Backgrounds = ["./assets/img/bg/1.png", "./assets/img/bg/2.jpg", "./assets/img/bg/3.jpg", "./assets/img/bg/4.jpg", "./assets/img/bg/5.jpg"]

function BackgroundInit() {
  Interval = 3000
  AnimLength = 1000
  BgTotal = Object.keys(Backgrounds).length - 1
  NextBg = 1

  setInterval(() => {
    if (NextBg == BgTotal) {
      NextBg = 0
      CurrentBg = BgTotal
    } else {
      CurrentBg = NextBg
      NextBg = NextBg + 1
    }
  }, Interval);

  setInterval(function() {
    $(".bgp").attr("src", `${Backgrounds[CurrentBg]}`);
    $(".bg").fadeOut(AnimLength, function() {
        $(".bg").attr("src", `${Backgrounds[CurrentBg]}`);
        $(this).fadeIn(AnimLength);
      });
  }, Interval);
}

BackgroundInit()