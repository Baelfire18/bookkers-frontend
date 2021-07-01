import React from 'react';
import { FaRegEnvelope } from '@react-icons/all-files/fa/FaRegEnvelope';
import { AiFillLock } from '@react-icons/all-files/ai/AiFillLock';
import { FcCheckmark } from '@react-icons/all-files/fc/FcCheckmark';

export default function LogIn() {
  return (
    <section className="hero is-success is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action="" className="box">

                <div className="field">
                  <label htmlFor="" className="label">Email</label>
                  <div className="control has-icons-left  has-icons-right">
                    <input type="email" placeholder="cacu@ql.cl" className="input" required />
                    <span className="icon is-small is-left">
                      <FaRegEnvelope />
                    </span>
                    <span className="icon is-small is-right">
                      <FcCheckmark />
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
                <div className="field">
                  <label htmlFor="" className="checkbox">
                    <input type="checkbox" />
                    Remember me
                  </label>
                </div>
                <div className="field">
                  <button className="button is-success" type="submit">
                    Login
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
