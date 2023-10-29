import { doc, collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore"; 
import { db } from '.'

// firebase auth sẽ quản lý tài khoản người dùng để xác thực
// firestore sẽ quản lý 1 bảng user chứa thông tin của người dùng
// id của user trong firestore và firebase giống nhau để dễ truy vấn

const premiumPackageData = {
    packageName: "Premium Tháng",
    description: "Unlock toàn bộ game trong 1 tháng",
    price: 9.99,
    currency: "USD",
    durationInDays: 30,
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const purchasePackageData = {
    packageName: "Thành viên mới",
    description: "Gói ưu đãi dành cho thành viên mới",
    price: 0.99,
    currency: "USD",
    status: "active",
    goldAmount: 1000,
    rubyAmount: 50,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const userData = {
    username: "test",
    password: "test",
    role: "user", // ["user", "admin", "school", "teacher"]
    email: "test@gmail.com",
    phone: "0123456789",
    birthdate: new Date("1980-1-1"),
    firstname: "Adam",
    lastname: "Sandler",
    childName: "Bubu",
    childBirthDate: new Date("2020-1-1"),
    goldBalance: 0,
    rubyBalance: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const usersCollectionRef = collection(db, "users")
//const userDocRef = doc(db, "users", "xUau0qGPhhWkMzvSvlO2")

const premiumPackagesCollectionRef = collection(db, "premiumPackages")
//const premiumPackageDocRef = doc(db, "premiumPackages", "0mdV3vsvnpuaxXjaGi7n")

const userPremiumPackageData = {
    userId: doc(usersCollectionRef, "xUau0qGPhhWkMzvSvlO2"),
    premiumPackageId: doc(premiumPackagesCollectionRef, "0mdV3vsvnpuaxXjaGi7n"),
    startDate: new Date("2023-1-1 00:00:00"),
    endDate: new Date("2023-2-1 00:00:00"),
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const gameData = {
    gameName: "Test",
    description: "test",
    thumbnail_url: "",
    status: "active", // ["active", "deleted", "beta"]
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const gamesCollectionRef = collection(db, "games")

const levelData = {
    gameId: doc(gamesCollectionRef, "tGJLc0GyUVcDdpbZsTaF"),
    levelName: "1",
    description: "Mô tả cấp độ",
    requireScore: 100,
    limitTime: 60,
    goldReward: 50,
    status: "active",
    levelContent: {
        word: "con mèo",
        imageUrl: "",
        audioUrl: "",
        videoUrl: ""
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const levelsCollectionRef = collection(db, "levels")

const unlockMethodData = {
    levelId: doc(levelsCollectionRef, "XSkpAx1EFIdoGb8QuPtc"),
    method: "gold", // ["gold", "ruby"]
    amount: 10,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const userLevelUnlockedData = {
    userId: doc(usersCollectionRef, "xUau0qGPhhWkMzvSvlO2"),
    levelId: doc(levelsCollectionRef, "XSkpAx1EFIdoGb8QuPtc"),
    status: "unlocked",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const premiumTransactionData = {
    userId: doc(usersCollectionRef, "xUau0qGPhhWkMzvSvlO2"),
    premiumPackageId: doc(premiumPackagesCollectionRef, "0mdV3vsvnpuaxXjaGi7n"),
    amount: 9.99,
    currency: "USD",
    paymentMethod: "Google Pay", // ["Credit Card", "PayPal"]
    transactionStatus: "completed", // ["completed", "pending"]
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const purchasePackagesCollectionRef = collection(db, "purchasePackages")

const purchaseTransactionData = {
    userId: doc(usersCollectionRef, "xUau0qGPhhWkMzvSvlO2"),
    premiumPackageId: doc(purchasePackagesCollectionRef, "xnYzw6ybNjI23rZDZHOM"),
    amount: 0.99,
    currency: "USD",
    paymentMethod: "Google Pay",
    transactionStatus: "completed",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const userLevelArchieveData = {
    userId: doc(usersCollectionRef, "xUau0qGPhhWkMzvSvlO2"),
    levelId: doc(levelsCollectionRef, "XSkpAx1EFIdoGb8QuPtc"),
    isCompleted: false,
    bestScore: null,
    bestTime: null,
    hasReceivedReward: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const userLevelHistoryData = {
    userId: doc(usersCollectionRef, "xUau0qGPhhWkMzvSvlO2"),
    levelId: doc(levelsCollectionRef, "XSkpAx1EFIdoGb8QuPtc"),
    startTime: new Date("2023-1-1 06:00:00"),
    endTime: new Date("2023-1-1 06:00:45"),
    score: 100,
    playResult: "completed", // ["Win", "Lose", "Incomplete"]
    additionalInfo: "Thông tin bổ sung",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const notificationData = {
    userId: doc(usersCollectionRef, "xUau0qGPhhWkMzvSvlO2"),
    title: "Thông báo",
    message: "Nội dung thông báo",
    isRead: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const surveyQuestionData = {
    question: "Nội dung câu hỏi",
    answers: ["A", "B", "C"],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const surveyQuestionsCollectionRef = collection(db, "surveyQuestions")

const surveyResponseData = {
    userId: doc(usersCollectionRef, "xUau0qGPhhWkMzvSvlO2"),
    questionId: doc(surveyQuestionsCollectionRef, "QewKYtbW7o7oeCI6vBhQ"),
    answer: "B",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const proposedPlayScheduleData = {
    userId: doc(usersCollectionRef, "xUau0qGPhhWkMzvSvlO2"),
    levelId: doc(levelsCollectionRef, "XSkpAx1EFIdoGb8QuPtc"),
    proposedDate: new Date("2023-12-12"),
    recommendedPlayTimes: 3,
    recommendedScore: 100,
    description: "Mô tả",
    isCompleted: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

export async function createDatabase() {
    try {
      //const docRef = await addDoc(collection(db, "premiumPackages"), premiumPackageData)
      //const docRef = await addDoc(collection(db, "purchasePackages"), purchasePackageData)
      //const docRef = await addDoc(collection(db, "users"), userData)
      //const docRef = await addDoc(collection(db, "userPremiumPackage"), userPremiumPackageData)
      //const docRef = await addDoc(collection(db, "games"), gameData)
      //const docRef = await addDoc(collection(db, "levels"), levelData)
      //const docRef = await addDoc(collection(db, "unlockMethod"), unlockMethodData)
      //const docRef = await addDoc(collection(db, "userLevelUnlocked"), userLevelUnlockedData)
      //const docRef = await addDoc(collection(db, "premiumTransaction"), premiumTransactionData)
      //const docRef = await addDoc(collection(db, "purchaseTransaction"), purchaseTransactionData)
      //const docRef = await addDoc(collection(db, "userLevelArchieve"), userLevelArchieveData)
      //const docRef = await addDoc(collection(db, "userLevelHistory"), userLevelHistoryData)
      //const docRef = await addDoc(collection(db, "notifications"), notificationData)
      //const docRef = await addDoc(collection(db, "surveyQuestions"), surveyQuestionData)
      //const docRef = await addDoc(collection(db, "surveyResponse"), surveyResponseData)
      //const docRef = await addDoc(collection(db, "proposedPlaySchedule"), proposedPlayScheduleData)
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}