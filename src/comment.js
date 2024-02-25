import React, { useState } from 'react';

function Comment({ comment, onDelete, onAddReply, onDeleteReply, maxNestedReplies = 4 }) {
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [nestedRepliesCount, setNestedRepliesCount] = useState(comment.replies ? comment.replies.length : 0);

  const handleAddReply = () => {
    if (replyText.trim() !== '') {
      if (nestedRepliesCount < maxNestedReplies) {
        onAddReply(replyText);
        setReplyText('');
        setIsReplying(false);
        setNestedRepliesCount(nestedRepliesCount + 1);
      } else {
        alert('Error: Maximum nested replies reached.');
        // You can replace the alert with a more sophisticated error handling mechanism
      }
    }
  };

  return (
    <div className="Comment">
      <p>{comment.text}</p>
      {comment.replies && comment.replies.length > 0 && (
        <ul>
          {comment.replies.map((reply, index) => (
            <li key={index}>
              <Comment
                comment={reply}
                onDelete={() => onDeleteReply(index)}
                onAddReply={(text) => onAddReply(text, index)}
                onDeleteReply={(replyIndex) => onDeleteReply(index, replyIndex)}
                maxNestedReplies={maxNestedReplies}
              />
            </li>
          ))}
        </ul>
      )}
      {isReplying && (
        <div>
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply..."
          />
          <button onClick={handleAddReply}>Reply</button>
        </div>
      )}
      {!isReplying && nestedRepliesCount < maxNestedReplies && (
        <button onClick={() => setIsReplying(true)}>Reply</button>
      )}
      {nestedRepliesCount >= maxNestedReplies && (
        <p style={{ color: 'red' }}>Error: Maximum nested replies reached.</p>
      )}
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default Comment;
