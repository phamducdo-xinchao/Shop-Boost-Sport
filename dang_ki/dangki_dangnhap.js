import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

import { auth, db } from "./firebase.js";

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});


function showToast(message, type) {
    const toast = document.getElementById("toast");
    toast.className = "show " + type;
    toast.innerText = message;

    setTimeout(function () {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

const signUpForm = document.getElementById('signUpForm');

signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('up-name').value;
    const email = document.getElementById('up-email').value;
    const password = document.getElementById('up-password').value;

    try {
        // 1. Tạo user bằng Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Cập nhật tên hiển thị
        await updateProfile(user, { displayName: name });

        // 3. Lưu user vào Firestore
        await setDoc(doc(db, "users", user.uid), {
            username: name,
            email: email,
            createAt: serverTimestamp(),
        });

        showToast("Đăng ký thành công! Hãy đăng nhập.", "success");
        signUpForm.reset();
        signInButton.click();

    } catch (error) {
        console.error("Lỗi đăng ký:", error);

        let message = "Đăng ký thất bại!";
        if (error.code === "auth/email-already-in-use") {
            message = "Email này đã được sử dụng!";
        } else if (error.code === "auth/weak-password") {
            message = "Mật khẩu quá yếu (tối thiểu 6 ký tự).";
        }
        showToast(message, "error");
    }
});


const signInForm = document.getElementById('signInForm');

signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('in-email').value;
    const password = document.getElementById('in-password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        showToast("Đăng nhập thành công! Đang chuyển hướng...", "success");
        localStorage.setItem('adidas_current_user', JSON.stringify({
            name: user.displayName,
            email: user.email,
            uid: user.uid,
        }));

        setTimeout(() => {
            window.location.href = "/index.html";
        }, 1500);

    } catch (error) {
        console.error("Lỗi đăng nhập:", error);

        let message = "Đăng nhập thất bại!";
        if (
            error.code === "auth/user-not-found" ||
            error.code === "auth/wrong-password" ||
            error.code === "auth/invalid-credential"
        ) {
            message = "Email hoặc mật khẩu không đúng!";
        }
        showToast(message, "error");
    }
});