import {

  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend

} from "recharts"

import "../styles/ExpenseChart.css"

function ExpenseChart({ expenses }) {

  const categoryData = {}

  expenses.forEach((expense) => {

    const category = expense.category

    const amount = Number(expense.amount)

    if (categoryData[category]) {

      categoryData[category] += amount

    }

    else {

      categoryData[category] = amount

    }

  })

  const chartData = Object.keys(categoryData).map(

    (category) => ({

      name: category,

      value: categoryData[category]

    })

  )

  const COLORS = [

    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042"

  ]

  return (

    <div className="chart-container">

      <PieChart width={300} height={300}>

        <Pie

          data={chartData}

          dataKey="value"

          nameKey="name"

          cx="50%"

          cy="50%"

          outerRadius={100}

          label

        >

          {

            chartData.map((entry, index) => (

              <Cell

                key={index}

                fill={COLORS[index % COLORS.length]}

              />

            ))

          }

        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>

    </div>

  )

}

export default ExpenseChart