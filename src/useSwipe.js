import React, { useEffect } from "react";

export function useSwipe(ref, options, handlers = { move: () => {} }) {
  const capture = !!(options && options.capture);
  const prevent = !!(options && options.prevent);

  ref = ref || { current: window };

  const index = React.useRef(-1);
  const isVertical = React.useRef(false);

  const sevents = React.useMemo(
    () => ({
      mousedown: function (e) {
        index.current = 0;

        if (prevent) {
          e.stopPropagation();
          e.preventDefault();
        }
      },
    }),
    [ref]
  );

  const wevents = React.useMemo(
    () => ({
      mousemove: function (e) {
        const idx = index.current;
        const hadDown = idx >= 0;

        if (hadDown) {
          const isFirst = idx === 0;
          index.current = idx + 1;

          const vertical = Math.abs(e.movementY) > Math.abs(e.movementX);

          if (isFirst) {
            isVertical.current = vertical;
          }

          document.body.style.cursor = isVertical.current
            ? "row-resize"
            : "col-resize";

          handlers.move(e, {
            index: index.current,
            dy: -e.movementY,
            dx: -e.movementX,
            y: e.offsetY,
            x: e.offsetX,
            isVertical: isVertical.current,
            isHorizontal: !isVertical.current,
            isFirst,
            stopSwipe: () => {
              index.current = -1;
              document.body.style.cursor = "unset";
            },
          });
        }

        if (prevent) {
          e.stopPropagation();
          e.preventDefault();
        }
      },
      mouseup: function (e) {
        const idx = index.current;
        const hadDown = idx >= 0;
        const hadMove = idx >= 1;

        index.current = -1;
        document.body.style.cursor = "unset";

        if (prevent) {
          e.stopPropagation();
          e.preventDefault();
        }
      },
    }),
    []
  );

  useEffect(() => {
    for (const [name, handler] of Object.entries(wevents)) {
      window.removeEventListener(name, handler, {
        capture,
      });
      window.addEventListener(name, handler, {
        capture,
      });
    }

    return () => {
      for (const [name, handler] of Object.entries(wevents)) {
        window.removeEventListener(name, handler, {
          capture,
        });
      }
    };
  }, []);

  useEffect(() => {
    const ele = ref.current;

    if (ele) {
      for (const [name, handler] of Object.entries(sevents)) {
        ele.removeEventListener(name, handler, {
          capture,
        });
        ele.addEventListener(name, handler, {
          capture,
        });
      }
    }

    return () => {
      if (ele) {
        for (const [name, handler] of Object.entries(sevents)) {
          ele.removeEventListener(name, handler, {
            capture,
          });
        }
      }
    };
  }, [ref]);
}
