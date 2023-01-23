import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header_navbar">
      <div className="header_logo">HC MARKET</div>
      {sessionStorage.getItem('sessionid') != null ? (
        <div className="header_font">
          {sessionStorage.getItem('sessionid')} 님 환영합니다.
        </div>
      ) : null}

      <div>
        <Link to="/" className="navbar-brand">
          상품보기
        </Link>
      </div>

      <div>
        <Link to="/Cart" className="navbar-brand">
          장바구니
        </Link>
      </div>
      {sessionStorage.getItem('sessionid') === ('' || null) ? (
        <div>
          <Link to="/UserSaveForm" className="navbar-brand">
            회원가입
          </Link>
        </div>
      ) : sessionStorage.getItem('sessionid') === 'qkq5821' ? (
        <div>
          <Link to="/ItemManage" className="navbar-brand">
            상품관리
          </Link>
        </div>
      ) : null}

      {sessionStorage.getItem('sessionid') == null ? (
        <div>
          <Link to="/Login" className="navbar-brand">
            로그인
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/Mypage" className="navbar-brand">
            마이 페이지
          </Link>
        </div>
      )}

      {sessionStorage.getItem('sessionid') != null ? (
        <div>
          <Link to="#" onClick={logout} className="navbar-brand">
            로그아웃
          </Link>
        </div>
      ) : null}
    </div>
  );
};

const logout = () => {
  return sessionStorage.removeItem('sessionid'), window.location.replace('/');
};

export default Header;
