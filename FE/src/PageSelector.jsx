import React, { useState, useEffect } from 'react';
import FacebookPosts from './FacebookPosts';

const ACCESS_TOKEN = 'EAAPSeUzxw7wBO83eiScZAHGxjXWBMWtdZBSWG2DZCjZBXRcHhTVA00kHNqmCnb11k2i60lZBYOtWSTFQS3cavEJvXMjDngmmekyDLZBfGZBeFkiXNH8OySvUCQCOeZCFdPxbwi4YNgjW0oY8EUhMkRZAAK386ODTwOV7ZChoy341YwAQpdGoiR7pCiO79m';

const PageSelector = () => {
  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState(null);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch(`https://graph.facebook.com/me/accounts?access_token=${ACCESS_TOKEN}`);
      const data = await response.json();
      console.log(data);
      if (data.data) {
        setPages(data.data);
      } else {
        console.error('No pages found:', data);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  const handlePageSelect = (pageId) => {
    setSelectedPageId(pageId);
  };

  return (
    <div>
      <h3>Chọn Trang Facebook</h3>
      {pages.length > 0 ? (
        <div className="page-list">
          {pages.map((page) => (
            <div key={page.id} className="page-card" onClick={() => handlePageSelect(page.id)}>
              <h4 className="page-name">{page.name}</h4>
              <p>Danh mục: {page.category}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Không có trang nào để hiển thị.</p>
      )}
      
      {selectedPageId && <FacebookPosts pageId={selectedPageId} />}
    </div>
  );
};

export default PageSelector;
