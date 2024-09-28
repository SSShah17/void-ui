import "./charts.css";

interface PieChartProps {
  data: { value: number; title: string; color: string }[];
  className?: string;
}

export function PieChart({ data, ...props }: PieChartProps) {
  const total = data.reduce((a, b) => +a + +b.value, 0);
  const percentageFromData = data.map((arc) => arc.value / total);
  let cumulativePercent = 0;
  return (
    <svg
      viewBox="-1 -1 2 2"
      className={`void-piechart ${props.className ? props.className : ""}`}
      tabIndex={0}
      aria-description="piechart"
    >
      {data.map((data, index) => {
        const [startX, startY] =
          percentageToCoordinatesMapper(cumulativePercent);
        cumulativePercent += percentageFromData[index];
        const [endX, endY] = percentageToCoordinatesMapper(cumulativePercent);
        const largeArcFlag = percentageFromData[index] > 0.5 ? 1 : 0;
        const pathData = [
          `M ${startX} ${startY}`,
          `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          `L 0 0 `,
        ].join(" ");
        return (
          <path
            key={index}
            d={pathData}
            fill={data.color}
            className={`void-pieslice piece-${index}`}
          >
            <title>
              {data.title} | {(percentageFromData[index] * 100).toFixed(2)}% |{" "}
              {data.value}
            </title>
          </path>
        );
      })}
    </svg>
  );
}

function percentageToCoordinatesMapper(percent: number) {
  return [Math.cos(2 * Math.PI * percent), Math.sin(2 * Math.PI * percent)];
}
