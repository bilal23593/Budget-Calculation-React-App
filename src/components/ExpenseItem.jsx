import React from 'react'
import {MdEdit,MdDelete,MdSend} from 'react-icons/md'

 const ExpenseItem = ({expense,handleDelete,handleEdit}) => {

    const {id,charge, amount} = expense;
    return (
        
            <li className="item">
                <div className="info">
                    <span className="expense">{charge}</span>
                    <span className="amount">${amount}</span>
                </div>
                <div>
                    <button onClick={() =>handleEdit(id)} className="edit-btn" aria-label="edit button">
                        Edit <MdEdit></MdEdit>
                    </button>
                    <button onClick={() =>handleDelete(id)} className="clear-btn" aria-label="delete button">
                        Delete <MdDelete></MdDelete>
                    </button>
                </div>
               
            </li>        
    )
}
export default ExpenseItem;
