import './App.css';
import { Route } from 'react-router-dom';
import Home from './pages/Item/Home';
import ItemSaveForm from './pages/Item/ItemSaveForm';
import UpdateForm from './pages/Item/UpdateForm';
import UserSaveForm from './pages/User/UserSaveForm';
import LoginPage from './pages/User/LoginPage';
import ProductDetail from './pages/Item/ProductDetail';
import ItemManage from './pages/Item/ItemManage';
import Cart from './pages/Item/Cart';
import Header from './Components/Header';
import Mypage from './pages/User/Mypage';

function App() {
  return (
    <div className="app_layout">
      <div className="app_left">
        <Header></Header>
      </div>

      <div className="app_right">
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/user/Login" exact={true} component={LoginPage}></Route>
        <Route
          path="/user/UserSaveForm"
          exact={true}
          component={UserSaveForm}
        ></Route>
        <Route path="/user/Mypage" exact={true} component={Mypage}></Route>
        <Route
          path="/ItemManage/ItemSaveForm"
          exact={true}
          component={ItemSaveForm}
        ></Route>
        <Route
          path="/productdetail/:id"
          exact={true}
          component={ProductDetail}
        ></Route>
        <Route
          path="/ItemManage/updateForm/:id"
          exact={true}
          component={UpdateForm}
        ></Route>
        <Route path="/ItemManage" exact={true} component={ItemManage}></Route>
        <Route path="/Cart" exact={true} component={Cart}></Route>
      </div>
    </div>
  );
}

export default App;
