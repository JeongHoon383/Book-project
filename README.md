# 경향문고

**프로젝트 소개**

도서를 판매, 구매를 할 수 있는 커머스 플랫폼 입니다. 

**프로젝트 진행기간**

2024.10 ~ 2024.11 (4주)

**프로젝트 배포링크**

- 배포링크

**테스트 계정**
>구매자  
>ID:buyer@test.com  
>PW:123123!!
>
>판매자  
>ID:seller@test.com  
>PW:123123!!

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

* 폼 유효성 검사
* 로그인 후 전역상태 및 로컬스토리지로 회원정보 관리

<details>
<summary>
  <strong>전체 상품 조회</strong>
</summary>
  <br>
  <p><strong>전체 상품 - 결과 필터링, 무한스크롤</strong></p>
  <img src="https://github.com/user-attachments/assets/fc1f7af6-388f-4a78-868f-513beb344c7b" width="700"/>
</details>

* 카테고리, 검색어, 정렬 옵션에 따른 조회 결과 필터링 기능
* 무한스크롤을 활용한 페이지네이션

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

* 상품 내용 및 장바구니 추가 혹은 상품 바로구매
* 해당 상품 카테고리와 동일한 카테고리 상품 추천

<details>
<summary>
  <strong>[구매자] 장바구니</strong>
</summary>
  <br>
   <p><strong>장바구니 - 수량 변경, 상품 삭제</strong></p>
  <img src="https://github.com/user-attachments/assets/7e11baa9-2304-4e57-b188-0878d6d9e3c5" width="700"/>
</details>

* 장바구니 상품 수량 수정 및 삭제 기능
* 재고보다 더 추가할 경우 추가 불가 및 안내문구
* 선택한 상품 금액 및 개수 계산

<details>
<summary>
  <strong>[구매자] 선택 상품 주문</strong>
</summary>
  <br>
   <p><strong>주문 - 배송 정보 입력, 결제</strong></p>
  <img src="https://github.com/user-attachments/assets/816595cb-b15c-4bb2-a6d0-153862a852b7" width="700"/>
</details>

* 폼 유효성 검사
* 주문한 상품 금액 계산
* 주문시 상품 재고 감소, 품절된 상품 예외처리

<details>
<summary>
  <strong>[구매자] 주문 내역 조회 및 주문 취소</strong>
</summary>
  <br>
   <p><strong>주문 내역 - 주문 취소, 상품 재고 복구</strong></p>
  <img src="https://github.com/user-attachments/assets/9cbb46a1-ee41-4da5-932e-59be49d7137d" width="700"/>
</details>

* 날짜별 주문 내역 조회 및 정렬 기능
* 상품별 주문 취소 기능
* 주문 취소시 해당 상품 재고 복구

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

* 판매 상품 조회, 등록, 수정, 삭제 기능
* 상품 정렬, 무한스크롤 기능

## 🔥 성능 최적화
* 설명1
* 설명2

## 💡 트러블 슈팅
* 설명1
* 설명2

## 🛠️ 기술적 의사 결정
* 설명1
* 설명2

## 🏗️ 아키텍처
* 설명1

## 🗂️ 폴더구조
* 설명 1

