import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Layout from './Layouts/Layuot';
import DetailedCardRoute from './components/DetailedCardRoute/DetailedCardRoute';
export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}>
            <Route index element={<DetailedCardRoute />} />
          </Route>
          <Route path="about" element={<About />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
