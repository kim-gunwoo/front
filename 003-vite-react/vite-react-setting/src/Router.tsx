import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TestPage from './pages/TestPage';
import SearchPage from './pages/search/SearchPage';
import CounterPage from './pages/count/Count';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CounterPage />}></Route>

        <Route path="/home" element={<Home />}></Route>
        <Route path="/test" element={<TestPage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
