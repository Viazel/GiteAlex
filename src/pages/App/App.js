import './App.css';
import Todo from '../../components/Todo/Todo';
import {useEffect, useState} from "react";

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

    const [error, SetError] = useState(false);

    const cliquedButton = () => {
        let canOrNot = true;
        reserved.map(index => {
            if(date.getDate() >= index.date.getDate() && date.getDate() <= index.secondeDate.getDate() || date2.getDate() >= index.date.getDate() && date2.getDate() <= index.secondeDate.getDate()) {
                if(date.getMonth() >= index.date.getMonth() && date.getMonth() <= index.secondeDate.getMonth() || date2.getMonth() >= index.date.getMonth() && date2.getMonth() <= index.secondeDate.getMonth()) {
                    const giteNew = index.gite === "Gite 1";
                    if(giteNew === gite){
                        canOrNot = false;
                        if(!error){
                            SetError(true);
                            setTimeout(() => {
                                SetError(false);
                            }, 1000 * 5)
                        }
                    }
                }
            }
        })
        if(canOrNot){
            SetReserved([...reserved, {name: name, date: date, secondeDate: date2, gite: gite ? "Gite 1" : gite2 && "Gite 2", index: i, hight: false}]);
            setI(i + 1);
        }
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

    const changeDate2 = time => {
        SetDate2(new Date(time));
    }

    const changeDate = time => {
        SetDate(new Date(time));
    }

    const changeGite = e => {
        SetGite(true);
        SetGite2(false);
    }

    const changeGite2 = e => {
        SetGite2(true);
        SetGite(false);
    }

    const changeFilter = e => {
        let newArr = [];
        reserved.map(index => {
            index.hight = false;
            newArr = [...newArr, index];
        })
        SetReserved(newArr);
        const time = new Date(e);
        reserved.map(index => {
            if(time.getDate() >= index.date.getDate() && time.getDate() <= index.secondeDate.getDate()){
                if(time.getMonth() >= index.date.getMonth() && time.getMonth() <= index.secondeDate.getMonth()) {
                    let newArr = [];
                    reserved.map(index2 => {
                        if(index2 !== index){
                            newArr = [...newArr, index2];
                        }
                    })
                    const oldTodo = index;
                    oldTodo.hight = true;
                    newArr = [oldTodo, ...newArr];
                    SetReserved(newArr);
                }
            }
        })
    }

    const mainApp =
            <section className="App">
                <h1 className="title">Réservation gîtes JEAN</h1>
                <div className="container">
                    <div className="addnew">
                        <input type="text" onChange={e => changeName(e.target.value)} placeholder="Entrez le nom de la personne"/>
                        <div className="date-class">
                            <input type="date" onChange={e => changeDate(e.target.value)}/> au <input type="date" onChange={e => changeDate2(e.target.value)}/>
                        </div>
                        <div className="giteRadio">
                            <input type="radio" onClick={e => changeGite(e)} name="gite" id="gite1"/>
                            <label htmlFor="gite1">Gîte 1</label>
                        </div>
                        <div className="giteRadio">
                            <input type="radio" onClick={e => changeGite2(e)} name="gite" id="gite2"/>
                            <label  htmlFor="gite2">Gîte 2</label>
                        </div>
                        <button onClick={cliquedButton}>Ajouter</button>
                    </div>
                    {error && <h1 className="error" style={{color: "red"}}>Erreur: Ce moment est déjà réservé</h1>}
                    <input type="date" onChange={e => changeFilter(e.target.value)}/>
                    <div className="calendar">
                        {
                            reserved.map(index => {
                                return(
                                    <Todo key={index.index} delFun={() => delFunc(index.index)} name={index.name} time={
                                        index.date.getDate().toString() + " " + convertNumberInMonths(index.date.getMonth() + 1) + " " + index.date.getFullYear().toString()
                                        + " au " +
                                        index.secondeDate.getDate().toString() + " " + convertNumberInMonths(index.secondeDate.getMonth() + 1) + " " + index.secondeDate.getFullYear().toString()
                                    } gite={index.gite} highlight={index.hight} />
                                )
                            })
                        }
                    </div>
                </div>
            </section>

    const [canPass, SetCanpPass] = useState(false);

    const [password, SetPassword] = useState(false);

    const verifyPassword = e => {
        e.preventDefault();
        if(password === "Lunette"){
            SetCanpPass(true);
        }
    }

    const changePassword = e => {
        SetPassword(e);
    }

    return (

        <div>
            {canPass ? mainApp :
                <div>
                    <form action="" onSubmit={e => verifyPassword(e)}>
                        <input type="password" placeholder="Entrez votre mot de passe" autoComplete="on" onChange={e => changePassword(e.target.value)}/>
                        <input type="submit"/>
                    </form>
                </div>
            }
        </div>
    )

}