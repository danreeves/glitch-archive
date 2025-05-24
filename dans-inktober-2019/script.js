let H = 300;
let W = 300;
let blå = "dodgerblue";
let grønn = "limegreen";
let rosa = "deeppink";
let mørk = "black";
let hvit = "white";

// TITLE
(function() {
  let title = "welcome to my digital gallery";
  let loopI = 1;
  setInterval(function() {
    document.title = title.slice(0, loopI);
    loopI = loopI === title.length ? 1 : loopI + 1;
  }, 100);
})();

// FAVICON
(function() {
  let favicon = document.getElementById("favicon");
  setInterval(function() {
    favicon.href = Array.from(document.querySelectorAll("canvas"))
      .pop()
      .toDataURL("image/png");
  }, 99);
})();

// RING START
(function() {
  let canvas = document.getElementById("ring");
  let ctx = canvas.getContext("2d");
  ctx.lineWidth = 2;

  setInterval(function() {
    ctx.strokeStyle = Math.random() >= 0.5 ? blå : grønn;
    if (
      Date.now()
        .toString()
        .endsWith("7") ||
      Date.now()
        .toString()
        .endsWith("8")
    ) {
      ctx.strokeStyle = rosa;
    }

    if (Date.now() % 9 === 0) {
      ctx.clearRect(0, 0, W, H);
    }

    ctx.beginPath();
    let x = W / 2 + Math.random() * 10;
    let y = H / 2 + Math.random() * 11;
    let radius = W / 3 + Math.random() * 12;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }, 99);
})();
// RING END

// MINDLESS START
(function() {
  let canvas = document.getElementById("mindless");
  let ctx = canvas.getContext("2d");
  ctx.lineWidth = 3;

  function wiggly(ctx, i) {
    ctx.beginPath();
    ctx.moveTo(W / 2 - 100 + (i * 75 * 2) / 3, H / 2);
    ctx.bezierCurveTo(
      W / 2 + (i * 75 * 2) / 3 - 100 - 20,
      H / 2 + 30,
      W / 2 + (i * 75 * 2) / 3 - 100 + 20,
      H / 2 + 60,
      W / 2 + (i * 75 * 2) / 3 - 100,
      H / 2 + 90
    );
    ctx.stroke();
  }

  let counter = 0;
  setInterval(function() {
    counter++;

    ctx.rotate(
      ((counter % 2 === 0 ? Math.random() + 1.5 : -Math.random() - 1.5) *
        Math.PI) /
        180
    );

    ctx.strokeStyle = counter % 2 === 0 ? blå : grønn;

    if (counter % 3 === 0) {
      ctx.strokeStyle = rosa;
    }

    if (counter % 5 === 0) {
      ctx.clearRect(0, 0, W, H);
    }

    ctx.beginPath();
    ctx.arc(W / 2, H / 2, 75, 0, (2 * Math.PI) / 2, true);
    ctx.stroke();

    wiggly(ctx, 1);
    wiggly(ctx, 2);
    wiggly(ctx, 3);
  }, 99);
})();
// MINDLESS END

