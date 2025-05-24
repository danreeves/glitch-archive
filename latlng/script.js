if (document.location.protocol === "http:") {
  document.location = document.location.href.replace("http", "https");
}

function update(data) {
  let lat = data.coords.latitude;
  let lng = data.coords.longitude;
  console.log({ lat, lng });
  document.querySelector(".lat").innerText = lat.toFixed(2) + "° N";
  document.querySelector(".lng").innerText = lng.toFixed(2) + "° W";
  document.title = lat.toFixed(2) + "° N" + ", " + lng.toFixed(2) + "° W";
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(update);
  navigator.geolocation.watchPosition(update);
}
