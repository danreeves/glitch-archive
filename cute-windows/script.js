import {
  html,
  render,
  useEffect,
  useState,
} from "https://unpkg.com/htm/preact/standalone.module.js";
import { randomRange } from "./random-range.js";
import { CounterWindow } from "./counter-window.js";

let themes = ['', 'coral']

let windowId = 0;
function App() {
  let [windows, setWindows] = useState([]);
  let [grabbedWindow, setGrabbedWindow] = useState(null);
  let [innerOffset, setInnerOffset] = useState({ x: 0, y: 0 });
  
  let [theme, setTheme] = useState('')
  
  function toggleTheme() {
    let currentTheme = themes.indexOf(theme)
    let nextTheme = currentTheme >= themes.length ? themes[0] : themes[currentTheme + 1]
    setTheme(nextTheme)
    document.body.className = nextTheme
  }
  
  useEffect(() => {openCounter()},[])

  function setPos(id, { x, y }) {
    y = Math.max(y, 0);
    let newWindows = windows.map(win => {
      if (win.id === id) {
        return {
          ...win,
          x,
          y
        };
      }

      return win;
    });
    setWindows(newWindows);
  }

  function updateWindow(id, { height, width, y, ...rest }) {
    y = Math.max(y, 0);
    height = Math.min(height, window.innerHeight);
    width = Math.min(width, window.innerWidth);
    let newWindows = windows.map(win => {
      if (win.id === id) {
        return {
          ...win,
          height,
          width,
          y,
          ...rest
        };
      }

      return win;
    });
    setWindows(newWindows);
  }

  function openCounter() {
    let height = randomRange(200, window.innerHeight / 2);
    let width = randomRange(height, window.innerWidth / 2);
    setWindows(
      windows.concat({
        id: windowId++,
        component: CounterWindow,
        x: window.innerWidth / 2 - randomRange(-50, 50),
        y: window.innerHeight / 2 + randomRange(-50, 50),
        width,
        height
      })
    );
  }

  function createOnClick(id) {
    return function bringToFront() {
      let window = windows.find(win => win.id === id);
      setWindows(windows => {
        let index = windows.indexOf(window);
        if (index > -1) {
          let newWindows = [...windows];
          newWindows.splice(index, 1);

          return [...newWindows, window];
        }
        return windows;
      });
    };
  }

  function createOnClose(id) {
    return function onClose() {
      setWindows(windows => {
        let window = windows.find(win => win.id === id);
        let index = windows.indexOf(window);
        if (index > -1) {
          let newWindows = [...windows];
          newWindows.splice(index, 1);

          return [...newWindows];
        }
        return windows;
      });
    };
  }

  function createOnGrab(id) {
    return function onGrab({ innerOffset }) {
      setGrabbedWindow(id);
      setInnerOffset(innerOffset);
      let window = windows.find(win => win.id === id);
      setPos(id, { x: window.x , y: window.y  });
    };
  }

  function onMouseMove(event) {
    if (grabbedWindow != null) {
      if (event instanceof MouseEvent) {
        setPos(grabbedWindow, {
          x: event.pageX - innerOffset.x,
          y: event.pageY - innerOffset.y
        });
      }

      if (event instanceof TouchEvent) {
        event.preventDefault();
        let lastTouch = event.changedTouches[0];
        setPos(grabbedWindow, {
          x: lastTouch.pageX - innerOffset.x,
          y: lastTouch.pageY - innerOffset.y
        });
      }
    }
  }

  function onMouseUp() {
    if (grabbedWindow != null) {
      let window = windows.find(win => win.id === grabbedWindow);
      setPos(grabbedWindow, { x: window.x , y: window.y  });
      setGrabbedWindow(null);
    }
  }

  function closeAll() {
    setWindows([]);
  }

  function createOnExpand(id) {
    return function onExpand() {
      let height = window.innerHeight - 100;
      let width = window.innerWidth - 100;
      updateWindow(id, {
        height,
        width,
        x: 50, y: 50
      });
    };
  }

  return html`
    <div
      class="wrapper"
      onMouseUp=${onMouseUp}
      onTouchEnd=${onMouseUp}
      onMouseMove=${onMouseMove}
      onTouchMove=${onMouseMove}
    >
      <h1>Hello, World!</h1>
      <button class="button" onClick=${openCounter}>Open Counter</button>
      <button class=button onClick=${toggleTheme}>Theme</button>
      <button class="button button-secondary" onClick=${closeAll}>Exit</button>
      ${windows.map(
        (window, i) =>
          html`
            <${window.component}
              key=${window.id}
              onClick=${createOnClick(window.id)}
              onClose=${createOnClose(window.id)}
              onGrab=${createOnGrab(window.id)}
              onExpand=${createOnExpand(window.id)}
              grabbed=${grabbedWindow === window.id}
              setPos=${({ x, y }) => setPos(window.id, { x, y })}
              x=${window.x}
              y=${window.y}
              width=${window.width}
              height=${window.height}
            />
          `
      )}
    </div>
  `;
}

render(
  html`
    <${App} />
  `,
  document.getElementById("app")
);
