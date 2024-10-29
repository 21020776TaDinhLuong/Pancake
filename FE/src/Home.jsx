import React from 'react';
import Header from './Header'; // Ensure this is the correct path to your Header component
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  return (
    <>
      <Header />
      <div className='homepage'>
        <div className='banner-box banner-home'>
          <div className="container-banner container-fluid">
            <div className="row banner-wrapper">
              <div className="col-md-5 banner-content">
                <div className="banner-top position-relative">
                  <h1 className="banner-title-main">Phần mềm quản lý bán hàng phổ biến nhất</h1>
                  <h2 className="banner-title">Phần mềm<br />quản lý bán hàng<br />phổ biến nhất</h2>
                </div>
                <div className="banner-below position-relative">
                  <div className="banner-below-left">
                    <button className="btn btn-primary register box-popup-register" id="show_signup">Dùng thử miễn phí</button>
                    <button className="btn btn-outline-gray-1 btn-icon-video-1">Khám phá</button>
                  </div>
                  <div className="banner-below-right">
                    <div className="total-user">
                      <div className="total-user-content">
                        <span><b className="fa-regular fa-user"></b></span>
                        <div className="total-mobile">
                          <span className="quantity-user">300.000+</span>
                          <span className="d-block text-banner">nhà kinh doanh sử dụng</span>
                        </div>
                      </div>
                    </div>
                    <div className="total-register">
                      <div className="total-register-content">
                        <span><b className="fa-regular fa-user"></b></span>
                        <div className="total-mobile">
                          <span className="quantity-user">10.000+</span>
                          <span className="d-block text-banner">nhà kinh doanh mới mỗi tháng</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="touch-pointKVOS touch-pointKVOS-web">
                  <span className="touch-pointKVOS-title">Dành cho người Việt<span className="touch-pointKVOS-sale">&nbsp;kinh doanh</span> ở nước ngoài</span>
                  <a href="https://global.kiotviet.vn" target="_blank" rel="noopener noreferrer">
                    <span>Xem thêm</span>
                    <span className="touch-pointKVOS-icon">
                      <b className="fa-solid fa-arrow-right"></b>
                    </span>
                  </a>
                </div>
              </div>
              <div className="col-md-7 banner-logo">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
