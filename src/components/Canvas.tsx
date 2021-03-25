import { motion } from "framer-motion";
import "charts.css";

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
} as const;

type Props = {
  data: any[];
  options: {
    showNumber: boolean;
  };
};

export function Canvas({ data: items, options: { showNumber } }: Props) {
  const columnBasis = items.length === 0 ? 0 : 1 / items.length;
  return (
    <table
      className="charts-css column"
      style={{
        height: "500px",
      }}
    >
      <tbody>
        {items.map((item) => (
          <motion.tr
            key={item}
            layout
            transition={spring}
            style={
              {
                // REF: https://chartscss.org/components/data/#display-size
                "--size": (item + 1) * columnBasis,
              } as any
            }
          >
            <td>{showNumber && item + 1}</td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  );
}
