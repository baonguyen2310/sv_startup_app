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

const auth = getAuth(firebaseApp)

class AuthService {
    // Kiểm tra đã đăng nhập chưa
    static checkLogined() {
        return onAuthStateChanged(auth, (user) => {
            if (!user) {
                return false
            }
            console.log(user.uid)
            return user.uid
        })
    }

    // Đăng ký tài khoản mới
    static async register(email, password) {
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    // Đăng nhập bằng email và mật khẩu
    static async login(email, password) {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    // Đăng xuất
    static async logout() {
        return await signOut(auth);
    }
}

export default AuthService;
