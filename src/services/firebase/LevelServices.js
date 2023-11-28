import { doc, collection, addDoc, getDocs, query, where, getDoc } from "firebase/firestore"; 
import { db } from '.'

const gamesCollectionRef = collection(db, "games")

class LevelServices {
    static async getLevelList({ gameId }) {
        //const gameDocRef = doc(gamesCollectionRef, gameId)

        //console.log(gameId)
        const q = query(collection(db, "levels"), where("gameId", "==", gameId));

        const docs = await getDocs(q);

        const levelList = []
        docs.forEach((doc) => {
            levelList.push({
                id: doc.id,
                ...doc.data()
            })
        })
        return levelList
    }
}

export default LevelServices