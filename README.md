# 경향문고

**프로젝트 소개**

도서를 판매, 구매를 할 수 있는 커머스 플랫폼 입니다.

**프로젝트 진행기간**

2024.10 ~ 2024.11 (4주)

**프로젝트 배포링크**

- 배포링크

**테스트 계정**

> 구매자  
> ID:buyer@test.com  
> PW:123123!!
>
> 판매자  
> ID:seller@test.com  
> PW:123123!!

## 📖 실행방법

1. 레포지토리 복제 후 의존성 설치

```bash
$ git clone https://github.com/JeongHoon383/Book-project.git
$ cd book-project
$ npm install
```

2. 개발 서버 가동

```bash
$ npm run dev
```

3. 브라우저에서 실행

```bash
http://localhost:5173/
```

## 🚀 기술스택

![ts](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![react](https://img.shields.io/badge/React-87CEEB?style=for-the-badge&logo=react&logoColor=FFFFFF&color=87CEEB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

![react](https://img.shields.io/badge/zustand-87CEEB?style=for-the-badge&logo=react&logoColor=FFFFFF&color=1D4CC9)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)

![Firebase](https://img.shields.io/badge/firebase-FFCA26.svg?style=for-the-badge&logo=firebase&logoColor=FFFFFF&color=FFCA26)

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## ⚙️ 주요기능

**토글을 열면 시연영상을 확인하실 수 있습니다**

<details>
<summary>
  <strong>로그인 / 회원가입</strong>
</summary>
  <br>
  <p><strong>로그인</strong></p>
<img src="https://github.com/user-attachments/assets/87b1b8bb-734b-4aaa-952a-c0e8c274eef7" alt="로그인" width="700"/>
  <p><strong>회원가입</strong></p>
<img src="https://github.com/user-attachments/assets/c6b89b23-3a8a-4bdc-84d2-cdc077a105f0" alt="회원가입" width="700"/> 
</details>

- 폼 유효성 검사
- 로그인 후 전역상태 및 로컬스토리지로 회원정보 관리

<details>
<summary>
  <strong>전체 상품 조회</strong>
</summary>
  <br>
  <p><strong>전체 상품 - 결과 필터링, 무한스크롤</strong></p>
  <img src="https://github.com/user-attachments/assets/fc1f7af6-388f-4a78-868f-513beb344c7b" width="700"/>
</details>

- 카테고리, 검색어, 정렬 옵션에 따른 조회 결과 필터링 기능
- 무한스크롤을 활용한 페이지네이션

<details>
<summary>
  <strong>상품 상세 조회</strong>
</summary>
  <br>
   <p><strong>상품 상세정보</strong></p>
  <img src="https://github.com/user-attachments/assets/c7a0d8f8-d10b-46f2-b9e1-aa789918854a" width="700"/>
  <p><strong>상품 상세정보 - 캐러셀</strong></p>
  <img src="https://github.com/user-attachments/assets/90b0637a-c92f-4b68-8f57-dae9c06eeb7f" width="700"/>
</details>

- 상품 내용 및 장바구니 추가 혹은 상품 바로구매
- 해당 상품 카테고리와 동일한 카테고리 상품 추천

<details>
<summary>
  <strong>[구매자] 장바구니</strong>
</summary>
  <br>
   <p><strong>장바구니 - 수량 변경, 상품 삭제</strong></p>
  <img src="https://github.com/user-attachments/assets/7e11baa9-2304-4e57-b188-0878d6d9e3c5" width="700"/>
</details>

- 장바구니 상품 수량 수정 및 삭제 기능
- 재고보다 더 추가할 경우 추가 불가 및 안내문구
- 선택한 상품 금액 및 개수 계산

<details>
<summary>
  <strong>[구매자] 선택 상품 주문</strong>
</summary>
  <br>
   <p><strong>주문 - 배송 정보 입력, 결제</strong></p>
  <img src="https://github.com/user-attachments/assets/816595cb-b15c-4bb2-a6d0-153862a852b7" width="700"/>
</details>

- 폼 유효성 검사
- 주문한 상품 금액 계산
- 주문시 상품 재고 감소, 품절된 상품 예외처리

<details>
<summary>
  <strong>[구매자] 주문 내역 조회 및 주문 취소</strong>
</summary>
  <br>
   <p><strong>주문 내역 - 주문 취소, 상품 재고 복구</strong></p>
  <img src="https://github.com/user-attachments/assets/9cbb46a1-ee41-4da5-932e-59be49d7137d" width="700"/>
</details>

- 날짜별 주문 내역 조회 및 정렬 기능
- 상품별 주문 취소 기능
- 주문 취소시 해당 상품 재고 복구

<details>
<summary>
  <strong>[판매자] 판매 상품 관리</strong>
</summary>
  <br>
  <p><strong>판매 관리 - 상품 등록</strong></p>
  <img src="https://github.com/user-attachments/assets/023d5a54-415a-48c6-9451-f120a50dd262" width="700"/>
  <p><strong>판매 관리 - 상품 수정, 삭제</strong></p>
  <img src="https://github.com/user-attachments/assets/74fce244-8b33-46d8-86d1-f150d896d850" width="700"/>
</details>

- 판매 상품 조회, 등록, 수정, 삭제 기능
- 상품 정렬, 무한스크롤 기능

## 🔥 성능 최적화

- [웹 성능을 위한 이미지 최적화(webP)](https://velog.io/@wjdgns383/%EC%9B%B9-%EC%84%B1%EB%8A%A5%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%B5%9C%EC%A0%81%ED%99%94webP)
- 설명2

## 💡 트러블 슈팅

- [캐러셀 컴포넌트 반응형 커스텀마이징 이슈 해결](https://velog.io/@wjdgns383/%EC%BA%90%EB%9F%AC%EC%85%80-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%B0%98%EC%9D%91%ED%98%95-%EC%BB%A4%EC%8A%A4%ED%85%80%EB%A7%88%EC%9D%B4%EC%A7%95-%EC%9D%B4%EC%8A%88-%ED%95%B4%EA%B2%B0)
- [사용자 권한 관리 및 상태 유지 이슈 해결](https://velog.io/@wjdgns383/%EC%82%AC%EC%9A%A9%EC%9E%90-%EA%B6%8C%ED%95%9C-%EA%B4%80%EB%A6%AC-%EB%B0%8F-%EC%83%81%ED%83%9C-%EC%9C%A0%EC%A7%80-%EC%9D%B4%EC%8A%88-%ED%95%B4%EA%B2%B0)

## 🛠️ 기술적 의사 결정

- [Zustand를 사용하여 동적으로 주문페이지 관리](https://velog.io/@wjdgns383/Zustand%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EB%8F%99%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%A3%BC%EB%AC%B8%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B4%80%EB%A6%AC)
- 설명2

## 🏗️ 아키텍처

<img src="https://github.com/user-attachments/assets/88ded67a-88a7-470f-987d-46b54505af0e" width="1000"/>

## 🗂️ 폴더구조

```bash
📦src
 ┣ 📂components
 ┃ ┗ 📂ui
 ┣ 📂helpers
 ┣ 📂hooks
 ┣ 📂lib
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜api.ts
 ┃ ┃ ┗ 📜types.ts
 ┃ ┣ 📂product
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜api.ts
 ┃ ┃ ┣ 📜key.ts
 ┃ ┃ ┗ 📜types.ts
 ┃ ┣ 📂purchase
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜api.ts
 ┃ ┃ ┣ 📜key.ts
 ┃ ┃ ┗ 📜types.ts
 ┃ ┣ 📂utils
 ┃ ┗ 📜utils.ts
 ┣ 📂pages
 ┃ ┣ 📂common
 ┃ ┃ ┗ 📂components
 ┃ ┣ 📂error
 ┃ ┃ ┗ 📂components
 ┃ ┣ 📂home
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂loading
 ┃ ┃ ┗ 📂components
 ┃ ┣ 📂login
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂productDetail
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂productManagement
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂purchase
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂purchaseHistory
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂register
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📜.DS_Store
 ┣ 📂store
 ┃ ┣ 📂auth
 ┃ ┣ 📂cart
 ┃ ┣ 📂filter
 ┃ ┣ 📂order
 ┃ ┣ 📂product
 ┃ ┣ 📂toast
 ┣ 📂utils
 ┣ 📜apiRoutes.ts
 ┣ 📜constants.ts
 ┣ 📜firebase.ts
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┣ 📜router.tsx
 ┗ 📜vite-env.d.ts
```

<details>
<summary>
  <strong>폴더 구조 분석</strong>
</summary>

<details>
<summary>components</summary>

- **역할**: 재사용 가능한 UI 컴포넌트를 관리하는 폴더 (shadcn 기반)
- **하위 구조**:
  - `ui/`: 버튼, 입력 필드, 모달 등 범용적인 UI 요소를 저장
- **특징**:
  - 도메인에 종속되지 않는 공통 컴포넌트들을 모아, 다양한 페이지나 기능에서 재사용 가능

</details>

<details>
<summary>helpers</summary>

- **역할**: 특정 작업을 돕는 유틸리티 함수들을 저장
- **예상 파일 내용**:
  - 에러 처리, 데이터 포맷 변환, 공통 로직 등
- **특징**:
  - 코드 중복을 줄이고, 비즈니스 로직을 단순화

</details>

<details>
<summary>hooks</summary>

- **역할**: React의 상태 관리 및 라이프사이클 관련 커스텀 훅 저장
- **예상 파일 내용**:
  - `useModal`: 모달 열기/닫기 상태 관리
  - `useAddToCart`: 장바구니 추가 로직
- **특징**:
  - 재사용 가능한 상태 관리 로직을 추상화하여 코드 가독성과 재사용성을 높임

</details>

<details>
<summary>lib</summary>

- **역할**: 도메인별 로직(인증, 제품, 구매)을 캡슐화
- **하위 구조**:
  - **auth** (인증 관련 로직)
    - `hooks/`: 로그인, 회원가입 등 인증 커스텀 훅
    - `api.ts`: 인증 관련 API 호출 함수
    - `types.ts`: 인증 데이터 모델 정의
  - **product** (제품 관리 로직)
    - `hooks/`: 제품 데이터 조회, 추가, 삭제, 업데이트 커스텀 훅
    - `api.ts`: 제품 CRUD 관련 API 호출 함수
    - `key.ts`: React Query 쿼리 키 관리
    - `types.ts`: 제품 데이터 모델 정의
  - **purchase** (구매 관리 로직)
    - `hooks/`: 구매 요청, 구매 데이터 조회, 구매 취소 로직
    - `api.ts`: 구매 관련 API 호출 함수
    - `key.ts`: React Query 쿼리 키 관리
    - `types.ts`: 구매 데이터 모델 정의
  - **utils**
    - **역할**: 도메인 전반에 걸친 유틸리티 함수 관리
    - 예: 이미지 업로드, 공통 데이터 처리 로직

</details>

<details>
<summary>pages</summary>

- **역할**: 프로젝트의 페이지별 구조 관리
- **하위 구조**:
  - **common/components**: 공통적으로 사용되는 페이지 관련 컴포넌트(`Navbar`, `Toast` 등)
  - **error**: 에러 페이지 및 관련 컴포넌트(`ErrorPage`, `NotFoundPage` 등)
  - **home**: 홈 페이지와 관련된 컴포넌트와 엔트리 파일
  - **productDetail**: 제품 상세 페이지
  - **productManagement**: 판매자의 제품 관리 페이지
  - **purchase**: 구매 페이지(결제, 배송 정보 등)
  - **purchaseHistory**: 구매 내역 페이지
  - **register**: 회원가입 페이지

</details>

<details>
<summary>store</summary>

- **역할**: Zustand를 활용한 전역 상태 관리
- **하위 구조**:
  - **auth**: 사용자 인증 상태 관리
  - **cart**: 장바구니 상태 관리
  - **filter**: 필터 상태 관리
  - **order**: 주문 상태 관리
  - **product**: 제품 상태 관리
  - **toast**: 알림 메시지 상태 관리
- **특징**:
  - 각 도메인별 상태를 독립적으로 관리하여 유지보수성과 확장성 향상

</details>

<details>
<summary>utils</summary>

- **역할**: 프로젝트 전반에서 사용되는 유틸리티 함수 저장
- **예상 파일 내용**:
  - 데이터 변환, 공통 처리 로직, 캐러셀 관련 유틸리티

</details>

<details>
<summary>루트 파일</summary>

- **apiRoutes.ts**: API 엔드포인트 관리
- **constants.ts**: 전역 상수 정의
- **firebase.ts**: Firebase 초기화 및 설정
- **index.css**: 글로벌 CSS 스타일 정의
- **main.tsx**: React 애플리케이션의 진입점
- **router.tsx**: React Router 설정 및 라우팅 정의
- **vite-env.d.ts**: Vite 환경 설정에 대한 타입 정의

</details>

</details>
