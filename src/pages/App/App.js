import './App.css';
import Todo from '../../components/Todo/Todo';
import {useState} from "react";

function convertNumberInMonths(number) {
    switch (number) {
        case 1:
            return "Janvier";
        case 2:
            return "Février";
        case 3:
            return "Mars";
        case 4:
            return "Avril";
        case 5:
            return "Mai";
        case 6:
            return "Juin";
        case 7:
            return "Juillet";
        case 8:
            return "Aout";
        case 9:
            return "Septembre";
        case 10:
            return "Octobre";
        case 11:
            return "Novembre";
        case 12:
            return "Décembre";
    }
}

export default function App() {

    const [reserved, SetReserved] = useState([]);

    const [name, SetName] = useState(null);

    const [date, SetDate] = useState(null);

    const [date2, SetDate2] = useState(null);

    const [gite, SetGite] = useState(true);

    const [gite2, SetGite2] = useState(false);

    const [i, setI] = useState(0);

    const cliquedButton = () => {
        SetReserved([...reserved, {name: name, date: date, secondeDate: date2, gite: gite ? "Gite 1" : gite2 && "Gite 2", index: i}]);
        reserved.map(index => {
            console.log(index.date.getUTCDate().toString());
        })
        setI(i + 1);
    }

    const delFunc = e => {
        const array = [...reserved];
        let newArr = [];
        array.map(index => {
            if(index.index !== e){
                newArr = [...newArr, index];
            }
        })
        SetReserved(newArr);
    }

    const changeName = name => {
        SetName(name);
    }

    const changeDate2 = name => {
        // SetDate2(test.getDate().toString() + " " + convertNumberInMonths(test.getMonth() + 1) + " " + test.getFullYear().toString());
        SetDate2(new Date(name));
    }

    const changeDate = name => {
        // SetDate(test.getDate().toString() + " " + convertNumberInMonths(test.getMonth() + 1) + " " + test.getFullYear().toString());
        SetDate(new Date(name));
    }

    const changeGite = e => {
        SetGite(true);
        SetGite2(false);
    }

    const changeGite2 = e => {
        SetGite2(true);
        SetGite(false);
    }

    return (
        <section className="App">
            <div className="container">
                <div className="addnew">
                    <input type="text" onChange={e => changeName(e.target.value)} placeholder="Entrez le nom de la personne"/>
                    <div className="date-class">
                        <input type="date" onChange={e => changeDate(e.target.value)}/> au <input type="date" onChange={e => changeDate2(e.target.value)}/>
                    </div>
                    <div>
                        <input type="radio" onClick={e => changeGite(e)} name="gite" id="gite1"/>
                        <label htmlFor="gite1">Gîte 1</label>
                    </div>
                    <div>
                        <input type="radio" onClick={e => changeGite2(e)} name="gite" id="gite2"/>
                        <label htmlFor="gite2">Gîte 2</label>
                    </div>
                    <button onClick={cliquedButton}>Ajouter</button>
                </div>
                <div className="calendar">
                    {
                        reserved.map(index => {
                            return(
                                <Todo key={index.index} delFun={() => delFunc(index.index)} name={index.name} time={
                                    index.date.getDate().toString() + " " + convertNumberInMonths(index.date.getMonth() + 1) + " " + index.date.getFullYear().toString()
                                + " au " +
                                    index.secondeDate.getDate().toString() + " " + convertNumberInMonths(index.secondeDate.getMonth() + 1) + " " + index.secondeDate.getFullYear().toString()
                                } gite={index.gite} />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}