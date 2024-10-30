import React, { useState, useEffect } from 'react';
import FacebookPosts from './FacebookPosts';

const ACCESS_TOKEN = 'EAAPSeUzxw7wBOZC2bWSv4HY9IaZCq8Lz7XN9xZBcxZCcP2F5I9O1K6XfEr5UTog0KFyQPM3B7KezXO8nL815as03wB6q4f42SP2zsw9YGePtXmjZAQt1txyFnyZBZB6aawyTwJWT3lDncYggfiIfvzymcGNMdAGOpKikCMieTdV6vNZBvCd4eVl00H2c';

const PageSelector = () => {
  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [selectedPageToken, setSelectedPageToken] = useState('');

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch(`https://graph.facebook.com/me/accounts?access_token=${ACCESS_TOKEN}`);
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

  const handlePageSelect = (page) => {
    setSelectedPageId(page.id);
    setSelectedPageToken(page.access_token);
  };

  return (
    <div>
      <h3>Chọn Trang Facebook</h3>
      {pages.length > 0 ? (
        <div className="page-list">
          {pages.map((page) => (
            <div key={page.id} className="page-card" onClick={() => handlePageSelect(page)}>
              <h4 className="page-name">{page.name}</h4>
              <p>Danh mục: {page.category}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Không có trang nào để hiển thị.</p>
      )}
      
      {selectedPageId && <FacebookPosts pageId={selectedPageId} accessToken={selectedPageToken} />}
    </div>
  );
};

export default PageSelector;
