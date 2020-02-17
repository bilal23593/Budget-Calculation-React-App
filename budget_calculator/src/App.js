import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'
import Alert from './components/Alert'
import uuid from 'uuid/v4'

const InitialExpenses = [
  {id:uuid(),charge:"rent",amount:200},
  {id:uuid(),charge:"car payment",amount:1200},
  {id:uuid(),charge:"credit card bill",amount:2200}
];

function App() {
/******************* State Values ******************/
// all expenses, add expenses
const [expenses,setExpenses] = useState(InitialExpenses);
// single expense
const [charge,setCharge] = useState("");
// single amount 
const [amount,setAmount] = useState("");
// alert
const [alert,setAlert] = useState({show:false});
// edit
const [edit,setEdit] = useState(false);
//editId 
const [id,setId] = useState(0);
/******************* Functionality ******************/

const handleCharge = e =>{
  setCharge(e.target.value)
}

const handleAmount = e =>{
  setAmount(e.target.value)
}

const handleSubmit = e =>{
  e.preventDefault();

  if (charge !== "" && amount > 0){

    if(edit){
        let tempExpenses = expenses.map(item => {
          return item.id === id ? {...item,charge,amount} : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({type:'success',text:'Item Updated Successfully'});
    }
    else{
      const singleExpense = {id: uuid(), charge, amount};
      setExpenses([...expenses,singleExpense]);
      handleAlert({type:'success',text:'Item Added Successfully'});
    }

    setCharge('');
    setAmount('');
  }
  else{
    //Handle alert call
    handleAlert({type:'danger',text:'Fields are empty OR fields are entered wrongly'});
  }
}

const handleAlert = ({type,text}) =>{
  setAlert({show:true,type,text});
  setTimeout(() => {

    setAlert({show:false});
  },5000)
}

const handleClear = () =>{
  setExpenses([]);
  handleAlert({type:'danger', text:`All Items deleted !`});
}

const handleDelete = (id) =>{
  console.log(`Item Deleted ${id}`);
  let tempExpenses = expenses.filter(item => item.id !== id);
  setExpenses(tempExpenses);
  handleAlert({type:'danger', text:`Item with ID ${id} deleted !`});
}

const handleEdit = (id) =>{
  let expense = expenses.find(item => item.id === id);
  let {charge,amount}=expense;
  setCharge(charge);
  setAmount(amount);
  setEdit(true);
  setId(id);
}
  return (
    <React.Fragment>
      {alert.show && <Alert type={alert.type} text={alert.text} ></Alert>}
      
      <h1>Budget Calculator</h1>
      <main className="App">
          <ExpenseForm 
              charge={charge}
              amount={amount}
              edit={edit}
              handleCharge={handleCharge}
              handleAmount={handleAmount}
              handleSubmit={handleSubmit}
              handleEdit={handleEdit}
          ></ExpenseForm>
          <ExpenseList 
              expenses={expenses}
              handleClear={handleClear}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
          ></ExpenseList>
      </main>
      <h1>
        Total Spending : <span className="total"> 
        $ {expenses.reduce((accu,curr) => {
          return (accu += parseInt(curr.amount) );
        },0)}
        </span>
      </h1>
      

    </React.Fragment>
  );
}

export default App;
