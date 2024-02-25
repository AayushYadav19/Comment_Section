import React, { useState } from 'react';

function CommentForm({ addComment }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment">Comment:</label>
      <textarea id="comment" value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">Post Comment</button>
    </form>
  );
}

export default CommentForm;
