// Firebase 에러 핸들링

// 주어진 에러 메세지가 Firebase 인덱스 에러인지 여부 판단
export const isFirebaseIndexError = (error: string): boolean => {
  return (
    error.includes("The query requires an index") &&
    error.includes("https://console.firebase.google.com")
    // 에러메세지가 문자열, 링크 포함되어 있는지 확인
  );
};
// 인덱스를 요구하는 Firebase 에러일 때 true 반환

// Firebase 인덱스 관련 에러 메세지에서 Firebase Console로 연결되는 URL 추출
export const extractIndexLink = (errorMessage: string): string | null => {
  const match = errorMessage.match(
    /https:\/\/console\.firebase\.google\.com[^\s]+/
  ); // 특정 패턴 URL 찾기
  return match ? match[0] : null;
};
// URL 성공적으로 추출하면 URL 문자열 반환, 매칭되는 URL 없으면 null 반환
