import { stringToColor } from "@/utils/color";
import { LegacyRef } from "react";
import { useDrag } from "react-dnd";

const DraggableDisk: React.FC<{
  id: string;
  color: string;
  size: number;
  isTopItem: boolean;
}> = ({ id, color, size, isTopItem }) => {
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
      ref={isTopItem ? drag as unknown as LegacyRef<HTMLDivElement> : null }
      className={`rounded-2xl border-2 border-yellow-500 ${
        isTopItem ? "cursor-move" : "cursor-not-allowed"
      }`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "15px",
        margin: "1px",
        backgroundColor: stringToColor(color),
        minWidth: `${size * 4}px`,
        maxWidth: `${size}px`,
      }}
    ></div>
  );
};

export default DraggableDisk;
