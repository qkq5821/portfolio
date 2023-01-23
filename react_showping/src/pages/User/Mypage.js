import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Nav, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import Post from '../../Components/PostAPI';

function UserSaveForm(props) {
  const id = sessionStorage.getItem('sessionid');
  const history = useHistory();
  const [tab, settab] = useState(1);
  const [popup, setPopup] = useState(false);
  const handleComplete = () => {
    setPopup(!popup);
  };
  const [orderlist, setorderlist] = useState([]);
  const [user, setuser] = useState({
    userid: '',
    userpw: '',
    userpw2: '',
    username: '',
    address: '',
    address2: '',
    phone1: '010',
    phone2: '',
    phone3: '',
  });

  useEffect(() => {
    axios
      .get(
        'http://portpolio-env.eba-cbjqfceh.ap-northeast-2.elasticbeanstalk.com/userinfo2/' +
          id,
      )
      .then((reuslt) => {
        setuser(reuslt.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        'http://portpolio-env.eba-cbjqfceh.ap-northeast-2.elasticbeanstalk.com/orderlist/' +
          id,
      )
      .then((reuslt) => {
        if (orderlist.length !== reuslt.data.length) {
          setorderlist(reuslt.data);
        }
      });
  }, [orderlist]);

  const inputuser = (e) => {
    if (
      (e.target.name === 'userpw' || e.target.name === 'userpw2') &&
      e.target.value.length === 15
    ) {
      alert('비밀번호는 15자 이내로 해주세요');
    } else if (e.target.name === 'address2' && e.target.value.length === 25) {
      alert('상세주소는 25자 이내로 제한됩니다.');
    } else if (
      (e.target.name === 'phone2' || e.target.name === 'phone3') &&
      e.target.value.length === 5
    ) {
      alert('번호는 5자 이내로 제한됩니다.');
    } else {
      setuser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleInput = (e) => {
    if (e.target.name === 'address' && e.target.value.length === 30) {
      alert('주소는 30자 이내로 제한됩니다.');
    } else {
      setuser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (user.userpw !== user.userpw2) {
      alert('비밀번호가 일치하지않습니다.');
    } else {
      axios
        .post(
          'http://portpolio-env.eba-cbjqfceh.ap-northeast-2.elasticbeanstalk.com/userupdate',
          user,
        )
        .then(() => {
          history.push('/Mypage');
        })
        .then(alert('회원정보수정이 되었습니다.'));
    }
  };

  return (
    <div class="mypage_layout">
      <h1 className="mypage_h1">마이페이지</h1>
      <Nav variant="tabs" defaultActiveKey="link0" className="mypage_tab">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              settab(0);
            }}
            eventKey="link0"
          >
            내정보
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              settab(1);
            }}
            eventKey="link1"
          >
            주문내역
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {tab === 0 ? (
        <div>
          <form onSubmit={onSubmit} className="mypage_input_layout">
            <div>
              아이디&emsp;
              <input
                required={true}
                name="userid"
                type="text"
                placeholder={user.userid}
                onChange={inputuser}
                className="mypage_input"
                value={user.userid}
                readOnly
              />
              변경불가
            </div>

            <div>
              비밀번호
              <input
                maxLength={15}
                required={true}
                name="userpw"
                type="text"
                placeholder="비밀번호"
                onChange={inputuser}
                className="mypage_input"
              />
              <input
                maxLength={15}
                required={true}
                name="userpw2"
                type="text"
                placeholder="비밀번호확인"
                onChange={inputuser}
                className="mypage_input"
              />
            </div>
            <div>
              이름&emsp;&emsp;
              <input
                maxLength={8}
                required={true}
                name="username"
                type="text"
                placeholder={user.username}
                onChange={inputuser}
                className="mypage_input"
                value={user.username}
                readOnly
              />
              변경불가
            </div>

            <div>
              <div>
                <div>
                  <div>
                    주소&emsp;&emsp;
                    <input
                      maxLength={30}
                      className="mypage_input2"
                      placeholder={user.address}
                      type="text"
                      required={true}
                      name="address"
                      onChange={handleInput}
                      value={user.address}
                    />
                    <Button
                      variant="dark"
                      style={{ borderRadius: '15px' }}
                      onClick={handleComplete}
                    >
                      우편번호 찾기
                    </Button>
                    {popup ? (
                      <Post company={user} setcompany={setuser}></Post>
                    ) : null}
                  </div>
                </div>
                <div>
                  상세주소
                  <input
                    maxLength={25}
                    required={true}
                    name="address2"
                    type="text"
                    placeholder={user.address2}
                    onChange={inputuser}
                    className="mypage_input"
                    value={user.address2}
                  />
                </div>
              </div>

              <div className="phone">
                <div>
                  전화번호
                  <input
                    pattern="[0-9]+"
                    name="phone1"
                    type="text"
                    placeholder="010"
                    onChange={inputuser}
                    className="mypage_input"
                    readOnly
                  />
                  <input
                    pattern="[0-9]+"
                    maxLength={5}
                    required={true}
                    name="phone2"
                    type="text"
                    placeholder={user.phone2}
                    onChange={inputuser}
                    className="mypage_input"
                    value={user.phone2}
                  />
                  <input
                    pattern="[0-9]+"
                    maxLength={5}
                    required={true}
                    name="phone3"
                    type="text"
                    placeholder={user.phone3}
                    onChange={inputuser}
                    className="mypage_input"
                    value={user.phone3}
                  />
                </div>
              </div>
            </div>

            <br></br>
            <div>
              <Button
                variant="dark"
                style={{ width: '85%', borderRadius: '15px' }}
                type="submit"
              >
                정보수정하기
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Orderlist
          orderlist={orderlist}
          setorderlist={setorderlist}
        ></Orderlist>
      )}
    </div>
  );
}

function Orderlist(props) {
  let orderlist = props.orderlist;
  let setorderlist = props.setorderlist;

  const dele = (orderid) => {
    axios
      .delete(
        'http://portpolio-env.eba-cbjqfceh.ap-northeast-2.elasticbeanstalk.com/deleteorder/' +
          orderid,
      )
      .then(() => {
        setorderlist([...orderlist]);
      });
  };

  return (
    <div className="orderlist_layout">
      <div className="orderlist_layout2">
        <Table>
          <thead className="orderlist_thead">
            <tr>
              <th>상품이미지</th>
              <th>상품명</th>
              <th>수량</th>
              <th>개당가격</th>
              <th>구매날짜</th>
            </tr>
          </thead>

          <tbody>
            {orderlist.map((item, i) => (
              <tr key={item.itemid} className="orderlist_tbody">
                <td>
                  <img className="orderlist_img" src={item.filepath}></img>
                </td>
                <td>{item.itemname}</td>
                <td>{item.orderitemnumber}</td>
                <td>{item.itemprice}원</td>
                <td>
                  <p>{item.date.substr(0, 10)}</p>
                </td>
                <td>
                  {' '}
                  <Button
                    variant="dark"
                    onClick={() => {
                      dele(item.orderid);
                    }}
                  >
                    삭제
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default UserSaveForm;
