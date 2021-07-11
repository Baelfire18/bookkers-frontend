import React from 'react';
import { useParams } from 'react-router-dom';
import SingleBook from '../components/SingleBook';
import bookArray from '../seeds/books';

/* eslint-disable  */
export default function User() {
  const { id } = useParams();
  return (
    <section>
      <div className="columns">
        <div className="container profile">
          <div className="modal" id="edit-preferences-modal">
            <div className="modal-background" />
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Edit Preferences</p>
                <button className="delete" type="submit" />
              </header>
              <section className="modal-card-body">
                <label className="label">Name</label>
                <p className="control">
                  <input className="input" placeholder="Text input" type="text" />
                </p>
                <label className="label">Username</label>
                <p className="control has-icon has-icon-right">
                  <input className="input" placeholder="Text input" type="text" value="pmillerk" />
                </p>
                <label className="label">Email</label>
                <p className="control has-icon has-icon-right">
                  <input className="input" placeholder="Email input" type="text" value="hello@" />
                  <i className="fa fa-warning" />
                  <span className="help is-danger">This email is invalid</span>
                </p>
                <div className="control">
                  <div className="control-label is-pulled-left">
                    <label className="label">Date of Birth</label>
                  </div>
                  <span>
                    <span className="select">
                      <select>
                        <option>Month</option>
                        <option>With options</option>
                      </select>
                    </span>
                    <span className="select">
                      <select>
                        <option>Day</option>
                        <option>With options</option>
                      </select>
                    </span>
                    <span className="select">
                      <select>
                        <option>Year</option>
                        <option>With options</option>
                      </select>
                    </span>
                  </span>
                </div>
                <label className="label">Description</label>
                <p className="control">
                  <textarea className="textarea" placeholder="Describe Yourself!" />
                </p>
                <div className="content">
                  <h1>Optional Information</h1>
                </div>
                <label className="label">Phone Number</label>
                <p className="control has-icon has-icon-right">
                  <input className="input" placeholder="Text input" type="text" value="+1 *** *** 0535" />
                </p>
                <label className="label">Work</label>
                <p className="control has-icon has-icon-right">
                  <input className="input" placeholder="Text input" type="text" value="Greater Washington Publishing" />
                </p>
                <label className="label">School</label>
                <p className="control has-icon has-icon-right">
                  <input className="input" placeholder="Text input" type="text" value="George Mason University" />
                </p>
              </section>
              <footer className="modal-card-foot">
                <a href="#userBook" className="button is-primary modal-save">Save changes</a>
                <a href="#userBook" className="button modal-cancel">Cancel</a>
              </footer>
            </div>
          </div>
          <div className="section profile-heading">
            <div className="columns is-mobile is-multiline">
              <div className="column is-2">
                <span className="header-icon user-profile-image">
                  <img alt="" src="https://i0.wp.com/hipertextual.com/wp-content/uploads/2019/08/hipertextual-se-confirma-serie-obi-wan-kenobi-con-ewan-mcgregor-disney-2019892534-scaled.jpg?fit=2560%2C1707&ssl=1" />
                </span>
              </div>
              <div className="column is-4-tablet is-10-mobile name">
                <p>
                  <span className="title is-bold">Humberto Ortuzar</span>
                  <br />
                  <a className="button is-primary is-outlined" href="#userBook" id="edit-preferences">
                    Edit Preferences
                  </a>
                  <br />
                </p>
                <p className="tagline">
                  The users profile bio would go here, of course.
                  It could be two lines or more or whatever.
                  We should probably limit the amount of characters to ~500 at most though.
                </p>
              </div>
              <div className="column is-2-tablet is-4-mobile has-text-centered">
                <p className="stat-val">30</p>
                <p className="stat-key">searches</p>
              </div>
              <div className="column is-2-tablet is-4-mobile has-text-centered">
                <p className="stat-val">10</p>
                <p className="stat-key">likes</p>
              </div>
              <div className="column is-2-tablet is-4-mobile has-text-centered">
                <p className="stat-val">{id}</p>
                <p className="stat-key">lists</p>
              </div>
            </div>
          </div>
          <div className="profile-options is-fullwidth">
            <div className="tabs is-fullwidth is-medium">
              <ul>
                <li className="link">
                  <a href="/users/1">
                    <span>My Lists</span>
                  </a>
                </li>
                <li className="link is-active">
                  <a href="/users/1">
                    <span>My Books</span>
                  </a>
                </li>
                <li className="link">
                  <a href="/users/1">
                    <span>My Searches</span>
                  </a>
                </li>
                <li className="link">
                  <a href="/users/1">
                    <span>Compare</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="box">

            <div className="columns">
              <div className="column is-2-tablet user-property-count has-text-centered">
                <p className="subtitle is-5">
                  <strong />
                  123
                  <br />
                  books
                </p>
              </div>
              <div className="column is-8">
                <p className="control has-addons">
                  <input className="input" placeholder="Search your liked properties" type="text" />
                  <button className="button" type="submit">
                    Search
                  </button>
                </p>
              </div>
            </div>
          </div>

          <ul className="BookList" id="userBook">
            {bookArray.map((book) => (
              <SingleBook key={book.id} book={book} />
            ))}
          </ul>

        </div>
      </div>
    </section>

  );
}
