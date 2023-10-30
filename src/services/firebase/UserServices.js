import { doc, collection, addDoc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from '.'

class UserServices {
    static async createUser({ 
        userId, email, phone, birthdate, firstName, lastName, 
        childName, childGender, childBirthdate
    }) {
        const userRef = doc(db, "users", userId)
        return await setDoc(userRef, {
            email: email,
            role: "user", // ["user", "admin", "school", "teacher"]
            phone: phone,
            birthdate: birthdate,
            firstName: firstName,
            lastName: lastName,
            childName: childName,
            childGender: childGender,
            childBirthdate: childBirthdate,
            goldBalance: 0,
            rubyBalance: 0,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        })
    }

    static async updateUser({ 
        userId, phone, birthdate, firstName, lastName, 
        childName, childGender, childBirthdate
    }) {
        const userRef = doc(db, "users", userId)
        return await setDoc(userRef, {
            phone: phone,
            birthdate: birthdate,
            firstName: firstName,
            lastName: lastName,
            childName: childName,
            childGender: childGender,
            childBirthdate: childBirthdate,
            goldBalance: 0,
            rubyBalance: 0,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        }, { merge: true })
    }

    static async getUserById({ userId }) {
        const userRef = doc(db, "users", userId)
        const user = (await getDoc(userRef)).data()

        // Redux yêu cầu state phải có khả năng serialize thành chuỗi JSON
        // Đối tượng Date hoặc timestamp của firebase không thể serialize thành JSON
        // Chuyển thành timestamp unix
        user.createdAt = user.createdAt.seconds*1000
        user.updatedAt = user.updatedAt.seconds*1000
        user.birthdate = user.birthdate.seconds*1000
        user.childBirthdate = user.childBirthdate.seconds*1000
        return user
    }
}

export default UserServices