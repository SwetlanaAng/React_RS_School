import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Layout from './Layouts/Layuot';
export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
