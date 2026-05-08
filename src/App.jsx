import { useState, useEffect } from "react"

import "./App.css"

import Navbar from "./components/Navbar"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseCard from "./components/ExpenseCard"
import ExpenseChart from "./components/ExpenseChart"
import DashboardCards from "./components/DashboardCards"

function App() {

  const [expenses, setExpenses] = useState([])

  const [selectedCategory, setSelectedCategory]
    = useState("All")

  const [searchTerm, setSearchTerm]
    = useState("")

  const [darkMode, setDarkMode]
    = useState(false)

  const [editingExpense, setEditingExpense]
  = useState(null)


  const totalExpense = expenses.reduce(

    (total, expense) =>

      total + Number(expense.amount),

    0

  )

  async function fetchExpenses() {

    const response = await fetch(

      `${import.meta.env.VITE_API_URL}/expenses`

    )

    const data = await response.json()

    setExpenses(data)

  }

  useEffect(() => {

    fetchExpenses()

  }, [])

  async function deleteExpense(id) {

  await fetch(

    `${import.meta.env.VITE_API_URL}/expenses/${id}`,

    {

      method: "DELETE"

    }

  )

  fetchExpenses()

}

  const filteredExpenses = expenses.filter(

    (expense) => {

      const matchesCategory =

        selectedCategory === "All"

        ||

        expense.category === selectedCategory

      const matchesSearch =

        expense.description

          .toLowerCase()

          .includes(

            searchTerm.toLowerCase()

          )

      return (

        matchesCategory && matchesSearch

      )

    }

  )

  

  return (

    <div

      className={

        darkMode

          ? "app-container dark"

          : "app-container"

      }

    >

      <Navbar />

      <button

        onClick={() =>
          setDarkMode(!darkMode)
        }

      >

        {

          darkMode

            ? "Light Mode"

            : "Dark Mode"

        }

      </button>

      <h2>

        Total Expenses: ₹ {totalExpense}

      </h2>
      <DashboardCards
  expenses={expenses}
/>

      <select

        value={selectedCategory}

        onChange={(e) =>
          setSelectedCategory(e.target.value)
        }

      >

        <option value="All">

          All

        </option>

        <option value="Food">

          Food

        </option>

        <option value="Travel">

          Travel

        </option>

        <option value="Shopping">

          Shopping

        </option>

        <option value="Bills">

          Bills

        </option>

      </select>

      <input

        type="text"

        placeholder="Search expenses..."

        value={searchTerm}

        onChange={(e) =>
          setSearchTerm(e.target.value)
        }

      />

      <div className="dashboard-top">

        <ExpenseChart
          expenses={filteredExpenses}
        />

        <ExpenseForm
          expenses={expenses}
          setExpenses={setExpenses}
          darkMode={darkMode}
          fetchExpenses={fetchExpenses}
          editingExpense={editingExpense}
          setEditingExpense={setEditingExpense}
        />

      </div>

      <div className="expense-list">

  {

    filteredExpenses.map((expense) => (

      <ExpenseCard
        key={expense.id}
        expense={expense}
        deleteExpense={deleteExpense}
        id={expense.id}
        darkMode={darkMode}
        setEditingExpense={setEditingExpense}
      />

    ))

  }

</div>

    </div>

  )

}

export default App