import "../styles/ExpenseCard.css"

function ExpenseCard(
  {
    expense,
    deleteExpense,
    id,
    darkMode,
    setEditingExpense
  }
) {

  return (

    <div
  className={
    darkMode
      ? "expense-card dark-card"
      : "expense-card"
  }
>

  <div className="card-actions">

    <button
      onClick={() => deleteExpense(id)}
    >

      Delete

    </button>

    <button
      onClick={() =>
        setEditingExpense(expense)
      }
    >

      Edit

    </button>

  </div>

  <h2 className="expense-amount">

    ₹ {expense.amount}

  </h2>

  <h3 className="expense-category">

    {expense.category}

  </h3>

  <p className="expense-description">

    {expense.description}

  </p>

</div>

  )

}

export default ExpenseCard