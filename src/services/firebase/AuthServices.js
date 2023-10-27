import firebaseApp from ".";
import { 
    getAuth,
    //setPersistence,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
//import { ReactNativeAsyncStorage } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});


//const auth = getAuth(firebaseApp)

class AuthService {
    // Kiểm tra đã đăng nhập chưa
    static async checkLoggedIn() {
        try {
            return await AsyncStorage.getItem('user')
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            return null
        }
    }

    // Đăng ký tài khoản mới
    static async register(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user.uid
            console.log(user)
            return user
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            return null
        }
    }

    // Đăng nhập bằng email và mật khẩu
    static async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user.uid
            console.log(user)
            await AsyncStorage.setItem('user', user)
            return user
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            return null
        }
    }

    // Đăng xuất
    static async logout() {
        try {
            await signOut(auth)
            await AsyncStorage.removeItem('user')
            return
        } catch (error) {
            console.log(error)
        }
    }
}

export default AuthService;
