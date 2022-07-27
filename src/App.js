import './App.css';
import { Main } from './Components/HomePage/Main';
import store from './store';
import { AuthProvider } from './utils/Authorization';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SubredditPage } from './Components/Subreddits/SubredditPage';
import { LandingPage } from './Components/HomePage/LandingPage';

function App() {
  return (
    
      <Provider store={store}>
        <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<LandingPage />}/>
            <Route path='/homepage' element={<Main />} />
            <Route path='/subreddits'>
              <Route path=':subredditId' element={<SubredditPage />} />
            </Route>

          </Routes>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
  )

}

export default App;

