import './Todo.css';

export default function Todo(opt) {

    const deleteProp = () => {
        opt.delFun();
    }

    return (
        <section className="todo">
            <h1 className="name">{opt.name}</h1>
            <h1 className="date">{opt.time}</h1>
            <h1 className="gite">{opt.gite}</h1>
            <button className="delete" onClick={deleteProp}>Supprimer</button>
        </section>
    )
}