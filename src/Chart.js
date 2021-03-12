import React from "react";
import { useSwipe } from "./useSwipe";

function Chart() {
  const chartScrollRef = React.useRef();

  useSwipe(
    chartScrollRef, // chart with scroll
    {
      capture: false, // work normal without capture
      prevent: true, // block everything above me
    },
    {
      move: function (e, o) {
        const { dx, isHorizontal, isFirst, stopSwipe } = o;
        const chart = chartScrollRef && chartScrollRef.current;
        if (isHorizontal) {
          if (chart) {
            chart.scrollBy(dx, 0);
          }
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
        border: "3px solid gray",
      }}
    >
      <h1>Chart</h1>
      <div
        ref={chartScrollRef}
        style={{
          width: 500,
          height: 500,
          overflowX: "scroll",
          overflowY: "hidden",
        }}
      >
        <div
          style={{
            width: 1000,
            height: 500,
          }}
        >
          <div
            style={{
              width: 250,
              height: 500,
              backgroundColor: "rebeccapurple",
              display: "inline-block",
            }}
          ></div>
          <div
            style={{
              width: 250,
              height: 500,
              backgroundColor: "black",
              display: "inline-block",
            }}
          ></div>
          <div
            style={{
              width: 250,
              height: 500,
              backgroundColor: "magenta",
              display: "inline-block",
            }}
          ></div>
          <div
            style={{
              width: 250,
              height: 500,
              backgroundColor: "lime",
              display: "inline-block",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Chart;
