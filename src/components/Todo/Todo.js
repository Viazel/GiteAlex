import './Todo.css';
import {useState} from "react";

export default function Todo(opt) {

    return (
        <section className="todo" style={opt.highlight ? {background: "blue"} : {background: "#444"}}>
            <h1 className="name">{opt.name}</h1>
            <h1 className="date">{opt.time}</h1>
            <h1 className="gite">{opt.gite}</h1>
            <button className="delete" onClick={() => opt.delFun()}>Supprimer</button>
        </section>
    )
}