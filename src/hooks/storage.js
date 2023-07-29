const storagePrefix = "speech_journal_";
//TODO: Change token name to something more generic
const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}authData`));
  },
  setToken: (token) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;
