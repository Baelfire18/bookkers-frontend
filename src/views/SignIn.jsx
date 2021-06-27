import React from 'react';
import { FaRegEnvelope } from '@react-icons/all-files/fa/FaRegEnvelope';
import { AiFillLock } from '@react-icons/all-files/ai/AiFillLock';
import { FiUpload } from '@react-icons/all-files/fi/FiUpload';
import { GiClown } from '@react-icons/all-files/gi/GiClown';
import { BsFillPersonFill } from '@react-icons/all-files/bs/BsFillPersonFill';

export default function SigIn() {
  return (
    <section className="hero is-success is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action="" className="box">

                <div className="field">
                  <label htmlFor="" className="label">Email</label>
                  <div className="control has-icons-left">
                    <input type="email" placeholder="cacu@ql.cl" className="input" required />
                    <span className="icon is-small is-left">
                      <FaRegEnvelope />
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label">First Name</label>
                  <div className="control has-icons-left">
                    <input className="input" type="text" placeholder="Bastian" />
                    <span className="icon is-small is-left">
                      <GiClown />
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Last Name</label>
                  <div className="control has-icons-left">
                    <input className="input" type="text" placeholder="Smith" />
                    <span className="icon is-small is-left">
                      <BsFillPersonFill />
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="" className="label">Password</label>
                  <div className="control has-icons-left">
                    <input type="password" placeholder="*******" className="input" required />
                    <span className="icon is-small is-left">
                      <AiFillLock />
                    </span>
                  </div>
                </div>

                <div className="file">
                  <label className="file-label">
                    <input className="file-input" type="file" name="resume" />
                    <span className="file-cta">
                      <span className="file-icon">
                        <FiUpload />
                      </span>
                      <span className="file-label">
                        Choose a file…
                      </span>
                    </span>
                  </label>
                </div>
                <br />
                <div className="field">
                  <button className="button is-success">
                    Signin
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
