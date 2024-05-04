import indexToColumn from "@/util/indexToColumn";

interface Props {
  rows: string[][];
  page: number;
  sheet: string;
}

/** Renders the provided array of rows in a HTML table component */
const Table = ({ rows, page, sheet }: Props) => {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 max-w-full overflow-auto">
      <table className="my-0 border-collapse">
        <thead>
          <tr>
            {rows[0].map((_, i) => {
              const colIndex = indexToColumn(i);
              const id = `${sheet}-${page}-${colIndex}`;
              return (
                <th
                  className="py-1.5 px-3 text-sm md:text-base border border-neutral-200 dark:border-neutral-800"
                  key={id}
                >
                  {colIndex}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const id = `${sheet}-${page}-${i}`;
            return (
              <tr key={id}>
                {row.map((cell, i) => {
                  const cellID = id + "-" + i;
                  return (
                    <td
                      className="py-1.5 px-3 text-sm md:text-base border border-neutral-200 dark:border-neutral-800 whitespace-nowrap"
                      key={cellID}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
