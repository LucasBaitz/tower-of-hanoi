"use client";
import DropZone from "@/components/DropZone/DropZone";
import { Disk } from "@/interfaces/Disk";
import { Minus, Plus, RotateCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const MAX_DISK = 8;
const MIN_DISK = 3;

const minMoves = (initialDisks: number): number => {
  return 2 ** initialDisks - 1;
};

const checkWin = (columns: Disk[][], expectedQuantity: number) => {
  return columns[columns.length - 1].length === expectedQuantity;
};

const DragAndDropExample: React.FC = () => {
  const [disksQuantity, setDisksQuantity] = useState<number>(3); // Default quantity is 3

  const createDisks = (): Disk[] => {
    const disks: Disk[] = [];

    for (let i = 0; i < disksQuantity; i++) {
      disks.push({ id: i.toString(), size: (i + 1) * 10, color: "#000000" });
    }

    return disks;
  };

  const [columns, setColumns] = useState<Disk[][]>([[], [], []]);
  const [movesCounter, setMovesCounter] = useState<number>(0);

  useEffect(() => {
    setColumns([createDisks(), [], []]);
  }, [disksQuantity]);

  const resetStates = () => {
    setColumns([createDisks(), [], []]);
    setMovesCounter(0);
  };

  const handleDropItem = (itemId: string, targetColumnIndex: number) => {
    const originalColumnIndex = columns.findIndex((column) =>
      column.some((item) => item.id === itemId)
    );

    const newColumns = columns.map((column) =>
      column.filter((item) => item.id !== itemId)
    );

    const draggedItem = columns.flat().find((item) => item.id === itemId);

    if (draggedItem) {
      const targetColumn = newColumns[targetColumnIndex];

      if (
        targetColumn.length === 0 ||
        targetColumn[0].size > draggedItem.size
      ) {
        newColumns[targetColumnIndex].unshift(draggedItem);
        setMovesCounter((prevState) => prevState + 1);
      } else {
        newColumns[originalColumnIndex].unshift(draggedItem);
      }
    }

    setColumns(newColumns);

    if (checkWin(newColumns, disksQuantity)) {
      alert("You won!");
      resetStates();
    }
  };

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center p-6 bg-gradient-to-r from-slate-500 to-gray-500">
      <DndProvider backend={HTML5Backend}>
        <div className="flex justify-around w-full max-w-4xl mt-10">
          {columns.map((items, columnIndex) => (
            <DropZone
              key={columnIndex}
              columnIndex={columnIndex}
              items={items}
              onDropItem={handleDropItem}
            />
          ))}
        </div>
        <div className="bg-yellow-950 w-full rounded-t-full h-10"></div>
        <div className="w-full justify-between flex ">
          <div className="flex justify-around w-full rounded-2xl ">
            <div className="flex justify-center items-center flex-col rounded-3xl p-2">
              <p className="text-lg px-5 font-semibold mb-4 ">Minimum Moves</p>
              <span className="text-2xl00">{minMoves(disksQuantity)}</span>
            </div>
            <div className="flex justify-center items-center flex-col rounded-3xl p-2">
              <p className="text-lg px-5 font-semibold mb-4">Moves</p>
              <span className="text-2xl">{movesCounter}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center mb-8 flex-col">
          <button
            onClick={() => resetStates()}
            className="flex align-middle items-center border rounded-xl p-2 mb-5"
          >
            Reset
            <RotateCcw className="ml-2" />
          </button>
          <div className="flex items-center align-middle">
            <button
              onClick={() =>
                disksQuantity - 1 >= MIN_DISK &&
                setDisksQuantity(disksQuantity - 1)
              }
              className="bg-red-500 text-white rounded-full rounded-r-none p-2 hover:bg-red-700"
            >
              <Minus />
            </button>
            <div className="px-5 border-2 border-">
              <p className="text-3xl">{disksQuantity}</p>
            </div>
            <button
              onClick={() =>
                disksQuantity + 1 <= MAX_DISK &&
                setDisksQuantity(disksQuantity + 1)
              }
              className="bg-green-500 text-white rounded-full rounded-l-none p-2 hover:bg-green-700"
            >
              <Plus />
            </button>
          </div>
        </div>
      </DndProvider>
    </main>
  );
};

export default DragAndDropExample;
