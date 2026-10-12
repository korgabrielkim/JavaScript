# Chef’s Studio 웹 페이지

Figma의 `web` 프레임을 바탕으로 만든 순수 HTML/CSS/JavaScript 프로젝트입니다. 빌드 도구나 패키지 설치 없이 VS Code에서 수정할 수 있습니다.

## 실행

1. 이 폴더를 VS Code에서 엽니다.
2. `index.html`을 브라우저에서 엽니다. 자동 새로고침을 원하면 VS Code의 Live Server 확장을 사용할 수 있습니다.

## 수정할 부분

- 클래스 이름, 국가, 설명, 가격, 사진 경로: `app.js`의 `classes` 배열
- 색상, 간격, 반응형 규칙: `styles.css` 상단 CSS 변수와 미디어 쿼리
- 페이지 구조와 문구: `index.html`

## 필요한 Figma 이미지 에셋

프로젝트는 사진과 아이콘이 없어도 열리고 검색/필터/정렬/상세 화면을 사용할 수 있도록 이미지 대체 표시를 제공합니다. 사진을 복구하려면 아래 파일을 Figma에서 내보내 `assets/`에 같은 이름으로 저장하세요.

### 클래스 사진

- `pasta-italy.png`
- `pumpkin-soup.png`
- `chocolate-truffle.png`
- `tacos-mexico.png`
- `tangerine-korea.png`
- `brunch-thailand.png`
- `pancakes-denmark.png`
- `pesto-us.png`

### 국기와 아이콘

- `flag-italy.png`, `flag-france.png`, `flag-mexico.png`, `flag-korea.png`
- `flag-thailand.png`, `flag-denmark.png`, `flag-us.png`
- `filter-left.svg`

싱가포르 국기는 디자인 파일에 포함된 에셋이 없어 이모지로 표시합니다. 사진 에셋은 디자인의 카드 순서에 맞춰 배치하면 됩니다.
