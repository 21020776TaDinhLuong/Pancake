import React, { useState, useEffect } from 'react';
import FacebookPosts from './FacebookPosts';

const PageSelector = () => {
  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [selectedPageToken, setSelectedPageToken] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: '1230095174938811', // Replace with your app ID
        cookie: true,
        xfbml: true,
        version: 'v21.0' // Use the latest version
      });

      window.FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          setAccessToken(response.authResponse.accessToken);
          fetchPages(response.authResponse.accessToken);
        }
      });
    };

    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    document.body.appendChild(script);
  }, []);

  const fetchPages = async (token) => {
    setLoading(true);
    try {
      const response = await fetch(`https://graph.facebook.com/me/accounts?access_token=${token}`);
      const data = await response.json();
      if (data.data) {
        setPages(data.data);
      } else {
        console.error('No pages found:', data);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    window.FB.login((response) => {
      if (response.authResponse) {
        setAccessToken(response.authResponse.accessToken);
        fetchPages(response.authResponse.accessToken);
      } else {
        console.error('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'public_profile,email,pages_show_list' });
  };

  const handleLogout = () => {
    window.FB.logout(() => {
      setAccessToken('');
      setPages([]);
      setSelectedPageId(null);
      setSelectedPageToken('');
    });
  };

  const handlePageSelect = (page) => {
    setSelectedPageId(page.id);
    setSelectedPageToken(page.access_token);
  };

  return (
    <div>
      <h3>Chọn Trang Facebook</h3>
      {!accessToken ? (
        <button onClick={handleLogin}>Đăng nhập với Facebook</button>
      ) : (
        <div>
          <button onClick={handleLogout}>Đăng xuất</button>
          <div className="page-list">
            {loading ? (
              <p>Đang tải...</p>
            ) : (
              pages.length > 0 ? (
                pages.map((page) => (
                  <div key={page.id} className="page-card" onClick={() => handlePageSelect(page)}>
                    <h4 className="page-name">{page.name}</h4>
                    <p>Danh mục: {page.category}</p>
                  </div>
                ))
              ) : (
                <p>Không có trang nào để hiển thị.</p>
              )
            )}
          </div>
        </div>
      )}
      
      {selectedPageId && <FacebookPosts pageId={selectedPageId} accessToken={selectedPageToken} />}
    </div>
  );
};

export default PageSelector;
