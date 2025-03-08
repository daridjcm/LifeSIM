export default function Card({ type, holder, id, expiry, number_card }) {
  let gradientClass = "from-green-700 to-green-500"
  let typeClass = "text-green-100"

  if (type.includes("Health Insurance")) {
    gradientClass = "from-blue-700 to-blue-500"
    typeClass = "text-blue-100"
  } else if (type.includes("Credit Card")) {
    gradientClass = "from-yellow-600 to-yellow-400"
    typeClass = "text-yellow-100"
  }

  return (
    <div
      className={`flex flex-col gap-3 bg-gradient-to-r ${gradientClass} p-5 mb-5 mt-2 rounded-xl shadow-lg max-w-xl text-white`}
    >
      <div className="flex justify-between items-start">
        <p className="font-semibold text-lg">
          {type} <span className="opacity-80">- LifeSIM</span>
        </p>
        <div className="text-right">
          <p className={`text-xs ${typeClass} opacity-80`}>VALID UNTIL</p>
          <p className="font-medium">{expiry || "MM/YY"}</p>
        </div>
      </div>

      {number_card && (
        <p className={`${typeClass} opacity-70 text-lg tracking-wider my-2`}>
          {number_card}
        </p>
      )}

      <div className="mt-2">
        <p className={`text-xs ${typeClass} opacity-80`}>HOLDER</p>
        <p className="font-medium text-lg">{holder || "Desconocido"}</p>
      </div>

      <div className="mt-2 text-right">
        <p className={`text-xs ${typeClass} opacity-80`}>ID:</p>
        <p className="font-medium">{id || "########"}</p>
      </div>
    </div>
  )
}
