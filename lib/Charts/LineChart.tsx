import React from "react";

export interface LineChartData {
  label: string;
  //   x: number;
  data: number;
}

type LineChartProps = {
  data: LineChartData[];
  height?: number;
  width?: number;
  axesColor?: string;
  lineWidth?: number;
  textColor?: string;
  range?: { min: number; max: number };
  numberOfYAxisDivisions?: number;
  showXAxisGridLines?: boolean;
  showYAxisGridLines?: boolean;
  gridLinesColor?: string;
  pointWidth?: number;
  lineColor?: string;
  pointColor?: string;
  xAxisText?: string;
  yAxisText?: string;
  fontSize?: number;
};

export function LineChart({
  data,
  height = 450,
  width = 800,
  axesColor = "black",
  lineWidth = 2,
  textColor = "#808080",
  numberOfYAxisDivisions = 5,
  gridLinesColor = "#e6e6e6",
  pointWidth = 10,
  lineColor = "#303030",
  ...props
}: LineChartProps) {
  const FONT_SIZE = props.fontSize || width / 50;
  const maximumPointOfData =
    (props.range && props.range.max) ||
    Math.max(...data.map((elem) => elem.data));
  const minimumPointOfData =
    (props.range && props.range.min) ||
    Math.min(...data.map((elem) => elem.data));

  const XLabels = () => {
    return data.map((point, index) => {
      const x = 0.1 * width + (index / (data.length - 1)) * (0.85 * width);
      return (
        <React.Fragment key={index}>
          <text
            y={0.9 * height + FONT_SIZE + width / 100}
            x={x - FONT_SIZE}
            style={{ fontSize: FONT_SIZE, fill: textColor }}
            className={`void-chartXtext xLabel-${index}`}
          >
            <title>{point.label}</title>
            {point.label}
          </text>
          {props.showXAxisGridLines &&
            index !== 0 &&
            index !== data.length - 1 && (
              <line
                x1={x}
                y1={0.9 * height}
                x2={x}
                y2={0.05 * height}
                style={{
                  stroke: gridLinesColor,
                  strokeWidth: lineWidth,
                  zIndex: 1,
                }}
                className={`void-xGrid xGrid-${index - 1}`}
              />
            )}
        </React.Fragment>
      );
    });
  };

  const YLabels = () => {
    return new Array(numberOfYAxisDivisions + 1).fill(0).map((_, index) => {
      const y =
        0.95 * height - index * ((0.85 * height) / numberOfYAxisDivisions);
      return (
        <React.Fragment key={index}>
          <text
            x={0}
            y={y - FONT_SIZE}
            style={{ fontSize: FONT_SIZE, fill: textColor }}
            className={`void-chartYtext label-${index}`}
          >
            <title>
              {!(index === 0)
                ? maximumPointOfData * (index / numberOfYAxisDivisions)
                : minimumPointOfData}
            </title>
            {!(index === 0)
              ? maximumPointOfData * (index / numberOfYAxisDivisions)
              : minimumPointOfData}
          </text>
          {props.showYAxisGridLines &&
            index !== 0 &&
            index !== numberOfYAxisDivisions && (
              <line
                x1={0.1 * width}
                y1={y - 0.05 * height}
                x2={0.95 * width}
                y2={y - 0.05 * height}
                style={{
                  stroke: gridLinesColor,
                  strokeWidth: lineWidth,
                  zIndex: 1,
                }}
                className={`void-yGrid yGrid-${index - 1}`}
              />
            )}
        </React.Fragment>
      );
    });
  };

  const Points = () => {
    return data.map((point, index) => {
      const x = 0.1 * width + (index / (data.length - 1)) * (0.85 * width);
      const y =
        height -
        (0.1 * height + (point.data / maximumPointOfData) * 0.85 * height);
      return (
        <circle
          key={index}
          r={pointWidth / 2}
          cx={x}
          cy={y}
          className={`void-linepoint point-${index}`}
        >
          <title>
            {props.xAxisText ? props.xAxisText : "X-Axis"}: {point.label}&#10;
            {props.yAxisText ? props.yAxisText : "Y-Axis"}: {point.data}
          </title>
        </circle>
      );
    });
  };

  const Lines = () => {
    return data.map((point, index) => {
      if (index === data.length - 1) {
        return;
      } else {
        let x1 = 0.1 * width + (index / (data.length - 1)) * (0.85 * width);
        let y1 =
          height -
          (0.1 * height + (point.data / maximumPointOfData) * 0.85 * height);
        let x2 =
          0.1 * width + ((index + 1) / (data.length - 1)) * (0.85 * width);
        let y2 =
          height -
          (0.1 * height +
            (data[index + 1].data / maximumPointOfData) * 0.85 * height);
        const isIntersecting = intersect(x1, y1, x2, y2, width, height);
        if (isIntersecting?.seg1) {
          if (y2 <= isIntersecting.y) {
            x2 = isIntersecting.x;
            y2 = isIntersecting.y;
          } else {
            x1 = isIntersecting.x;
            y1 = isIntersecting.y;
          }
        }
        return (
          <line
            key={index}
            x1={x1}
            x2={x2}
            y1={y1}
            y2={y2}
            style={{
              stroke: lineColor,
              strokeWidth: lineWidth,
              zIndex: 1,
            }}
            className={`void-line line-${index}`}
          >
            <title>
              {data[index].label}: {data[index].data} - {data[index + 1].label}:{" "}
              {data[index + 1].data}
            </title>
          </line>
        );
      }
    });
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
      <XLabels />
      <YLabels />
      <rect
        width={0.85 * width}
        height={0.85 * height}
        x={0.1 * width}
        y={0.05 * height}
        style={{
          fill: "transparent",
          stroke: axesColor,
          strokeWidth: lineWidth,
          zIndex: 3,
        }}
        className="void-linebox"
      />
      <Lines />
      <Points />
      {props.xAxisText && (
        <text
          x={0.5 * width}
          y={height}
          style={{ fill: textColor, fontSize: FONT_SIZE }}
          className="void-lineXLabel"
        >
          <title>{props.xAxisText}</title>
          {props.xAxisText}
        </text>
      )}
      {props.yAxisText && (
        <text
          textAnchor="start"
          alignmentBaseline="middle"
          transform={`translate(${0.1 * width - FONT_SIZE}, ${
            height * 0.45
          }) rotate(90)`}
          style={{ fill: textColor, fontSize: FONT_SIZE }}
          className="void-lineYLabel"
        >
          <title>{props.yAxisText}</title>
          {props.yAxisText}
        </text>
      )}
    </svg>
  );
}

function intersect(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  width: number,
  height: number
) {
  const x3 = 0;
  const y3 = 0.05 * height;
  const x4 = width;
  const y4 = 0.05 * height;

  // Check if none of the lines are of length 0
  var ua,
    ub,
    denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  if (denom == 0) {
    return null;
  }
  ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
  ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
  return {
    x: x1 + ua * (x2 - x1),
    y: y1 + ua * (y2 - y1),
    seg1: ua >= 0 && ua <= 1,
    seg2: ub >= 0 && ub <= 1,
  };
}
