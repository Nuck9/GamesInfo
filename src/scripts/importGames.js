import { supabase } from "../lib/supabase"

const API_KEY = "7987e23dd79846cca6802bc75b4bb897"

export default async function importGames() {

    let allGames = []

    try {

        for (let page = 1; page <= 3; page++) {

            const res = await fetch(
                `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=${page}`
            )

            const data = await res.json()

            console.log("Página:", page, "Juegos:", data.results.length)

            const games = data.results
                .filter(g => g.background_image)
                .map(g => ({
                    name: g.name,
                    released: g.released,
                    rating: g.rating,
                    image: g.background_image,
                    platforms: g.platforms
                        ?.map(p => p.platform.name)
                        .join(", ")
                }))

            allGames = [...allGames, ...games]

        }

        console.log("Total juegos preparados:", allGames.length)

        const { error } = await supabase
            .from("games")
            .insert(allGames)

        if (error) {
            console.error("Error insertando:", error)
            return { success: false }
        }

        return {
            success: true,
            count: allGames.length
        }

    } catch (err) {
        console.error("Error general:", err)
        return { success: false }
    }
}