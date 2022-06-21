import { queryInstance } from "api/config";
import Table from "components/Table";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Main = () => {
  const { register, handleSubmit } = useForm();
  const [currentEvent, setCurrentEvent] = useState("");
  const [currentLeaderboard, setcurrentLeaderboard] = useState<any>({});
  const [sortDirection, setSortDirection] = useState<any>(null);
  const [eventName, setEventName] = useState<string>("");
  const [view, setView] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    const { data } = await queryInstance.get(
      `/api/v1/leaderboard?eventName=${eventName}&view=${view}&sortOrder=${sortDirection}`
    );
    setcurrentLeaderboard(data);
    setLoading(false);
  }, [eventName, view, sortDirection]);

  useEffect(() => {
    fetchData();
  }, [sortDirection, eventName, sortDirection, loading]);

  const onSubmit = async (data: any) => {
    console.log(data);
    setLoading(true);
    setEventName(data.eventName);
    setView(data.view);
    setSortDirection(null);
  };

  return (
    <div className="p-10">
      <form
        className="flex flex-col gap-4 w-80 mb-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <p className="font-bold">Event Name:</p>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            {...register("eventName")}
            value={currentEvent}
            onChange={(e) => setCurrentEvent(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="font-bold">Leaderboard Range</p>
          <select
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("view")}
          >
            <option value="hundred">Top hundred</option>
            <option value="global">Global Leaderboard</option>
          </select>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-bold">Leaderboard for:</p>
          <p>{currentEvent}</p>
        </div>
      </form>

      {Object.keys(currentLeaderboard).length > 0 && (
        <Table
          data={currentLeaderboard.entries}
          currentSort={sortDirection}
          setCurrentSort={setSortDirection}
        />
      )}
      <div className="flex justify-between">
        <button
          onClick={handleSubmit(onSubmit)}
          className={`bg-blue-500  text-white font-bold py-2 px-4 rounded ${
            loading && `cursor-not-allowed bg-slate-400`
          }`}
          disabled={loading}
        >
          {loading ? "Loading" : "Refresh Leaderboard"}
        </button>
        {Object.keys(currentLeaderboard).includes("nextPage") && (
          <div className="flex justify-between gap-2">
            <button
              className={`bg-blue-500  text-white font-bold py-2 px-4 rounded ${
                loading && `cursor-not-allowed bg-slate-400`
              }`}
              disabled={loading}
            >
              Next Page
            </button>
            <button
              className={`bg-blue-500  text-white font-bold py-2 px-4 rounded ${
                loading && `cursor-not-allowed bg-slate-400`
              }`}
              disabled={loading}
            >
              Previous Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
