import { useState, useEffect }

from "react"

import "../styles/ExpenseForm.css"

function ExpenseForm({

  expenses,
  setExpenses,
  darkMode,
  fetchExpenses,
  editingExpense,
  setEditingExpense

}) {

  const [amount, setAmount]
    = useState("")

  const [category, setCategory]
    = useState("")

  const [description, setDescription]
    = useState("")

  useEffect(() => {

    if (editingExpense) {

      setAmount(editingExpense.amount)

      setCategory(editingExpense.category)

      setDescription(

        editingExpense.description

      )

    }

  }, [editingExpense])

  async function addExpense(e) {

    e.preventDefault()

    const newExpense = {

      amount,
      category,
      description

    }

    if (editingExpense) {

      await fetch(

        `http://127.0.0.1:5000/expenses/${editingExpense.id}`,

        {

          method: "PUT",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify(newExpense)

        }

      )

      setEditingExpense(null)

    }

    else {

      await fetch(

        "http://127.0.0.1:5000/expenses",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify(newExpense)

        }

      )

    }

    fetchExpenses()

    setAmount("")
    setCategory("")
    setDescription("")

  }

  return (

    <div

      className={

        darkMode

          ? "expense-form dark-form"

          : "expense-form"

      }

    >

      <h2>

        {

          editingExpense

            ? "Edit Expense"

            : "Add Expense"

        }

      </h2>

      <form onSubmit={addExpense}>

        <input

          type="text"

          placeholder="Enter amount"

          value={amount}

          onChange={(e) =>

            setAmount(e.target.value)

          }

        />

        <input

          type="text"

          placeholder="Enter category"

          value={category}

          onChange={(e) =>

            setCategory(e.target.value)

          }

        />

        <input

          type="text"

          placeholder="Enter description"

          value={description}

          onChange={(e) =>

            setDescription(e.target.value)

          }

        />

        <button type="submit">

          {

            editingExpense

              ? "Update Expense"

              : "Add Expense"

          }

        </button>

      </form>

    </div>

  )

}

export default ExpenseForm