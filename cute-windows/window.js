import {
  html,
  useState,
  useRef,
  useEffect,
  useLayoutEffect
} from "https://unpkg.com/htm/preact/standalone.module.js";

export function Window({
  title,
  children,
  onClick,
  onClose,
  onGrab,
  x,
  y,
  grabbed,
  width,
  height,
  setPos,
  onExpand
}) {
  let ref = useRef();
  let [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (ref.current) {
      setPos({
        x: x - ref.current.clientWidth / 2,
        y: y - ref.current.clientHeight / 2
      });
    }
  }, []);

  let style = `
    top: ${y}px;
    left: ${x}px;
    width: ${Math.max(width || 0, 242)}px;
    height: ${Math.max(height || 0, 242)}px;
  `;

  function getInnerOffset(event) {
    
    if (onGrab) {
      let innerOffset = { x: 0, y: 0 };
      if (event instanceof MouseEvent) {
        innerOffset = { 
          x: (event.offsetX || 0) + event.target.offsetLeft * 1.25, 
          y: (event.offsetY || 0) + event.target.offsetTop * 1.25, 
        };
      }
      if (event instanceof TouchEvent) {
        let lastTouch = event.changedTouches[0];
        let offsetX =
          lastTouch.clientX - lastTouch.target.getBoundingClientRect().left;
        let offsetY =
          lastTouch.clientY - lastTouch.target.getBoundingClientRect().top;
        innerOffset = {
          x: offsetX || 0,
          y: offsetY || 0
        };
      }
      onGrab({ innerOffset });
    }
  }

  function onMouseUp() {}

  function onMouseMove(event) {}

  function ignoreClicks(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  return html`
    <div
      class="window ${grabbed ? "picked" : ""} ${mounted ? "" : "mounting"}"
      style=${style}
      onMouseDown=${onClick}
      ref=${ref}
    >
      <div
        class="window-titlebar"
        onMouseDown=${getInnerOffset}
        onTouchStart=${getInnerOffset}
        onMouseUp=${onMouseUp}
        onMouseLeave=${onMouseUp}
        onTouchEnd=${onMouseUp}
        onTouchCancel=${onMouseUp}
        onMouseMove=${onMouseMove}
        onTouchMove=${onMouseMove}
      >
        <button
          class="window-close"
          onMouseDown=${ignoreClicks}
          onClick=${onClose}
        >
          Close
          <div class="line-h"></div>
          <div class="line-v"></div>
        </button>
        <button
          class="window-maximise"
          onMouseDown=${ignoreClicks}
          onClick=${onExpand}
        >
          Maximise
          <div class="line-h"></div>
          <div class="line-v"></div>
        </button>
        <div class="window-title">${title}</div>
      </div>
      <div class="window-body">
        ${children}
      </div>
    </div>
  `;
}
