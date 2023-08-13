import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes/router';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
