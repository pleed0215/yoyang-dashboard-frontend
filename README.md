# Project yoyang dashboard

## 1. User

Role base. User role은 super, admin, staff가 있습니다.
admin은 처음 병원 등록한 사람에게 주어짐. admin은 다른 admin을 등록 시킬 수 있습니다.
super는 모든 걸 할 수 있습니다. 그런데 아직 기능 구현이 안 되었습니다.
staff는 직원 권한만 있는 유저입니다. staff 유저는 작업만 가능합니다.
admin 유저도 작업이 가능합니다.

super 유저는 작업 관련해서 건들 수 없습니다. 관찰만 가능합니다. 이는 추후에 구현될 예정입니다.
`/dashboard`페이지는 모든 유저들이 다 접근 가능합니다만 role base로 메뉴가 달라집니다.