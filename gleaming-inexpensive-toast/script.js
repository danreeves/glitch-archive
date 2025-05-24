setInterval(function () {
  document.querySelector('.time').innerHTML = moment().format("H:m:s")
}, 100)