import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { v4 } from "uuid";
import "./Home.scss";

//*Estructura de Nota
const nota = { title: "", text: "" };
function Home() {
  const [savedLogs, setSavedLogs] = useState(
    JSON.parse(localStorage.getItem("Logs")) || []
  );

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
              <p className="date">{log.date}</p>
              {log.QAs.map((qa, index) => (
                <div key={index}>
                  <h5>{qa.question}</h5>
                  <p>{qa.text}</p>
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
