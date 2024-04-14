import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import UpdateProductForm from './Component/UpdateProductForm';
import Userlist from './Component/Userlist';
import Cart from './Component/Cart';
import Login from './LogComponent/Login';
import Main from './Pages/Main';
import CartProductList from './Component/CartProductList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/updateproductform/:id' element={<UpdateProductForm />} />
          <Route path='/user' element={<Userlist />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/cartproductlist' element={<CartProductList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
