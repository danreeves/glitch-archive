import {
  html,
  useState,
  useMemo
} from "https://unpkg.com/htm/preact/standalone.module.js";

import { Window } from "./window.js";

export function CounterWindow({ onClick, onClose, ...rest }) {
  let [num, setNum] = useState(0);
  function increment() {
    let next = num + 1;
    setNum(next);
  }
  return html`
    <${Window}
      title="Hello, World!"
      onClick=${onClick}
      onClose=${onClose}
      ...${rest}
    >
      <p>It's a window, wheeeeee.</p>
      <p>Clicks: ${num}</p>
      <button class="button" onClick=${increment}>Click me</button>
    <//>
  `;
}
