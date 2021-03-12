import React from "react";
import Chart from "./Chart";
import { useSwipe } from "./useSwipe";

function View() {
  useSwipe(
    null, // null is window
    {
      // will work correct only with true
      capture: true, // ignore chart preventing
      prevent: false,
    },
    {
      move: function (e, o) {
        const { dy, isVertical, isFirst, stopSwipe } = o;

        if (isVertical) {
          window.scrollBy(0, dy);
          e.stopPropagation();
          e.preventDefault();
        } else {
          if (isFirst) {
            stopSwipe();
          }
        }
      },
    }
  );

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <h1>View</h1>
      <Chart />
      <div style={{ width: 500, height: 500, backgroundColor: "yellow" }}></div>
      <div style={{ width: 500, height: 500, backgroundColor: "green" }}></div>
    </div>
  );
}

export default View;
