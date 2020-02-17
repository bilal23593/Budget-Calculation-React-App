import React from 'react'
import Item  from './ExpenseItem'
import {MdDelete} from 'react-icons/md'

 const ExpenseList = ({expenses,handleClear,handleDelete,handleEdit}) => {

    return (
        <React.Fragment>
           <ul className="list">
            {expenses.map((expense) => 
            {
            return <Item 
                key={expense.id} 
                expense={expense}
                handleDelete={handleDelete}
                handleEdit={handleEdit}>                
                </Item>;
        })}
           </ul>

           {expenses.length > 0 && (<button className="btn" onClick={handleClear}>
               Clear Expenses 
               <MdDelete className="btn-icon" ></MdDelete> </button>)}
            
        </React.Fragment>
    )
}
export default ExpenseList;