"use client";
import DropZone from "@/components/DropZone/DropZone";
import Footer from "@/components/Footer/Footer";
import ResetButton from "@/components/ResetButton/ResetButton";
import Sign from "@/components/Sign/Sign";
import { Disk } from "@/interfaces/Disk";
import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const MAX_DISK = 8;
const MIN_DISK = 1;

const minMoves = (initialDisks: number): number => {
  return 2 ** initialDisks - 1;
};

const checkWin = (columns: Disk[][], expectedQuantity: number) => {
  return columns[columns.length - 1].length === expectedQuantity;
};

const Main: React.FC = () => {
  const [disksQuantity, setDisksQuantity] = useState<number>(3);

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
        if (targetColumnIndex !== originalColumnIndex) {
          setMovesCounter((prevState) => prevState + 1);
        }
      } else {
        newColumns[originalColumnIndex].unshift(draggedItem);
      }
    }

    setColumns(newColumns);
  };

  return (
    <main className=" moving-gradient h-screen w-screen flex flex-col items-center justify-center p-6 bg-gradient-to-r from-slate-500 to-gray-500">
      <h1 className="text-3xl font-extrabold mb-10">Tower of Hanoi</h1>
      <Sign
        message={
          <div className="p-2 flex justify-center flex-col align-middle items-center">
            <h2 className="flex text-center my-2 font-black px-5">
              🥳 Congratulations! 🥳
            </h2>
            <p className="text-center w-[50%] text-sm">
              {movesCounter === minMoves(disksQuantity)
                ? "You got it perfectly 🤩! Well done! 👍"
                : "Now... can you do it in the minium amount of moves? 🤔"}
            </p>
          </div>
        }
        show={checkWin(columns, disksQuantity)}
      />
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
          <div className="flex justify-around w-full rounded-2xl mt-5">
            <div className="flex justify-center items-center align-middle">
              <p className="text-lg font-semibold bg-gray-800 border-gray-950 text-gray-300 p-2 border rounded-l-lg">
                Minimum Moves
              </p>
              <span className="text-xl p-2 px-5 border rounded-r-lg bg-gray-700 border-gray-950">
                {minMoves(disksQuantity)}
              </span>
            </div>
            <div className="flex justify-center items-center align-middle">
              <p className="text-lg font-semibold bg-gray-800 border-gray-950 text-gray-300 p-2 border rounded-l-lg">
                Moves
              </p>
              <span className="text-xl p-2 px-5 border rounded-r-lg bg-gray-700 border-gray-950">
                {movesCounter}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center mb-8 flex-col">
          <ResetButton onClick={resetStates} />
          <div className="flex items-center align-middle">
            <button
              onClick={() =>
                disksQuantity - 1 >= MIN_DISK &&
                setDisksQuantity(disksQuantity - 1)
              }
              className="bg-red-500 border-2 border-slate-950 text-white rounded-full rounded-r-none p-2 duration-150 hover:bg-red-700"
            >
              <Minus />
            </button>
            <div className="px-5 border-2 border-slate-950 bg-slate-700 border-x-0">
              <p className="text-3xl px-3">{disksQuantity}</p>
            </div>
            <button
              onClick={() =>
                disksQuantity + 1 <= MAX_DISK &&
                setDisksQuantity(disksQuantity + 1)
              }
              className="bg-green-500 border-2 border-slate-950 text-white rounded-full rounded-l-none p-2 duration-150 hover:bg-green-700"
            >
              <Plus />
            </button>
          </div>
        </div>
      </DndProvider>
      <Footer />
    </main>
  );
};

export default Main;
