import { FaTrashAlt, FaRegEdit, FaTimes, FaRegSave } from "react-icons/fa";

const SessionCard = ({
  session,
  addSessionMode,
  setAddSessionMode,
  activeSession,
  setActiveSession,
}) => {
  return (
    <div
      className={`session-card ${
        activeSession?._id === session?._id && "active"
      }`}
      onClick={() => setActiveSession(session)}
    >
      {addSessionMode ? (
        <div>
          <FaTimes
            className="btn-note"
            onClick={() => setAddSessionMode(false)}
          />
          <FaRegSave className="btn-note" onClick={() => {}} />
        </div>
      ) : (
        <div>
          <FaTrashAlt className="btn-note" onClick={() => {}} />
          <FaRegEdit className="btn-note" onClick={() => {}} />
        </div>
      )}
      <h2>{session.name}</h2>
      <p>{session.session}</p>
      <p>
        Time:{" "}
        {session.questions.reduce(
          (acc, cur) => acc + cur.timeToAnswer + cur.timeToThink,
          0
        )}
        {"s"}
      </p>
    </div>
  );
};

export default SessionCard;
