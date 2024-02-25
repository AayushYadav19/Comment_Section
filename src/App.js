import React, { useState } from 'react';
import Comment from './comment';
import CommentForm from './CommentForm';

function App() {
  const [comments, setComments] = useState([]);

  const addComment = (text) => {
    setComments([...comments, { text, replies: [] }]);
  };

  const deleteComment = (commentIndex) => {
    setComments(
      comments.filter((comment, index) => index !== commentIndex)
    );
  };

  const addReply = (commentIndex, replyText, parentReplyIndex) => {
    const updatedComments = [...comments];
    if (typeof parentReplyIndex === 'number') {
      // Add reply to a nested comment
      updatedComments[commentIndex].replies[parentReplyIndex].replies.push({ text: replyText });
    } else {
      // Add reply to the main comment
      updatedComments[commentIndex].replies.push({ text: replyText });
    }
    setComments(updatedComments);
  };

  const deleteReply = (commentIndex, replyIndex, parentReplyIndex) => {
    const updatedComments = [...comments];
    if (typeof parentReplyIndex === 'number') {
      // Delete a nested reply
      updatedComments[commentIndex].replies[parentReplyIndex].replies.splice(replyIndex, 1);
    } else {
      // Delete a reply from the main comment
      updatedComments[commentIndex].replies.splice(replyIndex, 1);
    }
    setComments(updatedComments);
  };

  return (
    <div className="App">
      <h1>Comments</h1>
      <CommentForm addComment={addComment} />
      {comments.map((comment, index) => (
        <Comment
          key={index}
          comment={comment}
          onDelete={() => deleteComment(index)}
          onAddReply={(text, parentReplyIndex) => addReply(index, text, parentReplyIndex)}
          onDeleteReply={(replyIndex, parentReplyIndex) => deleteReply(index, replyIndex, parentReplyIndex)}
        />
      ))}
    </div>
  );
}

export default App;
