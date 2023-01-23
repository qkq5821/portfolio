import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Post from '../../Components/PostAPI';

function UserSaveForm(props) {
  const [dupleid, setdupleid] = useState(0);
  const [popup, setPopup] = useState(false);
  const handleComplete = () => {
    setPopup(!popup);
  };
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

  const inputuser = (e) => {
    if (e.target.name === 'userid' && e.target.value.length > 9) {
      alert('아이디는 10자 이내로 해주세요');
    } else if (
      (e.target.name === 'userpw' || e.target.name === 'userpw2') &&
      e.target.value.length > 14
    ) {
      alert('비밀번호는 15자 이내로 해주세요');
    } else if (e.target.name === 'username' && e.target.value.length > 8) {
      alert('이름은 8자 이내로 제한됩니다.');
    } else if (e.target.name === 'address2' && e.target.value.length > 25) {
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

  const confirmid = (e) => {
    axios
      .get(
        'http://portpolio-env.eba-cbjqfceh.ap-northeast-2.elasticbeanstalk.com/confirmid/' +
          user.userid,
      )
      .then((result) => {
        alert(result.data);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        'http://portpolio-env.eba-cbjqfceh.ap-northeast-2.elasticbeanstalk.com/confirmid/' +
          user.userid,
      )
      .then((result) => {
        if (result.data !== '가입가능한id입니다.') {
          setdupleid(1);
        } else {
          setdupleid(0);
        }
      });

    if (user.userpw !== user.userpw2) {
      alert('비밀번호가 일치하지않습니다.');
    } else if (dupleid === 1) {
      alert('중복되는 아이디가 존재합니다.');
      setdupleid(0);
    } else {
      axios
        .post(
          'http://portpolio-env.eba-cbjqfceh.ap-northeast-2.elasticbeanstalk.com/signup',
          user,
        )
        .then(() => {
          alert('회원가입 되었습니다.');
          window.location.href = '/Login';
        });
    }
  };

  return (
    <div class="usersaveform_layout">
      <form onSubmit={onSubmit}>
        <h1 className="usersaveform_h1">회원가입</h1>
        <br></br>

        <div>
          <input
            maxLength="10"
            required={true}
            name="userid"
            type="text"
            placeholder="아이디"
            onChange={inputuser}
            className="usersaveform_input"
          />
          <Button variant="dark" onClick={confirmid}>
            중복확인
          </Button>
        </div>

        <div>
          <input
            maxLength="15"
            required={true}
            name="userpw"
            type="text"
            placeholder="비밀번호"
            onChange={inputuser}
            className="usersaveform_input"
          />
          <input
            maxLength="15"
            required={true}
            name="userpw2"
            type="text"
            placeholder="비밀번호확인"
            onChange={inputuser}
            className="usersaveform_input"
          />
        </div>
        <div>
          <input
            maxLength="8"
            required={true}
            name="username"
            type="text"
            placeholder="이름"
            onChange={inputuser}
            className="usersaveform_input"
          />
        </div>

        <div>
          <div>
            <div>
              <div>
                <input
                  maxLength="30"
                  className="usersaveform_input2"
                  placeholder="주소"
                  type="text"
                  required={true}
                  name="address"
                  onChange={handleInput}
                  value={user.address}
                />
                <Button variant="dark" onClick={handleComplete}>
                  우편번호 찾기
                </Button>
                {popup && (
                  <div className="post">
                    <Post company={user} setcompany={setuser}></Post>
                  </div>
                )}
              </div>
            </div>
            <div>
              <input
                maxLength="25"
                required={true}
                name="address2"
                type="text"
                placeholder="상세주소"
                onChange={inputuser}
                className="usersaveform_input"
              />
            </div>
          </div>

          <div className="phone">
            <div>
              <input
                name="phone1"
                type="text"
                placeholder="010"
                onChange={inputuser}
                className="usersaveform_input"
                readOnly
              />

              <input
                maxLength="5"
                pattern="[0-9]+"
                required={true}
                name="phone2"
                type="text"
                placeholder="전화번호2"
                onChange={inputuser}
                className="usersaveform_input"
              />

              <input
                pattern="[0-9]+"
                maxLength="5"
                required={true}
                name="phone3"
                type="text"
                placeholder="전화번호3"
                onChange={inputuser}
                className="usersaveform_input"
              />
            </div>
          </div>
        </div>

        <div>
          <Button type="submit" variant="dark" className="usersaveform_button">
            계정 생성하기
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserSaveForm;
