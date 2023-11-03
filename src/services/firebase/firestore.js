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

// LEVEL DATA: CHUNG VÀ RIÊNG (levelContent) CHO CÁC TRÒ CHƠI
// GAME 1: Từ vựng: 1 hình 1 chữ
const levelData_1 = {
    gameId: "1",
    title: "Cái miệng",
    thumbnail_url: "https://nhakhoakim.com/wp-content/uploads/2021/11/con-nguoi-co-bao-nhieu-cai-rang-3.png",
    description: "Mô tả cấp độ",
    category: "Bộ phận cơ thể",
    requireScore: 100,
    limitTime: 60,
    goldReward: 50,
    status: "active",
    levelContent: {
        imageUrl: "",
        videoUrl: "",
        word: {
            audioUrl: "",
            alt: "Cái miệng"
        },
        question: {
            audioUrl: "",
            alt: "Cái miệng của bé dùng để làm gì?"
        },
        answer: {
            audioUrl: "",
            alt: "Miệng dùng để nói"
        },
        help: {
            audioUrl: "",
            alt: "Bé hãy đọc từ 'Cái miệng'"
        },
        tips: {
            audioUrl: "",
            alt: "Miệng của bé cười thật tươi!"
        }
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

// GAME 2: Từ vựng: 1 hình nhiều chữ
const levelData_2 = {
    gameId: "2",
    title: "Cây tre",
    thumbnail_url: "https://img.lovepik.com/free-png/20210926/lovepik-bamboo-green-plant-summer-png-image_401447982_wh1200.png",
    description: "Mô tả cấp độ",
    category: "Cây cối",
    requireScore: 100,
    limitTime: 60,
    goldReward: 50,
    status: "active",
    levelContent: {
        imageUrl: "",
        videoUrl: "",
        word: {
            audioUrl: "",
            alt: "Cây tre"
        },
        question: {
            audioUrl: "",
            alt: "Bé hãy chọn từ đúng?"
        },
        answers: [
            {
                index: 1,
                audioUrl: "",
                alt: "Cây tre"
            },
            {
                index: 2,
                audioUrl: "",
                alt: "Cây dừa"
            },
            {
                index: 3,
                audioUrl: "",
                alt: "Cây mía"
            }
        ],
        correctIndex: 1,
        help: {
            audioUrl: "",
            alt: "Bé hãy đọc từ 'Cây tre'"
        },
        tips: {
            audioUrl: "",
            alt: "Thánh Gióng nhổ tre đánh giặc"
        }
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

// GAME 3: Từ vựng: 1 chữ nhiều hình
const levelData_3 = {
    gameId: "3",
    title: "Cây mía",
    thumbnail_url: "https://img.lovepik.com/free-png/20210926/lovepik-bamboo-green-plant-summer-png-image_401447982_wh1200.png",
    description: "Mô tả cấp độ",
    category: "Cây cối",
    requireScore: 100,
    limitTime: 60,
    goldReward: 50,
    status: "active",
    levelContent: {
        imageUrl: "",
        videoUrl: "",
        word: {
            audioUrl: "",
            alt: "Cây mía"
        },
        question: {
            audioUrl: "",
            alt: "Bé hãy chọn hình đúng?"
        },
        answers: [
            {
                index: 1,
                imageUrl: "https://img.lovepik.com/free-png/20210926/lovepik-bamboo-green-plant-summer-png-image_401447982_wh1200.png",
                audioUrl: "",
                alt: "Cây tre"
            },
            {
                index: 2,
                imageUrl: "https://khuvuonxanh.com/uploads/2022/12/cay-dua-thuoc-loai-cay-than-go-cung-ho-nha-cau.jpg",
                audioUrl: "",
                alt: "Cây dừa"
            },
            {
                index: 3,
                imageUrl: "https://ims.baohoabinh.com.vn/NewsImg/2_2016/96957_IMG_3687.jpg",
                audioUrl: "",
                alt: "Cây mía"
            }
        ],
        correctIndex: 3,
        help: {
            audioUrl: "",
            alt: "Bé hãy đọc từ 'Cây mía'"
        },
        tips: {
            audioUrl: "",
            alt: "Đường làm từ mía thì gọi là đường mía"
        }
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}


// GAME 4: Từ vựng: nhiều chữ nhiều hình

// GAME 5: Câu: 1 hình nhiều câu
const levelData_5 = {
    gameId: "3",
    title: "Đói bụng",
    thumbnail_url: "https://res.cloudinary.com/locobee-cdn/image/upload/f_auto/v1583716801/locobee-hoctiengnhat-tutuongthanh-1_uhpelx.jpg",
    description: "Mô tả cấp độ",
    category: "Cảm xúc",
    requireScore: 100,
    limitTime: 60,
    goldReward: 50,
    status: "active",
    levelContent: {
        imageUrl: "",
        videoUrl: "",
        sentence: {
            audioUrl: "",
            alt: "Mẹ ơi, con muốn ăn ạ!"
        },
        question: {
            audioUrl: "",
            alt: "Khi đói, con sẽ nói gì để được ăn cơm? "
        },
        answers: [
            {
                index: 1,
                audioUrl: "",
                alt: "Ăn cơm, đói bụng!"
            },
            {
                index: 2,
                audioUrl: "",
                alt: "Mẹ ơi, con muốn ăn ạ!"
            },
            {
                index: 3,
                audioUrl: "",
                alt: "Con đói rồi, cho con ăn đi!"
            }
        ],
        correctIndex: 2,
        help: {
            audioUrl: "",
            alt: "Bé hãy đọc câu 'Mẹ ơi, con muốn ăn ạ!'"
        },
        tips: {
            audioUrl: "",
            alt: "Trẻ em phải biết lễ phép với người lớn"
        }
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}


// GAME 6: Câu: Sắp xếp từ trong câu
const levelData_6 = {
    gameId: "6",
    title: "Mẹ ru bé ngủ trưa",
    thumbnail_url: "https://baohaiquanvietnam.vn/storage/users/user_6/N%C4%82M%202023/Th%C3%A1ng%208/7-8/TTLB.png",
    description: "Mô tả cấp độ",
    category: "Gia đình",
    requireScore: 100,
    limitTime: 60,
    goldReward: 50,
    status: "active",
    levelContent: {
        imageUrl: "https://baohaiquanvietnam.vn/storage/users/user_6/N%C4%82M%202023/Th%C3%A1ng%208/7-8/TTLB.png",
        videoUrl: "",
        sentence: {
            audioUrl: "",
            alt: "Mẹ ru bé ngủ trưa"
        },
        question: {
            audioUrl: "",
            alt: "Con hãy sắp xếp các từ cho đúng thứ tự"
        },
        help: {
            audioUrl: "",
            alt: "Ầu ơ dí dầu, con ngủ cho ngoan"
        },
        tips: {
            audioUrl: "",
            alt: "Ầu ơ dí dầu, con ngủ cho ngoan"
        }
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

// GAME 7: Đoạn: Kể chuyện
const levelData_7 = {
    gameId: "7",
    title: "Chim sẻ đi nắng",
    thumbnail_url: "https://i.ibb.co/tPH5cPK/1.jpg",
    description: "Mô tả cấp độ",
    category: "Động vật",
    requireScore: 100,
    limitTime: 60,
    goldReward: 50,
    status: "active",
    levelContent: {
        imageUrl: "",
        videoUrl: "",
        story: [
            {
                index: 1,
                imageUrl: "https://i.ibb.co/tPH5cPK/1.jpg",
                alt: "Cậu bé nhặt được 1 bạn chim sẻ"
            },
            {
                index: 2,
                imageUrl: "https://i.ibb.co/6BC03Vw/2.jpg",
                alt: "Cậu bé mang chim sẻ về nhà"
            },
            {
                index: 3,
                imageUrl: "https://i.ibb.co/Xz7HP7J/3.jpg",
                alt: "Cậu bé cho chim sẻ ăn"
            },
            {
                index: 4,
                imageUrl: "https://i.ibb.co/kSvwMLS/4.jpg",
                alt: "Chim sẻ muốn được chơi cùng các bạn"
            },
            {
                index: 5,
                imageUrl: "https://i.ibb.co/svC3JvV/5.jpg",
                alt: "Cậu bé thả chim sẻ bay đi"
            }
        ],
        question: {
            audioUrl: "",
            alt: "Con hãy sắp xếp các hình cho đúng thứ tự"
        },
        help: {
            audioUrl: "",
            alt: "Bé hãy yêu quý các bạn động vật nhé!"
        },
        tips: {
            audioUrl: "",
            alt: "Bé hãy yêu quý các bạn động vật nhé!"
        }
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

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
      const docRef = doc(db, "levels", "7_1") // 1_1: game1 level1
      await setDoc(docRef, levelData_7)

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