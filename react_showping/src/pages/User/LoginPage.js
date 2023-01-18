import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function LoginPage(props) {
  const [user, setuser] = useState({
    userid: '',
    userpw: '',
  });

  const inputuser = (e) => {
    if (e.target.name === 'userid' && e.target.value.length === 10) {
      alert('아이디는 10자 이내로 해주세요');
    } else if (
      (e.target.name === 'userpw' || e.target.name === 'userpw2') &&
      e.target.value.length === 15
    ) {
      alert('비밀번호는 15자 이내로 해주세요');
    } else {
      setuser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  async function f() {
    sessionStorage.setItem('sessionid', user.userid);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        'http://portpolio-env.eba-cbjqfceh.ap-northeast-2.elasticbeanstalk.com/login',
        user,
      )
      .then((result) => {
        if (result.data === '로그인에 성공했습니다.') {
          f().then((window.location.href = '/'));
        }
        alert(result.data);
      });
  };

  return (
    <div class="login_layout">
      <form onSubmit={onSubmit}>
        <h1 className="login_h1">로그인</h1>

        <div>
          <input
            maxLength="10"
            name="userid"
            type="text"
            placeholder="아이디"
            onChange={inputuser}
            className="login_input"
          />
        </div>
        <div>
          <input
            maxLength={15}
            name="userpw"
            type="text"
            placeholder="비밀번호"
            onChange={inputuser}
            className="login_input"
          />
        </div>

        <div>
          <Button type="submit" variant="dark" className="login_button">
            로그인
          </Button>
        </div>
      </form>
    </div>
  );
}
export default LoginPage;
