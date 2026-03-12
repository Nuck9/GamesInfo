import { useState } from "react"
import importGames from "../scripts/importGames"

export default function ImportGames() {

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleImport = async () => {
        setLoading(true)
        setMessage("Importando juegos...")

        try {
            const result = await importGames()

            if (result.success) {
                setMessage(`✅ ${result.count} juegos insertados en Supabase`)
            } else {
                setMessage("❌ Error al insertar juegos")
            }

        } catch (err) {
            console.error(err)
            setMessage("❌ Error inesperado")
        }

        setLoading(false)
    }

    return (
        <div style={{ padding: "40px" }}>
            <h1>Importar videojuegos a Supabase</h1>

            <button onClick={handleImport} disabled={loading}>
                {loading ? "Importando..." : "Importar juegos"}
            </button>

            <p>{message}</p>
        </div>
    )
}