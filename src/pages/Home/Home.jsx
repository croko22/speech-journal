import { useState, useEffect } from "react";
import { axios } from "../../hooks/axios";
import "./Home.scss";
import StartSession from "../../components/StartSession/StartSession";

function Home() {
  const [savedLogs, setSavedLogs] = useState([]);

  //* Fetch logs from DB
  useEffect(() => {
    const fetchLogs = async () => {
      const res = await axios.get(`/journal-entries`);
      setSavedLogs(res.data);
    };
    fetchLogs();
  }, []);

  return (
    <div className="container">
      {/*//?Start a session*/}
      <StartSession />
      {/*//?Recent logs*/}
      <div className="box recent-logs-container">
        <h1>Recent logs</h1>
        <div className="logs">
          {savedLogs.reverse().map((log, index) => (
            <div className="log" key={index}>
              {log.dateAdded.slice(0, 10)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
