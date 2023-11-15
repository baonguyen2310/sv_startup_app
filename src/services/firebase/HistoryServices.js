import { doc, collection, addDoc, setDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore"; 
import { db } from '.'
import AsyncStorage from "@react-native-async-storage/async-storage"

class HistoryServices {
    static async postHistory({
        levelId, gameId, 
        startTime, endTime, completed, stars, moreInfo
    }) {
        const userId = await AsyncStorage.getItem('user')

        const historyCollectionRef = collection(db, "histories")
        return await addDoc(historyCollectionRef, {
            userId: userId,
            levelId: levelId,
            gameId: gameId,
            startTime: startTime,
            endTime: endTime,
            completed: completed,
            stars: stars,
            moreInfo: moreInfo,
            createdAt: serverTimestamp()
        })
    }

    static async getHistoryByUserId() {
        const userId = await AsyncStorage.getItem('user')
        console.log(userId)
        const q = query(collection(db, "histories"))
        const docs = await getDocs(q)
        const histories = []
        docs.forEach((doc) => {
            histories.push({
                id: doc.id,
                ...doc.data()
            })
        })
        return histories
    }
}

export default HistoryServices