import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import {
  User,
  RegisterUserReqDTO,
  LoginRequestDto,
  LoginResponseDto,
} from "./types";

import Cookies from "js-cookie";

export const registerUserAPI = async ({
  email,
  password,
  name,
  isSeller,
}: RegisterUserReqDTO): Promise<User> => {
  try {
    // Firebase Authentication을 사용하여 사용자 생성
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // 사용자 프로필 업데이트
    await updateProfile(user, { displayName: name });

    // Firestore에 저장할 사용자 정보 생성
    const now = new Date();
    const userData: User = {
      id: user.uid,
      email: email,
      displayName: name,
      isSeller: isSeller,
      createdAt: now,
      updatedAt: now,
    };

    // Firestore에 사용자 정보 저장
    await setDoc(doc(db, "users", user.uid), userData);

    return userData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`회원가입 실패: ${error.message}`);
    }
    throw new Error("회원가입 중 알 수 없는 오류가 발생했습니다.");
  }
};

export const loginAPI = async ({
  email,
  password,
}: LoginRequestDto): Promise<LoginResponseDto> => {
  try {
    // Firebase Authentication을 사용하여 로그인
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();

    Cookies.set("accessToken", token, { expires: 7 });

    // Firestore에서 추가 사용자 정보 가져오기
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      throw new Error("사용자 정보를 찾을 수 없습니다.");
    }

    const userData = userDoc.data() as LoginResponseDto;

    // updatedAt 갱신
    await updateDoc(doc(db, "users", user.uid), {
      updatedAt: new Date(),
    });

    return userData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`로그인 실패: ${error.message}`);
    }
    throw new Error("로그인 중 알 수 없는 오류가 발생했습니다.");
  }
};
