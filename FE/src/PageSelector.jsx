import React, { useState, useEffect } from 'react';
import FacebookPosts from './FacebookPosts';

const PageSelector = () => {
  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [selectedPageToken, setSelectedPageToken] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: '1075843353920444', // Replace with your app ID
        cookie: true,
        xfbml: true,
        version: 'v12.0' // Use the latest version
      });

      window.FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          setAccessToken(response.authResponse.accessToken);
          fetchPages(response.authResponse.accessToken);
        }
      });
    };

    // Load the SDK asynchronously
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    document.body.appendChild(script);
  }, []);

  const fetchPages = async (token) => {
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
        <div className="page-list">
          {pages.length > 0 ? (
            pages.map((page) => (
              <div key={page.id} className="page-card" onClick={() => handlePageSelect(page)}>
                <h4 className="page-name">{page.name}</h4>
                <p>Danh mục: {page.category}</p>
              </div>
            ))
          ) : (
            <p>Không có trang nào để hiển thị.</p>
          )}
        </div>
      )}
      
      {selectedPageId && <FacebookPosts pageId={selectedPageId} accessToken={selectedPageToken} />}
    </div>
  );
};

export default PageSelector;
