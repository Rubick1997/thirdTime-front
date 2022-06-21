import React, { FC } from "react";
import UpAndDown from "icons/UpAndDown";
import Down from "icons/Down";
import Up from "icons/Up";

type PlayerType = {
  _id: string;
  name: string;
  rank: number;
  score: number;
  picture: string;
};

const currentIcon = (direction: number | null) => {
  switch (direction) {
    case 1:
      return <Down />;
    case -1:
      return <Up />;
    default:
      return <UpAndDown />;
  }
};

const Table: FC<{
  data: PlayerType[];
  currentSort: number;
  setCurrentSort: React.Dispatch<any>;
}> = ({ data, currentSort, setCurrentSort }) => {
  return (
    <table className="w-full border-solid border-2 mb-2">
      <thead className="border-solid border-2">
        <tr>
          <th className="flex items-center justify-between">
            Rank
            <div
              className="cursor-pointer"
              onClick={() => {
                if (currentSort === null) {
                  setCurrentSort(1);
                } else if (currentSort === 1) {
                  setCurrentSort(-1);
                } else if (currentSort === -1) {
                  setCurrentSort(null);
                }
              }}
            >
              {currentIcon(currentSort)}
            </div>
          </th>
          <th>Gamer Name</th>
          <th>Profile Pic</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ _id, name, picture, score, rank }) => (
          <tr key={_id} className="border-solid border-2">
            <th>{rank}</th>
            <th>{name}</th>
            <th className="flex justify-center items-center">
              <img
                src={picture}
                alt={`${name} profile picture`}
                className="h-10 w-10"
              />
            </th>
            <th>{score}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
