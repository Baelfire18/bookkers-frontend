import React from 'react';
import { FaRegEnvelope } from "@react-icons/all-files/fa/FaRegEnvelope";
import { AiFillLock } from "@react-icons/all-files/ai/AiFillLock";
import { FcCheckmark } from "@react-icons/all-files/fc/FcCheckmark";


export default function AuthorList() {
  return (
    <section>
    <div className=" box container is-max-desktop">
      <div class="card-content ">
        <div className="field">
            <p className="control has-icons-left has-icons-right">
                <input className="input" type="email" placeholder="Email"></input>
                <span className="icon is-small is-left">
                <FaRegEnvelope />
                </span>
                <span className="icon is-small is-right">
                <FcCheckmark />
                </span>
            </p>
            </div>
            <div className="field">
            <p className="control has-icons-left">
                <input className="input" type="password" placeholder="Password"></input>
                <span className="icon is-small is-left">
                <AiFillLock />
                </span>
            </p>
            </div>
            <div className="field">
            <p className="control">
                <button className="button is-success">
                Login
                </button>
            </p>
            </div>
    </div>
    </div>
    </section>
  );
}