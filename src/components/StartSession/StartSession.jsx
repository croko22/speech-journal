import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaPlay } from "react-icons/fa";
import Dropdown from "react-dropdown";
import axios from "axios";

function useSessions() {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3000/journal-sessions/${
          JSON.parse(localStorage.getItem("authData"))._id
        }`
      );
      return data;
    },
  });
}

const StartSession = () => {
  const navigate = useNavigate();
  const { status, data } = useSessions();

  return (
    <div className="box start-session-container">
      <h1>Start a new session</h1>
      <div className="start-session">
        <FaPlay className="play-icon" />
      </div>
      {status === "loading" ? (
        "Loading..."
      ) : (
        <Dropdown
          options={data.map((session) => {
            return { value: session._id, label: session.name };
          })}
          onChange={(e) => navigate(`/in-session/${e.value}`)}
          placeholder="Select a session"
          className="dropdown"
          menuClassName="dropdown-menu"
          placeholderClassName="dropdown-placeholder"
        />
      )}
    </div>
  );
};

export default StartSession;
