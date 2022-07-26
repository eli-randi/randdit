import './App.css';
import { Main } from './Components/HomePage/Main';
import store from './store';
import { AuthProvider } from './utils/Authorization';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SubredditPage } from './Components/Subreddits/SubredditPage';

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/subreddits'>
              <Route path=':subredditId' element={<SubredditPage />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  )

}

export default App;

