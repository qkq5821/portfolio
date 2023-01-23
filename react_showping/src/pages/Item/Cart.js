import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { count, dele } from '../../store';

const Cart = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const id = sessionStorage.getItem('sessionid');
  const [user, setuser] = useState({});
  const [subtotal, setsubtotal] = useState(0);

  const delivery = 2500;
  const Total = delivery + subtotal;

  const orderlist = state.cart.map((a, i) => {
    return {
      orderitemid: a.itemid,
      orderitemnumber: a.itemstock,
      orderuserid: id,
    };
  });

  useEffect(() => {
    let sum = 0;
    state.cart.map((a, i) => {
      sum += a.itemprice * a.itemstock;
    });
    setsubtotal(sum);
  }, [state]);

  useEffect(() => {
    axios
      .get(
        'http://portpolio-env.eba-cbjqfceh.ap-northeast-2.elasticbeanstalk.com/userinfo/' +
          id,
      )
      .then((result) => {
        setuser(result.data);
      });
  }, []);

  const buy = () => {
    if (id === '' || sessionStorage.length === 0) {
      alert('로그인 후 가능합니다.');
    } else {
      axios
        .post(
          'http://portpolio-env.eba-cbjqfceh.ap-northeast-2.elasticbeanstalk.com/insertorder',
          orderlist,
        )
        .then(() => {
          props.history.push('/Mypage');
        });
    }
  };

  return (
    <div className="cart_layout">
      <div className="cart_layout2">
        <div className="cart_layout3">
          <Table>
            <thead className="cart_thead">
              <tr>
                <td>상품이미지</td>
                <td>상품명</td>
                <td>가격</td>
                <td>수량</td>
              </tr>
            </thead>

            {state.cart.map((item, i) => (
              <tbody key={item.id}>
                <tr>
                  <td>
                    <img className="cart_img" src={item.filepath}></img>
                  </td>
                  <td>{item.itemname}</td>
                  <td>{item.itemprice}원</td>

                  <td align="center">
                    <div className="cart_button">
                      <Button
                        variant="dark"
                        onClick={() => {
                          dispatch(count({ itemid: item.itemid, plma: 'ma' }));
                        }}
                      >
                        -
                      </Button>
                      <div>{item.itemstock}</div>
                      <Button
                        variant="dark"
                        onClick={() => {
                          dispatch(count({ itemid: item.itemid, plma: 'pl' }));
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td>
                    <Button
                      variant="dark"
                      onClick={() => {
                        dispatch(dele({ itemid: item.itemid }));
                      }}
                    >
                      삭제
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
          {state.cart.length === 0 ? (
            <td className="cart_empty">
              장바구니가<br></br>비었습니다.
            </td>
          ) : null}
        </div>
      </div>
      <div className="cart_info">
        {sessionStorage.getItem('sessionid') == null ? (
          <p className="cart_login">로그인 후 표시됩니다.</p>
        ) : (
          <Userinfo user={user}></Userinfo>
        )}

        <Calculator
          subtotal={subtotal}
          delivery={delivery}
          Total={Total}
          buy={buy}
        ></Calculator>
      </div>
    </div>
  );
};

function Userinfo(props) {
  const user = props.user;
  return (
    <div>
      <div className="cart_userinfo" style={{ width: '100%' }}>
        <h4>구매자 정보</h4>
        <br></br>

        <div>
          <div>{user.username}</div>
          <div>{user.phone1 + '-' + user.phone2 + '-' + user.phone3}</div>
          <div> {user.address}</div>
          <div> {user.address2}</div>
        </div>
      </div>
    </div>
  );
}

function Calculator(props) {
  let price = {
    subtotal: '',
    delivery: '',
    Total: '',
    buy: '',
  };

  price = { ...price, ...props };

  return (
    <div>
      <div className="calcul_letter">
        <div>물건금액:</div>
        <div>{price.subtotal}원</div>
      </div>
      <div className="calcul_letter">
        <div>배송비:</div>
        <div>{price.delivery}원</div>
      </div>
      <div className="calcul_letter">
        <div>총 결제금액:</div>
        <div>{price.Total}원</div>
      </div>
      <Button variant="dark" className="calcul_button" onClick={price.buy}>
        결제하기
      </Button>
    </div>
  );
}

export default Cart;