// BAIT START
(function() {
  let canvas = document.getElementById("bait");
  let ctx = canvas.getContext("2d");
  ctx.lineWidth = 3;

  let counter = 0;

  setInterval(function() {
    counter++;
    let noise = Math.random() * 25;
    let topNoise = noise;
    let botNoise = -noise;

    let top = { x: 75 + topNoise, y: 75 };
    let bot = { x: W - 75 + botNoise, y: H - 75 };
    let radius = 25;
    let cp1 = { x: bot.x, y: top.y };
    let cp2 = { x: top.x, y: bot.y };

    if (counter % 1 === 0) {
      ctx.clearRect(0, 0, W / 2 + noise, H);
      ctx.clearRect(0, H / 2, W, H / 2);
    }

    if (counter % 3 === 0) {
      ctx.clearRect(0, 0, W, H);
    }

    ctx.rotate(((counter % 2 === 0 ? -1 : 1) * Math.PI) / 180);
    ctx.strokeStyle = rosa;

    // Top wiggle
    ctx.beginPath();
    ctx.moveTo(top.x, top.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, bot.x, bot.y);
    ctx.stroke();

    // Bottom wiggle
    ctx.beginPath();
    ctx.moveTo(top.x, top.y + radius * 2);
    ctx.bezierCurveTo(
      cp1.x - radius * 2,
      cp1.y + radius * 2,
      cp2.x - radius * 2,
      cp2.y + radius * 2,
      bot.x,
      bot.y + radius * 2
    );
    ctx.stroke();

    // Face circle
    ctx.beginPath();
    ctx.arc(
      top.x,
      top.y + radius,
      radius,
      Math.PI * 1.5,
      (Math.PI * 2) / 4,
      true
    );
    ctx.stroke();

    // Butt circle
    ctx.beginPath();
    ctx.arc(bot.x, bot.y + radius, radius, Math.PI * 1.5, (Math.PI * 2) / 4);
    ctx.stroke();

    // Left eye
    ctx.strokeStyle = mørk;
    ctx.beginPath();
    ctx.arc(top.x - radius / 4, top.y + radius / 2, 2, 0, Math.PI * 2);
    ctx.stroke();

    // Right eye
    ctx.beginPath();
    ctx.arc(top.x + radius / 4, top.y + radius / 2, 2, 0, Math.PI * 2);
    ctx.stroke();

    // Smil
    ctx.beginPath();
    ctx.arc(top.x, top.y + radius, 10, 0, Math.PI);
    ctx.stroke();

    // Bubble
    ctx.strokeStyle = blå;
    ctx.beginPath();
    let lol = {
      0: 2,
      1: 1,
      2: 0
    };
    let m = lol[counter % 3];
    ctx.arc(bot.x - 20, 25 + 40 * m, 10 + (counter % 3) * 2, 0, Math.PI * 2);
    ctx.stroke();
  }, 99);
})();
// BAIT END

// START FREEZE
(function() {
  let canvas = document.getElementById("freeze");
  let ctx = canvas.getContext("2d");
  ctx.lineWidth = 5;

  setInterval(function() {
    ctx.clearRect(0, 0, W, H);

    ctx.strokeStyle = mørk;
    ctx.fillStyle = mørk;

    // Right arm
    ctx.beginPath();
    ctx.moveTo(W / 2, H - 140);
    ctx.lineTo(W / 2 - 100, H - 140 - 25 * Math.random());
    ctx.stroke();

    // Left arm
    ctx.beginPath();
    ctx.moveTo(W / 2, H - 140);
    ctx.lineTo(W / 2 + 100, H - 140 - 25 * Math.random());
    ctx.stroke();

    ctx.strokeStyle = blå;
    ctx.fillStyle = hvit;

    // Butt
    ctx.beginPath();
    ctx.arc(W / 2, H - 80, 60, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();

    // Body
    ctx.beginPath();
    ctx.arc(W / 2, H - 140, 45, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();

    let headOffset =
      Math.random() > 0.5 ? 5 * Math.random() : -(5 * Math.random());

    // Head
    ctx.beginPath();
    ctx.arc(W / 2 + headOffset, H - 195, 35, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();

    ctx.strokeStyle = mørk;

    // Left eye
    ctx.beginPath();
    ctx.arc(W / 2 + 10 + headOffset, H - 195 - 35 / 3, 2, 0, Math.PI * 2);
    ctx.stroke();

    // Right eye
    ctx.beginPath();
    ctx.arc(W / 2 - 10 + headOffset, H - 195 - 35 / 3, 2, 0, Math.PI * 2);
    ctx.stroke();

    // Smil
    ctx.beginPath();
    ctx.arc(W / 2 + headOffset, H - 195, 10, 0, Math.PI);
    ctx.stroke();
  }, 99);
})();
// END FREEZE
