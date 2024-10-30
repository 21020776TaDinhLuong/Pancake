// App.js
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import UserEditScreen from './UserEditScreen';
import UserListScreen from './UserListScreen';
import OrderListScreen from './OrderListScreen';
import ProductEditScreen from './ProductEditScreen';
import ProductListScreen from './ProductListScreen';
import OrderAddScreen from './OrderAddScreen';
import CareListScreen from './CareListScreen';
import CareAddScreen from './CareAddScreen';
import UserInfo from './UserInfo';
import Fanpage from './Fanpage';
import FanpagePost from './FanpagePost';
import LoginFanpage from './LoginFanpage';
import RegisterFanpage from './RegisterFanpage';
import FacebookChat from './FacebookChat';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/loginFanpage' element={<LoginFanpage/>}/>
        <Route path='/registerFanpage' element={<RegisterFanpage/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/admin/userlist' element={<UserListScreen/>} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen/>} />
        <Route path='/admin/productlist' element={<ProductListScreen/>} exact />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>} />
        <Route path='/admin/orderlist' element={<OrderListScreen/>} />
        <Route path='/admin/order/:id/edit' element={<OrderAddScreen/>} />
        <Route path='/admin/carelist' element={<CareListScreen/>} />
        <Route path='/admin/care/:id/edit' element={<CareAddScreen/>} />
        <Route path='/admin/userinfo' element={<UserInfo/>} />
        <Route path='/fanpage-dashboard' element={<Fanpage/>} /> 
        <Route path='/fanpage/:id/posts' element={<FanpagePost />} />
        <Route path='/chat' element={<FacebookChat/>} />

      </Routes>
    </Router>
    </>
  );
}

export default App;
