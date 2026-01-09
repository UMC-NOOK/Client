\## 👥 Web Developers



<div align="center">



| Frontend | Frontend | Frontend | Frontend |

| :------: | :------: | :------: | :------: |

| <img style="width:150px;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvqLuvms8WsD7ibE\_O4vCRA7F9w-AcpKc\_Qw\&s" /> | <img style="width:150px;" src="https://github.com/Eunjin03.png" /> | <img style="width:150px;" src="https://github.com/suzy0928.png" /> | <img style="width:150px;" src="https://github.com/seoyeon0103.png" /> |

| New | \[오은진](https://github.com/Eunjin03) | \[박수지](https://github.com/suzy0928) | \[임서연](https://github.com/seoyeon0103) |



</div>



<br/>



---



\### 🌐 Git-flow



\- \*\*main\*\*: 프로젝트가 최종적으로 배포되는 브랜치  

\- \*\*develop\*\*: 다음 출시 버전을 개발하는 브랜치  

\- \*\*feature\*\*: 기능을 개발하는 브랜치  



<br/>



---



\### 📌 Git branch 규칙



1\. \*\*개인 작업은 꼭 feature 브랜치에서 하기\*\*

2\. \*\*모든 작업 시작 전 develop에서 pull을 받은 후, feature 브랜치에서 작업 시작\*\*

3\. \*\*개인 작업 마치면 feature 브랜치로 pull request를 통해 develop에 merge하기\*\*

4\. \*\*프로젝트 완료 후 main으로 merge (팀장이 한번에 진행 예정)\*\*



<br/>



---



\### 📝 Feature branch



1\. \*\*브랜치명은 아래의 형식으로 작성합니다.\*\*  

&nbsp;  - 형식: `feature/이름-기능제목#이슈번호`  

&nbsp;  - 예시: `feature/suzy0928-login#1`



2\. \*\*Feature branch → develop branch로 merge 전\*\*

&nbsp;  - PR에서 reviewers 설정

&nbsp;  - 팀장 포함 \*\*2명 이상 approve 필수\*\*



3\. \*\*PR 후 팀원들에게 공지하기\*\*



<br/>



---



\### 📝 Git Command



1\. `git checkout develop`

2\. `git pull origin develop`

3\. `git checkout -b feature/이름-기능#이슈번호`

4\. 작업 완료 후  

&nbsp;  ```bash

&nbsp;  git add .

&nbsp;  git commit -m "✨ feat: commit message"

&nbsp;  git push origin feature/이름-기능#이슈번호



