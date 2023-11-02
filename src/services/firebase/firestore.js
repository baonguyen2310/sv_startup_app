import { doc, collection, addDoc, setDoc, getDocs, serverTimestamp } from "firebase/firestore"; 
import { db } from '.'

// firebase auth sẽ quản lý tài khoản người dùng để xác thực
// firestore sẽ quản lý 1 bảng user chứa thông tin của người dùng
// id của user trong firestore và firebase giống nhau để dễ truy vấn

const premiumPackageData = {
    packageName: "Premium Năm",
    description: "Unlock toàn bộ game trong 1 năm",
    price: 29.99,
    currency: "USD",
    durationInDays: 365,
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const purchasePackageData = {
    packageName: "Halloween",
    description: "Gói ưu đãi Halloween",
    price: 1.99,
    currency: "USD",
    status: "active",
    goldAmount: 3000,
    rubyAmount: 100,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const userData = {
    username: "test2",
    password: "test2",
    role: "user", // ["user", "admin", "school", "teacher"]
    email: "test2@gmail.com",
    phone: "01234567892",
    birthdate: new Date("1980-1-1"),
    firstname: "Adam2",
    lastname: "Sandler2",
    childName: "ChipChip",
    childGender: "Female",
    childBirthDate: new Date("2021-1-1"),
    goldBalance: 0,
    rubyBalance: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const userPremiumPackageData = {
    userId: "PkyxHxqDr558c97VAsLN",
    premiumPackageId: "0mdV3vsvnpuaxXjaGi7n",
    startDate: new Date("2023-10-1 00:00:00"),
    endDate: new Date("2023-11-1 00:00:00"),
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const gameData = {
    gameName: "Đoạn: Hội thoại tự do",
    description: "Mô tả trò chơi",
    thumbnail_url: "https://i.ibb.co/NpYLSPr/game-3-thumbnail.jpg",
    status: "active", // ["active", "deleted", "beta"]
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

// LEVEL DATA
// GAME 1: 
const levelData_1 = {
    gameId: "1",
    description: "Mô tả cấp độ",
    requireScore: 100,
    limitTime: 60,
    goldReward: 50,
    status: "active",
    levelContent: {
        imageUrl: "",
        videoUrl: "",
        word: {
            audioUrl: "",
            alt: "Hàm răng"
        },
        question: {
            audioUrl: "",
            alt: "Hàm răng của bé dùng để làm gì?"
        },
        answer: {
            audioUrl: "",
            alt: "Răng dùng để nhai"
        },
        help: {
            audioUrl: "",
            alt: "Bé hãy đọc từ 'Hàm răng'"
        },
        tips: {
            audioUrl: "",
            alt: "Ăn kẹo sẽ bị sâu răng. Bé hãy vệ sinh răng miệng mỗi ngày vào buổi sáng khi thức dậy và buổi tối trước khi đi ngủ."
        }
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

// GAME 2: 

const unlockMethodData = {
    levelId: "XSkpAx1EFIdoGb8QuPtc",
    method: "gold", // ["gold", "ruby"]
    amount: 10,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const userLevelUnlockedData = {
    userId: "xUau0qGPhhWkMzvSvlO2",
    levelId: "XSkpAx1EFIdoGb8QuPtc",
    status: "unlocked",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const premiumTransactionData = {
    userId: "xUau0qGPhhWkMzvSvlO2",
    premiumPackageId: "0mdV3vsvnpuaxXjaGi7n",
    amount: 9.99,
    currency: "USD",
    paymentMethod: "Google Pay", // ["Credit Card", "PayPal"]
    transactionStatus: "completed", // ["completed", "pending"]
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const purchaseTransactionData = {
    userId:  "xUau0qGPhhWkMzvSvlO2",
    premiumPackageId: "xnYzw6ybNjI23rZDZHOM",
    amount: 0.99,
    currency: "USD",
    paymentMethod: "Google Pay",
    transactionStatus: "completed",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const userLevelArchieveData = {
    userId:  "xUau0qGPhhWkMzvSvlO2",
    levelId: "XSkpAx1EFIdoGb8QuPtc",
    isCompleted: false,
    bestScore: null,
    bestTime: null,
    hasReceivedReward: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const userLevelHistoryData = {
    userId: "xUau0qGPhhWkMzvSvlO2",
    levelId: "XSkpAx1EFIdoGb8QuPtc",
    startTime: new Date("2023-1-1 06:00:00"),
    endTime: new Date("2023-1-1 06:00:45"),
    score: 100,
    playResult: "completed", // ["Win", "Lose", "Incomplete"]
    additionalInfo: "Thông tin bổ sung",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const notificationData = {
    userId: "xUau0qGPhhWkMzvSvlO2",
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

const surveyResponseData = {
    userId: "xUau0qGPhhWkMzvSvlO2",
    questionId: "QewKYtbW7o7oeCI6vBhQ",
    answer: "B",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

const proposedPlayScheduleData = {
    userId: "xUau0qGPhhWkMzvSvlO2",
    levelId: "XSkpAx1EFIdoGb8QuPtc",
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
      //const docRef = doc(db, "games", "8")
      //await setDoc(docRef, gameData)
      //const docRef = await addDoc(collection(db, "games"), gameData)
      //const docRef = await addDoc(collection(db, "levels"), levelData)
      const docRef = doc(db, "levels", "1_2") // 1_1: game1 level1
      await setDoc(docRef, levelData_1)

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