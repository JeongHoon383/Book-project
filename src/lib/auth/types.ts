// User 인터페이스: 데이터베이스에 저장되는 사용자 정보
export interface User {
  id: string; // Unique identifier
  email: string;
  isSeller: boolean;
  displayName: string;
  createdAt: Date;
  updatedAt: Date;
}

// RegisterUserReqDTO: 회원가입 요청 시 클라이언트가 서버로 보내는 데이터
export interface RegisterUserReqDTO {
  email: string;
  password: string;
  name: string;
  isSeller: boolean;
}

// LoginRequestDto: 로그인 요청 시 클라이언트가 서버로 보내는 데이터
export interface LoginRequestDto {
  email: string;
  password: string;
}

// LoginResponseDto: 로그인 성공 시 서버가 클라이언트로 보내는 데이터
export interface LoginResponseDto {
  uid: string;
  email: string;
  displayName: string; // optional 제거
  accessToken: string;
  isSeller: boolean;
}
