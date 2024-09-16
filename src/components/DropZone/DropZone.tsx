import { Disk } from "@/interfaces/Disk";
import { DragItem } from "@/interfaces/DragItem";
import { LegacyRef } from "react";
import { useDrop } from "react-dnd";
import DraggableDisk from "../DraggableDisk/DraggableDisk";

interface DropZoneProps {
  columnIndex: number;
  items: Disk[];
  onDropItem: (id: string, fromColumn: number) => void;
}

const DropZone: React.FC<DropZoneProps> = ({
  columnIndex,
  items,
  onDropItem,
}) => {
  const [, drop] = useDrop({
    accept: "DISK",
    drop: (item: DragItem) => {
      onDropItem(item.id, columnIndex);
    },
  });

  return (
    <div
      ref={drop as unknown as LegacyRef<HTMLDivElement>}
      className="flex justify-center flex-col items-center px-2 mx-2"
      style={{
        minHeight: "200px",
        flex: 1,
      }}
    >
      {items.length === 0 ? "" : null}
      <span className="h-full p-1 border-2 border-black border-b-0 outline-1 outline-black bg-[#d5b07c] rounded-full rounded-b-none"></span>
      {items.map((item, index) => (
        <DraggableDisk
          key={item.id}
          id={item.id}
          color={item.color}
          size={item.size}
          isTopItem={index === 0}
        />
      ))}
      <span className="w-full border-2 border-black rounded-full min-h-5 column-base-bg"></span>
    </div>
  );
};

export default DropZone;
