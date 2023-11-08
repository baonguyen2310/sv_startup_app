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
    gameName: "Ôn tập: Vượt chướng ngại vật",
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

// GAME 7: Đoạn: sắp xếp câu chuyện
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

// GAME 9: Đoạn: Thế giới của con
const levelData_9 = {
    gameId: "9",
    title: "Bộ thẻ 1",
    thumbnail_url: "https://i.ibb.co/VLJJHXm/z4848204920169-a691478e4494870db7f32c5d2cdf0784.jpg",
    description: "Mô tả cấp độ",
    category: "Gia đình",
    requireScore: 100,
    limitTime: 60,
    goldReward: 50,
    status: "active",
    levelContent: {
        imageUrl: "https://i.ibb.co/VJytTpV/z4848221696045-c8b2e06019d8299c93e9ec59c5a4047b.jpg",
        videoUrl: "",
        cardSet: {
            context: [
                {
                    imageUrl: "https://i.ibb.co/kB4JvJx/z4848075433010-7099846447d934373661999f68c5b0f5.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/Ny6qYRC/z4848075434472-0fd76e1f40cd327441d68f931a440c6c.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/0VN2nRM/z4848075440023-0aae97ec1ced064598f58d5e6fa2b975.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/TkQyqKn/z4848075454408-d512849d0d9adf99168adca8c87b82c9.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/YRkD8cz/z4848075459187-8e7d12267c21dffa6a96f40feb18a94b.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/ZcGBnpk/z4848075459897-b1dbc4d1396cdc29484bfad696b838d0.jpg",
                    alt: "",
                    audioUrl: ""
                }    
            ],
            main: [
                {
                    imageUrl: "https://i.ibb.co/Mph2ctv/z4848085539181-d188e576f01090ccbd59977dc612ecdb.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/vZS8cfg/z4848085557010-9ff51d984dc012eb06738e7b595ed838.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/YjRzmp5/z4848085560006-d4299bf63591edb1c678ec573aec7428.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/GWS5xR5/z4848085564275-e44915814b2452c2dd3f95790877b562.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/6sswbS8/z4848085564889-fb67b61f4a19858e74574b940d78997d.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/gVRDy7X/z4848085566965-7fcb466bd2b5dddca57c4601387910b2.jpg",
                    alt: "",
                    audioUrl: ""
                }    
            ],
            sub: [
                {
                    imageUrl: "https://i.ibb.co/7zkQJ5V/z4848093152259-0b393d5f7564258692637714139e525f.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/m6WmYgc/z4848093169652-7977a533c467016c4a23a599e20414f2.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/161JxKx/z4848093171367-96e5aa41b36503a95a08b0de45b20e31.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/swJ9dZf/z4848093179395-7379c6dd22eabc9dcbf0ac3f1d06c6a3.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/6mZJnGB/z4848093178092-81cec955d3b236f2cdf0f53054265b5d.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/gyj9cZ5/z4848093181060-fb010e5f5b2691a84d833596765a311a.jpg",
                    alt: "",
                    audioUrl: ""
                }    
            ],
            tool: [
                {
                    imageUrl: "https://i.ibb.co/6rVDLdw/z4848094400777-71b296e42f62850c2132ed646966b9fb.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/fH1zWwW/z4848094413027-eef1a2ba2e455890c9861ee3a7330c66.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/XtgpsTs/z4848094413134-5c7a442fcb092626bd4e9895f1b8928b.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/wrhGBFY/z4848094415067-617d611fd3e0cea079fb527706ba7a04.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/vqcyfXF/z4848094428341-926ed36a761c6ee701282d32f86317e7.jpg",
                    alt: "",
                    audioUrl: ""
                },
                {
                    imageUrl: "https://i.ibb.co/G2qgM6m/z4848094435286-2b1b2bb347f3ad44df4041396e15568a.jpg",
                    alt: "",
                    audioUrl: ""
                }    
            ]
        },
        guide: [
            {
                audioUrl: "",
                alt: "Bé hãy chọn 1 bối cảnh!"
            },
            {
                audioUrl: "",
                alt: "Bé hãy chọn 1 nhân vật chính!"
            },
            {
                audioUrl: "",
                alt: "Bé hãy chọn 1 nhân vật phụ!"
            },
            {
                audioUrl: "",
                alt: "Bé hãy chọn 1 vật dụng!"
            },
            {
                audioUrl: "",
                alt: "Bé hãy tự sáng tạo câu chuyện của mình!"
            }
        ],
        help: [
            {
                audioUrl: "",
                alt: "Bé hãy tự sáng tạo câu chuyện của mình!"
            }
        ],
        tips: [
            {
                audioUrl: "",
                alt: "Bé hãy tự sáng tạo câu chuyện của mình!"
            }
        ]
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

// GAME 10: Đoạn: Thế giới truyện tranh
const levelData_10 = {
    gameId: "10",
    title: "Cô bé quàng khăn đỏ",
    thumbnail_url: "https://i.ibb.co/jwv0XgV/z4848355510882-761a0b604b4205555945f13f466c44d8.jpg",
    description: "Mô tả cấp độ",
    category: "Gia đình",
    requireScore: 100,
    limitTime: 60,
    goldReward: 50,
    status: "active",
    levelContent: {
        imageUrl: "https://i.ibb.co/jM5CFg0/z4848375029952-6d14e3f17b0cf3aeab8e73bcd8581c3d.jpg",
        videoUrl: "",
        story: {
            picture_story: [
                {
                    index: 1,
                    imageUrl: "https://i.ibb.co/kBNcHnm/1.jpg",
                    audioUrl: "",
                    text: "Ngày xửa, ngày xưa, có một cô bé thường hay quàng chiếc khăn màu đỏ, vì vậy, mọi người gọi cô là cô bé quàng khăn đỏ. Một hôm, mẹ cô bảo cô mang bánh sang biếu bà ngoại. Trước khi đi, mẹ cô dặn: Con đi thì đi đường thẳng, đừng đi đường vòng qua rừng mà chó sói ăn thịt con đấy."
                },
                {
                    index: 2,
                    imageUrl: "https://i.ibb.co/y0HMnW5/2.jpg",
                    audioUrl: "",
                    text: "Đi được một quãng thì gặp Sóc, Sóc nhắc: Cô bé quàng khăn đỏ ơi, lúc nãy tôi nghe mẹ cô dặn đi đường thẳng, đừng đi đường vòng cơ mà. Sao cô lại đi đường này?   Cô bé không trả lời Sóc. Cô cứ đi theo đường vòng qua rừng. Vừa đi, cô vừa hái hoa, bắt bướm"
                },
                {
                    index: 3,
                    imageUrl: "https://i.ibb.co/VtbSK6F/3.jpg",
                    audioUrl: "",
                    text: "Vào đến cửa rừng thì cô gặp chó sói. Con chó sói rất to đến trước mặt cô. Nó cất giọng ồm ồm hỏi: Này, cô bé đi đâu thế?Nghe chó sói hỏi, cô bé quàng khăn đỏ sợ lắm, nhưng cũng đành bạo dạn trả lời: Tôi đi sang nhà bà ngoại tôi."
                },
                {
                    index: 4,
                    imageUrl: "https://i.ibb.co/q00pDTd/4.jpg",
                    audioUrl: "",
                    text: "Nghe cô bé nói đi sang bà ngoại, chó sói nghĩ bụng: À, thì ra nó lại còn có bà ngoại nữa, thế thì mình phải ăn thịt cả hai bà cháu. Nghĩ vậy nên chó sói lại hỏi: Nhà bà ngoại cô ở đâu? Ở bên kia khu rừng. Cái nhà có ống khói đấy, cứ đẩy cửa là vào được ngay."
                },
                {
                    index: 5,
                    imageUrl: "https://i.ibb.co/HgGLW5w/5.jpg",
                    audioUrl: "",
                    text: "Nghe xong, chó sói bỏ cô bé quàng khăn đỏ ở đấy rồi chạy một mạch đến nhà bà ngoại cô bé. Nó đẩy cửa vào vồ lấy bà cụ rồi nuốt chửng ngay vào bụng. Xong xuôi, nó lên giường nằm đắp chăn giả là bà ngoại ốm. Lúc cô bé quàng khăn đỏ đến, cô thấy chó sói đắp chăn nằm trên giường, cô tưởng “bà ngoại” bị ốm thật, cô hỏi: Bà ơi! Bà ốm đã lâu chưa? Sói không đáp giả vờ rên hừ… hừ… Bà ơi, mẹ cháu bảo mang bánh sang biếu bà. Thế à, thế thì bà cám ơn cháu và mẹ cháu. Cháu ngoan quá. Cháu lại đây với bà. Cô bé quàng khăn đỏ chạy ngay đến cạnh giường, nhưng cô ngạc nhiên lùi lại hỏi; – Bà ơi! Sao hôm nay tai bà dài thế? Tai bà dài để bà nghe cháu nói được rõ hơn. Chó sói đáp Thế còn mắt bà, sao hôm nay mắt bà to thế? Mắt bà to để bà nhìn cháu được rõ hơn. Chưa tin, cô bé quàng khăn đỏ lại hỏi: Thế còn mồm bà, sao hôm nay mồm bà to thế? Mồm bà to để bà ăn thịt cháu đấy. Sói nói xong liền nhảy ra khỏi giường, nuốt chửng em bé Khăn Đỏ đáng thương."
                },
                {
                    index: 6,
                    imageUrl: "https://i.ibb.co/HgGLW5w/5.jpg",
                    audioUrl: "",
                    text: "Sói đã no nê lại nằm xuống giường ngủ ngáy o o. May sao, lúc đó bác thợ săn đi ngang thấy thế. Bác giơ súng lên định bắn. Nhưng bác chợt nghĩ ra là chắc sói đã ăn thịt bà lão, và tuy vậy vẫn còn có cơ cứu bà. Bác nghĩ không nên bắn mà nên lấy kéo rạch bụng con sói đang ngủ ra. Vừa rạch được vài mũi thì thấy chiếc khăn quàng đỏ chóe, rạch được vài mũi nữa thì cô bé nhảy ra kêu: Trời ơi! Cháu sợ quá! Trong bụng sói, tối đen như mực. Bà lão cũng còn sống chui ra, thở hổn hển. Khăn đỏ vội đi nhặt đá to nhét đầy bụng sói. Sói tỉnh giấc muốn nhảy lên, nhưng đá nặng quá, nó ngã khuỵu xuống, lăn ra chết. Từ dạo ấy, cô bé quàng khăn đỏ không bao giờ dám làm sai lời mẹ dặn."
                }
            ],
            map_story: [
                {
                    index: 1,
                    imageUrl: "",
                    audioUrl: "",
                    text: "Một ngày"
                },
                {
                    index: 2,
                    imageUrl: "https://i.ibb.co/WsxsBwP/co-kha-n-o.jpg",
                    audioUrl: "",
                    text: "Cô bé quàng khăn đỏ"
                },
                {
                    index: 3,
                    imageUrl: "",
                    audioUrl: "",
                    text: "được mẹ"
                },
                {
                    index: 4,
                    imageUrl: "https://i.ibb.co/MSS4H4j/gio-qua.jpg",
                    audioUrl: "",
                    text: "nhờ mang giỏ táo"
                },
                {
                    index: 5,
                    imageUrl: "",
                    audioUrl: "",
                    text: "sang cho"
                },
                {
                    index: 6,
                    imageUrl: "https://i.ibb.co/3MZsftL/ba.jpg",
                    audioUrl: "",
                    text: "bà"
                },
                {
                    index: 7,
                    imageUrl: "",
                    audioUrl: "",
                    text: "vì bà bị ốm nặng."
                }
            ]
        },
        questions: [
            {
                audioUrl: "",
                alt: "Con có yêu bà không?"
            }, 
            {
                audioUrl: "",
                alt: "Con đã giúp bà được những việc gì nào?"
            }
        ],
        guide: [
            {
                audioUrl: "",
                alt: "Con ạ, có một cô bé được mẹ giao nhiệm vụ mang bánh đến thăm bà nhưng cô bé không nghe lời mẹ dặn nên chút nữa là bị chó sói ăn thịt đấy. Vậy câu chuyện xảy ra như thế nào thì chúng ta cùng đến với câu chuyện “Cô bé quàng khăn đỏ” nhé!"
            }, 
            {
                audioUrl: "",
                alt: "Qua câu chuyện này, bé cần phải biết nghe lời của ông bà cha mẹ, không được đi la cà, phải biết yêu thương ông bà, cha mẹ của mình nhiều hơn nhé!"
            }, 
            {
                audioUrl: "",
                alt: "Bạn Sóc Nâu muốn nghe lại câu chuyện ấy, bé hãy kể lại cho bạn Sóc Nâu nghe nào!"
            }
        ],
        help: [
            {
                audioUrl: "",
                alt: "Bé hãy yêu quý ông bà nhé!"
            }
        ],
        tips: [
            {
                audioUrl: "",
                alt: "Bé hãy yêu quý ông bà nhé!"
            }
        ]
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
}

// GAME 11: Đoạn: Kể chuyện sáng tạo theo tranh
const levelData_11 = {
    gameId: "11",
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
      //const docRef = doc(db, "games", "17")
      //await setDoc(docRef, gameData)
      //const docRef = await addDoc(collection(db, "games"), gameData)
      //const docRef = await addDoc(collection(db, "levels"), levelData)
      const docRef = doc(db, "levels", "11_1") // 1_1: game1 level1
      await setDoc(docRef, levelData_11)

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