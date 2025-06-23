# Project yoyang dashboard

## 1. User

Role base. User role은 super, admin, staff가 있습니다.
admin은 처음 병원 등록한 사람에게 주어짐. admin은 다른 admin을 등록 시킬 수 있습니다.
super는 모든 걸 할 수 있습니다. 그런데 아직 기능 구현이 안 되었습니다.
staff는 직원 권한만 있는 유저입니다. staff 유저는 작업만 가능합니다.
admin 유저도 작업이 가능합니다.

super 유저는 작업 관련해서 건들 수 없습니다. 관찰만 가능합니다. 이는 추후에 구현될 예정입니다.
`/dashboard`페이지는 모든 유저들이 다 접근 가능합니다만 role base로 메뉴가 달라집니다.

### 1.1 Super user

Super 유저는 모든 권한을 가질 수 있고 전체적인 데이터를 통제할 수 있습니다.

`/app/features/super`에서 페이지를 만듭니다. 각 페이지는 pages 폴더에 있습니다.
pages에서의 명명 규칙은 아래와 같습니다.

| super-{sub-feature}-{something}.tsx

예를 들어, 
- User 관련된 페이지.
`super-users-pending.tsx`, `super-users-index.tsx`

- hospital 관련된 페이지
`super-hospitals-index.tsx`, `super-hospitals-pending.tsx`

추후에 명명 규칙은 바뀔 수 있습니다. 점점 많은 feature들을 넣다면 pages가 너무 커질 수 있기 때문입니다. 하지만 바뀌지 않을 수도 있습니다.
그건 순전히 1인 프로젝트를 하는 제 마음입니다.

### 1.2 Admin user

admin 유저와 staff 유저의 가장 큰 차이점은 admin user는 staff user 등의 권한을 설정할 수 있는 것 뿐입니다. 나머지 작업은 동일하게 할 수 있습니다.
페이지 명명 규칙은 super유저의 것과 같습니다.

### 1.3 staff user

staff 유저는 작업만할 수 있는 유저입니다. 병원과 관련된 설정은 하지 못합니다. 하지만 현재는 병원에 관련된 설정이라고는 없으니 그냥 저냥 비슷한 역할입니다.



