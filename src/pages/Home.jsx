import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaPlay } from "react-icons/fa";
import axios from "axios";
import Dropdown from "react-dropdown";
import "./Home.scss";

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

function Home() {
  const navigate = useNavigate();
  const { status, data } = useSessions();
  const savedLogs = JSON.parse(localStorage.getItem("Logs")) || [];

  return (
    <div className="container">
      {/*//?Start a session*/}
      <div className="box start-session-container">
        <h1>Start a new session</h1>
        <div className="start-session">
          <FaPlay className="play-icon" />
        </div>
        {status === "loading" ? (
          "Loading..."
        ) : (
          <Dropdown
            options={data.map((session) => session.name)}
            onChange={(e) =>
              navigate(
                `/in-session/${
                  data.filter((session) => session.name === e.value)[0]._id
                }`
              )
            }
            placeholder="Select a session"
            className="dropdown"
            menuClassName="dropdown-menu"
            placeholderClassName="dropdown-placeholder"
          />
        )}
      </div>
      {/*//?Recent logs*/}
      <div className="box recent-logs-container">
        <h1>Recent logs</h1>
        <div className="logs">
          {savedLogs.reverse().map((log, index) => (
            <div className="log" key={index}>
              {/* <small className="date">{log.date}</small> */}
              {log.qas.map((qa, index) => (
                <div className="qa-item" key={index}>
                  <h5>{qa.question}</h5>
                  <p>{qa.answer}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
