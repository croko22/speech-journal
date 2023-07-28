import { FaPlay, FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axios } from "../../hooks/axios";
import { useStore } from "../../hooks/useStore";
import Dropdown from "react-dropdown";

function useSessions() {
  const authData = useStore((state) => state.authData);
  return useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const { data } = await axios.get(`/journal-sessions/${authData._id}`);
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
          options={data?.map((session) => {
            return { value: session._id, label: session.name };
          })}
          onChange={(e) => navigate(`/session/${e.value}`)}
          className="dropdown"
          menuClassName="dropdown-menu"
          placeholderClassName="dropdown-placeholder"
          arrowClosed={
            <p className="dropdown-text">
              Select a Session <FaAngleDown />
            </p>
          }
          arrowOpen={
            <p className="dropdown-text">
              Select a Session <FaAngleUp />
            </p>
          }
        />
      )}
    </div>
  );
};

export default StartSession;
