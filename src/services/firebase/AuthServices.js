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
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


//const auth = getAuth(firebaseApp)

class AuthService {
    // Kiểm tra đã đăng nhập chưa
    static checkLoggedIn() {
        return onAuthStateChanged(auth, (user) => {
            console.log(user)
            if (!user) {
                return
            }
            const uid = user.uid
            return uid
        })
    }

    // Đăng ký tài khoản mới
    static async register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            return null
        });
    }

    // Đăng nhập bằng email và mật khẩu
    static async login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            return null
        });
    }

    // Đăng xuất
    static async logout() {
        return await signOut(auth);
    }
}

export default AuthService;
