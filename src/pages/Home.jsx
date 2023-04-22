import { FaPlay } from "react-icons/fa";
import "./Home.scss";

function Home() {
  const savedLogs = JSON.parse(localStorage.getItem("Logs")) || [];

  return (
    <div className="container">
      {/*//?Start a session*/}
      <div className="box start-session-container">
        <h1>Start a new session</h1>
        <a href="/in-session" className="start-session">
          <FaPlay className="play-icon" />
        </a>
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
