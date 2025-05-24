if (location.protocol !== 'https:') {
  location.protocol = 'https:'
}

console.log("woof");

let colours = ["#ff71ce", "#01cdfe", "#05ffa1", "#b967ff", "#fffb96"];

function range(min, max) {
  return Math.random() * (max - min) + min;
}

let nextMap = new Map();
function next(arr) {
  let current = nextMap.get(arr) ?? -1;
  current++;
  if (current > arr.length) {
    current = 0;
  }
  nextMap.set(arr, current);
  return arr[current];
}

function makeWave(elem, text) {
  [...text].forEach((char, i) => {
    let letter = document.createElement("span");
    letter.innerText = char;
    letter.style.animationDelay = 0.075 * i + "s";
    elem.appendChild(letter);
  });
}

function makeWoof(pos, text = "woof") {
  let elem = document.createElement("div");
  elem.style.position = "fixed";
  elem.style.top = pos.y + "px";
  elem.style.left = pos.x + "px";
  elem.style.color = next(colours);
  elem.style.fontSize = range(16, 26) + "px";
  elem.className = "wave2";
  makeWave(elem, text);
  setTimeout(() => {
    elem.style.transform = `translate(${range(-20, 20)}px, -${range(
      120,
      150
    )}px) rotate(${range(-15, 15)}deg)`;
    elem.style.opacity = 0;
  }, 0);
  return elem;
}

window.addEventListener("load", (event) => {
  console.log("woof woof");

  document.body.addEventListener("click", (evt) => {
    console.log("woof woof woof");
    let woof = makeWoof({ x: evt.pageX, y: evt.pageY });
    document.body.appendChild(woof);
    setTimeout(() => {
      woof.remove();
    }, 3000);
    new Audio(
      "https://cdn.glitch.global/85300085-705f-42e5-acee-729060a5b7c4/bork.mp3?v=1653751134313"
    ).play();
  });

  document.querySelector(".cta").innerText = "";
  makeWave(document.querySelector(".cta"), "click to dog");
});
