import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import ListMovie from './movie/ListMovie';
import { Route, Routes } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Dashboard from './dashboard/Dashboard';
import AddNewMovie from './dashboard/AddNewMovie';
import EditMovie from './dashboard/EditMovie';
import MovieDetail from './movie/MovieDetail';
import WatchMovie from './movie/WatchMovie';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<ListMovie />} />
        <Route path='/home' element={<ListMovie />} />
        <Route path='/home/detai/:movieId' element={<MovieDetail />} />
        <Route path='/watch/:movieId' element={<WatchMovie />} />
      </Routes>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/add' element={<AddNewMovie />} />
        <Route path='/dashboard/edit/:movieId' element={<EditMovie />} />
      </Routes>
    </>
  );
}

export default App;
