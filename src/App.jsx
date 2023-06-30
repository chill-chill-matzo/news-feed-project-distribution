import './reset.css';
import GlobalStyle from './GlobalStyle';
import Router from './shared/Router';
import { apiKey } from './firebase';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUsers } from './redux/modules/users';

function App() {
  const dispatch = useDispatch();

  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(sessionKey) ? true : false;
  const isSessionList = JSON.parse(sessionStorage.getItem(sessionKey));

  useEffect(() => {
    if (isSession) {
      dispatch(
        getUsers({
          id: isSessionList.uid,
          name: isSessionList.displayName,
          email: isSessionList.email
        })
      );
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
