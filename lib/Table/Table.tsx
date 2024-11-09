import { ReactNode, useCallback, useState } from "react";
import "./table.css";
import _ from "lodash";

type Props<T> = {
  columns: Array<ColumnProps<T>>;
  data?: T[];
  rowColor?: string;
  altRowColor?: string;
  headerClassName?: string;
  accentColor?: string;
  tableStyles?: React.CSSProperties;
};

interface ColumnProps<T> {
  key: string;
  title: string | ReactNode;
  render?: (column: ColumnProps<T>, item: T) => ReactNode;
  width: string;
}

type orderArray = "asc" | "desc" | null;

export const Table = <T,>({
  data,
  columns,
  rowColor = "white",
  altRowColor = "ghostwhite",
  accentColor = "black",
  tableStyles = { backgroundColor: "white" },
  ...props
}: Props<T>) => {
  const [tdata, setTdata] = useState(data);

  let [orderArray, setOrderArray] = useState<orderArray[]>(
    new Array(columns.length).fill(null)
  );

  const sortTable = useCallback(
    (key: string, index: number) => {
      let newTdata: T[] = [];
      if (orderArray[index] === null) {
        newTdata = _.orderBy(tdata, key, ["asc"]);
        const newArray = new Array(columns.length).fill(null);
        newArray[index] = "asc";
        setOrderArray(newArray);
      } else if (orderArray[index] === "asc") {
        newTdata = _.orderBy(tdata, key, ["desc"]);
        const newArray = new Array(columns.length).fill(null);
        newArray[index] = "desc";
        setOrderArray(newArray);
      } else if (orderArray[index] === "desc") {
        newTdata = [...data!];
        const newArray = new Array(columns.length).fill(null);
        newArray[index] = null;
        setOrderArray(newArray);
      }
      setTdata(newTdata);
    },
    [tdata]
  );

  const headers = columns.map((column, index) => {
    return (
      <th
        key={`headCell-${index}`}
        className={`voidTableHeader ${
          props.headerClassName ? props.headerClassName : ""
        }`}
        style={{ minWidth: column.width }}
        onClick={() => sortTable(column.key, index)}
        onKeyDown={(e) => e.key === "Enter" && sortTable(column.key, index)}
        tabIndex={0}
      >
        <div className="voidTableHeaderContainer">
          {column.title}
          {orderArray[index] === "asc" && (
            <div
              style={{ width: "1rem", height: "1rem", marginLeft: "0.5rem" }}
            >
              <UpArrow color={accentColor} />
            </div>
          )}
          {orderArray[index] === "desc" && (
            <div
              style={{ width: "1rem", height: "1rem", marginLeft: "0.5rem" }}
            >
              <DownArrow color={accentColor} />
            </div>
          )}
        </div>
      </th>
    );
  });

  const rows = !tdata?.length ? (
    <tr>
      <td colSpan={columns.length} className="voidTableNoData">
        No data
      </td>
    </tr>
  ) : (
    tdata?.map((row, index) => {
      return (
        <tr
          key={`row-${index}`}
          className={`voidTableRow`}
          style={{
            backgroundColor: index % 2 === 0 ? rowColor : altRowColor,
          }}
        >
          {columns.map((column, index2) => {
            const value = column.render
              ? column.render(column, row as T)
              : (row[column.key as keyof typeof row] as string);

            return (
              <td className="voidTableData" key={`cell-${index2}`} tabIndex={0}>
                {value instanceof Date && value.toLocaleDateString("en-US")}
                {typeof value === "string" && value}
                {typeof value === "number" && value.toString()}
                {typeof value === "boolean" && (value ? "True" : "False")}
                {typeof value === "bigint" && value}{" "}
              </td>
            );
          })}
        </tr>
      );
    })
  );

  return (
    <table className="voidTable" style={{ ...tableStyles }}>
      <thead className="voidTableHead">
        <tr className="voidTableHeaderRow">{headers}</tr>
      </thead>

      <tbody className="voidTableBody">{rows}</tbody>
    </table>
  );
};

function UpArrow({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} height="1em" width="1em">
      <path d="M19 17h3l-4 4-4-4h3V3h2M2 17h10v2H2M6 5v2H2V5m0 6h7v2H2v-2z" />
    </svg>
  );
}

function DownArrow({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} height="1em" width="1em">
      <path d="M19 7h3l-4-4-4 4h3v14h2M2 17h10v2H2M6 5v2H2V5m0 6h7v2H2v-2z" />
    </svg>
  );
}

// style={{
// 	stroke: "none",
// 	strokeWidth: 1,
// 	strokeDasharray: "none",
// 	strokeLinecap: "butt",
// 	strokeDashoffset: 0,
// 	strokeLinejoin: "miter",
// 	strokeMiterlimit: 4,
// 	fill: color,
// 	fillRule: "nonzero",
// 	opacity: 1,
// 	transform: "translate(-13, -13)",
// }}
