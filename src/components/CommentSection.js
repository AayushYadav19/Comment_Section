// src/components/CommentSection.js
import React, { useState } from 'react';

const Comment = ({ comment, onDelete, onReply }) => {
  return (
    <div style={{ marginLeft: '20px', marginBottom: '10px' }}>
      <p>{comment.text}</p>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onReply}>Reply</button>
      {comment.replies && comment.replies.map((reply, index) => (
        <Comment key={index} comment={reply} onDelete={onDelete} onReply={onReply} />
      ))}
    </div>
  );
};

const CommentSection = () => {
  const [comments, setComments] = useState([
    { text: 'This is the first comment', replies: [
      { text: 'Reply to the first comment' },
      { text: 'Another reply to the first comment' }
    ]},
    { text: 'Here goes the second comment', replies: [
      { text: 'A reply to the second comment' }
    ]}
  ]);

  const addComment = (text) => {
    setComments([...comments, { text, replies: [] }]);
  };

  const deleteComment = (index, isTopLevel) => {
    const newComments = [...comments];
    
    if (isTopLevel) {
      newComments.splice(index, 1);
    } else {
      newComments[index].replies.pop(); // Remove the last reply
    }

    setComments(newComments);
  };

  const replyToComment = (index, text) => {
    const newComments = [...comments];
    newComments[index].replies = [...newComments[index].replies, { text }];
    setComments(newComments);
  };

  return (
    <div>
      {comments.map((comment, index) => (
        <Comment 
          key={index} 
          comment={comment} 
          onDelete={() => deleteComment(index, index === 0)} 
          onReply={() => {
            const text = prompt('Enter your reply:');
            if (text !== null) {
              replyToComment(index, text);
            }
          }}
        />
      ))}
      <button onClick={() => {
        const text = prompt('Enter your comment:');
        if (text !== null) {
          addComment(text);
        }
      }}>Add Comment</button>
    </div>
  );
};

export default CommentSection;
