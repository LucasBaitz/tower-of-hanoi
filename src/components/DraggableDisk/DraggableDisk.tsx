import { colors } from "@/utils/color";
import { LegacyRef } from "react";
import { useDrag } from "react-dnd";

const DraggableDisk: React.FC<{
  id: string;
  color: string;
  size: number;
  isTopItem: boolean;
}> = ({ id, size, isTopItem }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "DISK",
      item: { id },
      canDrag: isTopItem,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [isTopItem]
  );

  return (
    <div
      ref={isTopItem ? (drag as unknown as LegacyRef<HTMLDivElement>) : null}
      className={`rounded-2xl border-2 flex justify-center border-black ${
        isTopItem ? "cursor-grab" : "cursor-not-allowed"
      }`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "15px",
        margin: "1px",
        backgroundColor: colors[parseInt(id)],
        minWidth: `${size * 4}px`,
        maxWidth: `${size}px`,
      }}
    ></div>
  );
};

export default DraggableDisk;
