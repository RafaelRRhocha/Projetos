import React from 'react';

const INITIAL_STATE = {
  email: '',
  grade: 0,
  comment: '',
};

class Comments extends React.Component {
  state = INITIAL_STATE;

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSendClick = () => {
    const commentsSaved = JSON.parse(localStorage.getItem('comments'));

    if (!commentsSaved) {
      localStorage.setItem('comments', JSON.stringify([this.state]));
    } else {
      localStorage.setItem(
        'comments',
        JSON.stringify([...commentsSaved, this.state]),
      );
    }

    this.setState(INITIAL_STATE);
  };

  render() {
    const { email, comment } = this.state;
    const comments = JSON.parse(localStorage.getItem('comments'));

    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            data-testid="product-detail-email"
            type="email"
            name="email"
            id="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="grade" onChange={ this.handleChange }>
          Nota:
          <input
            data-testid="1-rating"
            type="radio"
            name="grade"
            id="grade"
            value="1"
          />
          {' '}
          1
          <input
            data-testid="2-rating"
            type="radio"
            name="grade"
            id="grade"
            value="2"
          />
          {' '}
          2
          <input
            data-testid="3-rating"
            type="radio"
            name="grade"
            id="grade"
            value="3"
          />
          {' '}
          3
          <input
            data-testid="4-rating"
            type="radio"
            name="grade"
            id="grade"
            value="4"
          />
          {' '}
          4
          <input
            data-testid="5-rating"
            type="radio"
            name="grade"
            id="grade"
            value="5"
          />
          {' '}
          5
        </label>
        <label htmlFor="comment">
          Comentários:
          <textarea
            data-testid="product-detail-evaluation"
            name="comment"
            id="comment"
            value={ comment }
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="submit-review-btn"
          type="button"
          onClick={ this.handleSendClick }
        >
          Enviar
        </button>
        {comments
          && comments.map((commentLocal, index) => (
            <div key={ index }>
              <p>{commentLocal.email}</p>
              <p>
                Nota:
                {' '}
                {commentLocal.grade}
              </p>
              <p>{commentLocal.comment}</p>
            </div>
          ))}
      </div>
    );
  }
}

export default Comments;
