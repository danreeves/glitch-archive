let title = document.querySelector('#title')
let input = document.querySelector('#input')
let oreo = document.querySelector('#oreo')

input.addEventListener('input', (e) => {
  createCookie(e.target.value)
})

function createCookie (value) {
  let val = value.toLowerCase()
  title.textContent = val
  oreo.innerHTML = ''
  document.title = val
  window.history.replaceState({}, "", val)
  
  let chars = val.split('')
  let tokens = []
  
  chars.forEach((ch, i, chars) => {
    if (ch === 'o' || ch === 'オ') {
      tokens.push('o')
    }
    
    if (ch === 'r' || ch === 'レ') {
      if (chars[i + 1] === 'e' || ch === 'レ') {
        tokens.push('re')
      }
    }
    
    if (ch ==='&' || ch === 'と') {
      tokens.push('space')
    }
  })
  
  tokens.reverse()
  
  tokens.forEach(token => {
    let el = document.createElement('div')
    el.classList.add(token)
    oreo.appendChild(el)
  })
  
}

let pathname = window.decodeURI(document.location.pathname.replace(/\//g, ' ').trim())

if (pathname.length) {
  createCookie(pathname)
  input.value = pathname
}