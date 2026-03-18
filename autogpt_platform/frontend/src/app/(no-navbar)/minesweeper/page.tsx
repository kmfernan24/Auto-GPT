"use client";

import clsx from "clsx";

import { useMinesweeperPage } from "./useMinesweeperPage";

const numberColors: Record<number, string> = {
  1: "text-blue-700",
  2: "text-green-700",
  3: "text-red-700",
  4: "text-indigo-900",
  5: "text-amber-800",
  6: "text-cyan-800",
  7: "text-slate-800",
  8: "text-zinc-700",
};

export default function MinesweeperPage() {
  const {
    board,
    gameStatus,
    remainingMines,
    revealedSafeCells,
    totalSafeCells,
    revealCell,
    resetGame,
    toggleFlag,
  } = useMinesweeperPage();

  const face =
    gameStatus === "won" ? "😎" : gameStatus === "lost" ? "😵" : "🙂";
  const statusLabel =
    gameStatus === "won"
      ? "Board cleared"
      : gameStatus === "lost"
        ? "Boom!"
        : "Tap to sweep";

  return (
    <main className="min-h-screen w-full overflow-auto bg-[#7883a8]">
      <div
        className="min-h-screen w-full px-4 py-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, #d2c6a8 0%, #b4ad99 25%, transparent 35%), radial-gradient(circle at 70% 30%, #b8a48a 0%, #8d9281 24%, transparent 38%), radial-gradient(circle at 30% 75%, #d8c4a1 0%, #ac9c86 20%, transparent 34%), linear-gradient(165deg, #8c816e 0%, #b9af9d 42%, #52658f 58%, #45577e 100%)",
        }}
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4">
          <div className="w-full max-w-[760px] rounded-lg border-4 border-zinc-500 bg-[#c6c6c6] p-3 shadow-2xl">
            <div className="mb-3 flex items-center justify-between rounded border-2 border-zinc-400 border-b-zinc-100 border-l-zinc-600 border-r-zinc-100 border-t-zinc-600 bg-[#bdbdbd] px-3 py-2">
              <div className="rounded border-2 border-zinc-400 border-b-zinc-700 border-l-zinc-100 border-r-zinc-700 border-t-zinc-100 bg-black px-3 py-1 font-mono text-xl text-red-500">
                {remainingMines.toString().padStart(3, "0")}
              </div>
              <button
                className="rounded border-2 border-zinc-400 border-b-zinc-700 border-l-zinc-100 border-r-zinc-700 border-t-zinc-100 bg-[#c8c8c8] px-3 py-1 text-3xl"
                onClick={resetGame}
                type="button"
              >
                {face}
              </button>
              <div className="rounded border-2 border-zinc-400 border-b-zinc-700 border-l-zinc-100 border-r-zinc-700 border-t-zinc-100 bg-black px-3 py-1 font-mono text-xl text-red-500">
                {revealedSafeCells.toString().padStart(3, "0")}
              </div>
            </div>

            <div className="overflow-auto rounded border-2 border-zinc-400 border-b-zinc-100 border-l-zinc-600 border-r-zinc-100 border-t-zinc-600 bg-[#bdbdbd] p-2">
              <div
                className="grid"
                style={{ gridTemplateColumns: "repeat(20, minmax(0, 1fr))" }}
              >
                {board.map((row, rowIndex) =>
                  row.map((cell, colIndex) => {
                    const isHidden = !cell.isRevealed;
                    return (
                      <button
                        className={clsx(
                          "flex h-8 w-8 items-center justify-center text-xl font-bold leading-none",
                          isHidden
                            ? "border border-zinc-500 border-b-zinc-100 border-l-zinc-300 border-r-zinc-100 border-t-zinc-300 bg-[#cfcfcf]"
                            : "border border-zinc-400 bg-[#c8c8c8]",
                          cell.isRevealed &&
                            cell.adjacentMines > 0 &&
                            numberColors[cell.adjacentMines],
                        )}
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => {
                          revealCell(rowIndex, colIndex);
                        }}
                        onContextMenu={(event) => {
                          event.preventDefault();
                          toggleFlag(rowIndex, colIndex);
                        }}
                        type="button"
                      >
                        {cell.isFlagged && !cell.isRevealed && "🚩"}
                        {cell.isRevealed && cell.hasMine && "💣"}
                        {cell.isRevealed &&
                        !cell.hasMine &&
                        cell.adjacentMines > 0
                          ? cell.adjacentMines
                          : ""}
                      </button>
                    );
                  }),
                )}
              </div>
            </div>
          </div>

          <p className="rounded-full bg-black/50 px-4 py-2 text-sm text-zinc-100">
            {statusLabel} · {revealedSafeCells}/{totalSafeCells} safe tiles
          </p>
        </div>
      </div>
    </main>
  );
}
