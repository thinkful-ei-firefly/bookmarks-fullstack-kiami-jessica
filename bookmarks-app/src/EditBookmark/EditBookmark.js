import React, { Component } from  'react';
import config from '../config'
import './EditBookmark.css';

const Required = () => (
  <span className='EditBookmark__required'>*</span>
)

class EditBookmark extends Component {
  static defaultProps = {
    onEditBookmark: () => {} 
  };

  state = {
    error: null,
  };

  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { title, url, description, rating } = e.target
    const bookmark = {
      title: title.value,
      url: url.value,
      description: description.value,
      rating: rating.value,
    }
    console.log (bookmark);

    this.setState({ error: null })
    fetch(`${config.API_ENDPOINT}${this.props.id}`, {
      method: 'PATCH',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        this.props.onEditBookmark(data)
        this.props.changePage('list')
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    const { error } = this.state
    const { onClickCancel } = this.props
    return (
      <section className='EditBookmark'>
        <h2>Create a bookmark</h2>
        <form
          className='EditBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='EditBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id= 'title'
              defaultValue = {this.props.title}
              required
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              defaultValue = {this.props.url}
              required
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              defaultValue = {this.props.description}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              defaultValue = {this.props.rating}
              min='1'
              max='5'
              required
            />
          </div>
          <div className='EditBookmark__buttons'>
            <button type='button' onClick={onClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default EditBookmark;
