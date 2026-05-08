import "../styles/DashboardCards.css"

function DashboardCards({

  expenses

}) {

  const totalExpenses = expenses.reduce(

    (total, expense) =>

      total + Number(expense.amount),

    0

  )

  const totalTransactions = expenses.length

  const highestExpense = Math.max(

    ...expenses.map(

      (expense) => Number(expense.amount)

    ),

    0

  )

  return (

    <div className="dashboard-cards">

      <div className="card">

        <h3>Total Expenses</h3>

        <p>₹ {totalExpenses}</p>

      </div>

      <div className="card">

        <h3>Total Transactions</h3>

        <p>{totalTransactions}</p>

      </div>

      <div className="card">

        <h3>Highest Expense</h3>

        <p>₹ {highestExpense}</p>

      </div>

    </div>

  )

}

export default DashboardCards