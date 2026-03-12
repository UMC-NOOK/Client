# 🎨 공용 컴포넌트 가이드 (Shared Component Guide)

> 이 문서는 프로젝트 내 공용 컴포넌트의 사용법, 위치, 담당자를 명시합니다.
> 디자인 구현 사항은 상단 **Design** 링크의 피그마(Figma)를 참고하세요.

## 📌 목차 (Table of Contents)

1. [Atomic](#1-atomic)
2. [Layout](#2-layout)
3. [Input](#3-input)
4. [Selection](#4-selection)
5. [Action](#5-action)
6. [Navigation](#6-navigation)
7. [Content](#7-content)
8. [Feedback](#8-feedback)
9. [Presentation](#9-presentation)

---

## 1. Atomic

> - **Design**: https://www.figma.com/design/VX3WcpitSSgsYxFoXlbgcA/NOOK-UI--%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9A%A9-?node-id=1268-10361&m=dev
> - **Author**: 오은진

### [ Book Cover ]

#### Path

`components/atomic/BookCover.tsx`

#### Props

| Name       | Type                         | Required | Default | Note                                          |
| :--------- | :--------------------------- | :------: | :------ | :-------------------------------------------- |
| `imageUrl` | `string`                     |    X     | -       | 책 표지 이미지 URL                            |
| `size`     | `'XS' \| 'S' \| 'M' \| 'XL'` |    O     | -       | 표지 크기                                     |
| `type`     | `'Image' \| 'Upload'`        |    O     | -       | `'Image'` 일 경우 반드시 `imageUrl` 함께 제공 |

#### Usage

```tsx
<BookCover size="M" type="Image" imageUrl="https://via.placeholder.com/150" />
```

```tsx
<BookCover size="M" type="Upload" />
```

### [ Theme ]

#### Path

`components/atomic/Theme.tsx`

#### Props

| Name       | Type      | Required | Default | Note                |
| :--------- | :-------- | :------: | :------ | :------------------ |
| `imageUrl` | `string`  |    O     | -       | 이미지 URL          |
| `select`   | `boolean` |    O     | -       | 선택 유무           |
| `onClick`  | `void`    |    O     | -       | 클릭 시 핸들러 함수 |

#### Usage

```tsx
<Theme imageUrl="" select={select} onClick={() => setSelect(!select)} />
```

### [ Image ]

#### Path

`components/atomic/Image.tsx`

#### Props

| Name       | Type                                          | Required | Default | Note                                                   |
| :--------- | :-------------------------------------------- | :------: | :------ | :----------------------------------------------------- |
| `imageUrl` | `string`                                      |    X     | -       | 이미지 URL                                             |
| `type`     | `'Upload' \| 'Skeleton'\| 'Image'\| 'Delete'` |    O     | -       | `'Image', `'Delete'`일 경우 반드시`imageUrl` 함께 제공 |

#### Usage

```tsx
<Image imageUrl="" type="Delete" />
```

```tsx
<Image type="Upload" />
```

---

## 2. Layout

> - **Design**: https://www.figma.com/design/VX3WcpitSSgsYxFoXlbgcA/NOOK-UI--%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9A%A9-?node-id=1268-10339&m=dev
> - **Author**: 오은진

### [ Divider ]

#### Path

`components/layout/Divider.tsx`

#### Props

| Name    | Type               | Required | Default | Note        |
| :------ | :----------------- | :------: | :------ | :---------- |
| `width` | `number \| string` |    O     | -       | 구분선 길이 |

#### Usage

```tsx
<Divider width={"full"} />
```

```tsx
<Divider width={36} />
```

### [ Dim ]

#### Path

`components/layout/Dim.tsx`

#### Props

| Name     | Type               | Required | Default | Note                    |
| :------- | :----------------- | :------: | :------ | :---------------------- |
| `width`  | `number \| string` |    O     | -       | 너비                    |
| `height` | `number \| string` |    O     | -       | 높이                    |
| `top`    | `number \| string` |    X     | 0       | relative 기준 top 위치  |
| `left`   | `number \| string` |    X     | 0       | relative 기준 left 위치 |

#### Usage

사용하기 위해선 반드시 부모 요소에 relative를 주어야 함

```tsx
<Dim width={"full"} height={"full"} />
```

```tsx
<Dim width={360} height={200} top={20} left={1} />
```

### [ Mask Gradient ]

#### Path

`components/layout/MaskGradient.tsx`

#### Props

| Name     | Type               | Required | Default | Note                    |
| :------- | :----------------- | :------: | :------ | :---------------------- |
| `width`  | `number \| string` |    O     | -       | 너비                    |
| `height` | `number \| string` |    O     | -       | 높이                    |
| `top`    | `number \| string` |    X     | 0       | relative 기준 top 위치  |
| `left`   | `number \| string` |    X     | 0       | relative 기준 left 위치 |

#### Usage

사용하기 위해선 반드시 부모 요소에 relative를 주어야 함

```tsx
<MaskGradient width={"full"} height={"full"} />
```

```tsx
<MaskGradient width={360} height={200} top={20} left={1} />
```

## 3. Input

> * **Design**: [https://www.figma.com/design/VX3WcpitSSgsYxFoXlbgcA/NOOK-UI--%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9A%A9-?node-id=1268-10175&m=dev](https://www.figma.com/design/VX3WcpitSSgsYxFoXlbgcA/NOOK-UI--%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9A%A9-?node-id=1268-10175&m=dev)
> * **Author**: 박수지

### [ Search Field ]

#### Path

`src/components/input/SearchField.tsx`

#### Props

| Name            | Type                  | Required | Default        | Note             |
| :-------------- | :-------------------- | :------: | :------------- | :--------------- |
| `value`         | `string`              |     O    | -              | 검색어 값            |
| `onChange`      | `(v: string) => void` |     O    | -              | 입력값 변경 핸들러       |
| `onSearchClick` | `() => void`          |     X    | -              | 검색 버튼 클릭 시 실행    |
| `onEnter`       | `() => void`          |     X    | -              | Enter 키 입력 시 실행  |
| `onFocus`       | `() => void`          |     X    | -              | input focus 시 실행 |
| `onBlur`        | `() => void`          |     X    | -              | input blur 시 실행  |
| `placeholder`   | `string`              |     X    | `"검색어를 입력하세요"` | placeholder 텍스트  |
| `isInputMode`   | `boolean`             |     X    | -              | 입력 모드 여부         |

#### Usage

```tsx
<SearchField
  value={query}
  onChange={setQuery}
  onSearchClick={handleSearch}
  onEnter={handleSearch}
/>
```

### [ Text Field ] -> 기본 굵기 

#### Path

`src/components/input/TextField.tsx`

#### Props

| Name          | Type                                                  | Required | Default | Note            |
| :------------ | :---------------------------------------------------- | :------: | :------ | :-------------- |
| `title`       | `string`                                              |     O    | -       | 입력 필드 제목        |
| `value`       | `string`                                              |     O    | -       | 입력 값            |
| `onChange`    | `(v: string) => void`                                 |     O    | -       | 값 변경 핸들러        |
| `placeholder` | `string`                                              |     X    | `""`    | placeholder 텍스트 |
| `inputMode`   | `React.HTMLAttributes<HTMLInputElement>["inputMode"]` |     X    | -       | 입력 모드 설정        |
| `disabled`    | `boolean`                                             |     X    | `false` | 비활성화 여부         |

#### Usage

```tsx
<TextField
  title="이름"
  value={name}
  onChange={setName}
  placeholder="이름을 입력해주세요."
/>
```

### [ Title Text Field ] -> 강조

#### Path

`src/components/input/TextField.tsx`

#### Props

| Name          | Type                  | Required | Default | Note            |
| :------------ | :-------------------- | :------: | :------ | :-------------- |
| `title`       | `string`              |     O    | -       | 입력 필드 제목        |
| `value`       | `string`              |     O    | -       | 입력 값            |
| `onChange`    | `(v: string) => void` |     O    | -       | 값 변경 핸들러        |
| `placeholder` | `string`              |     X    | `""`    | placeholder 텍스트 |
| `disabled`    | `boolean`             |     X    | `false` | 비활성화 여부         |

#### Usage

```tsx
<TitleTextField
  title="책 제목"
  value={title}
  onChange={setTitle}
  placeholder="책 제목을 입력하세요"
/>
```

### [ Triple Text Field ] -> 3분할 

#### Path

`src/components/input/TextField.tsx`

#### Props

| Name         | Type                                              | Required | Default | Note           |
| :----------- | :------------------------------------------------ | :------: | :------ | :------------- |
| `title`      | `string`                                          |     O    | -       | 입력 필드 제목       |
| `value`      | `Record<string, string>`                          |     O    | -       | 3개 input의 값 객체 |
| `onChange`   | `(v: Record<string, string>) => void`             |     O    | -       | 값 변경 핸들러       |
| `fields`     | `[{ key, placeholder, maxLen, inputMode? }, ...]` |     O    | -       | 3칸 입력 필드 정의    |
| `digitsOnly` | `boolean`                                         |     X    | `true`  | 숫자만 입력 허용      |
| `disabled`   | `boolean`                                         |     X    | `false` | 비활성화 여부        |

#### Usage

```tsx
const [birth, setBirth] = useState({
  year: "",
  month: "",
  day: "",
});

<TripleTextField
  title="생년월일"
  value={birth}
  onChange={setBirth}
  fields={[
    { key: "year", placeholder: "YYYY", maxLen: 4, inputMode: "numeric" },
    { key: "month", placeholder: "MM", maxLen: 2, inputMode: "numeric" },
    { key: "day", placeholder: "DD", maxLen: 2, inputMode: "numeric" },
  ]}
/>
```

### [ Text Area ]

#### Path

`src/components/input/textinput/TextArea.tsx`

#### Props

| Name          | Type                  | Required | Default | Note            |
| :------------ | :-------------------- | :------: | :------ | :-------------- |
| `title`       | `string`              |     X    | -       | textarea 제목     |
| `value`       | `string`              |     O    | -       | 입력 값            |
| `onChange`    | `(v: string) => void` |     O    | -       | 값 변경 핸들러        |
| `placeholder` | `string`              |     X    | `""`    | placeholder 텍스트 |
| `maxLength`   | `number`              |     X    | -       | 최대 글자 수 제한      |
| `disabled`    | `boolean`             |     X    | `false` | 비활성화 여부         |

#### Usage

```tsx
<TextArea
  title="소개"
  value={text}
  onChange={setText}
  placeholder="내용을 입력해주세요."
  maxLength={200}
/>
```

## 5. Action

### [ ContainerText ]

#### Path
`src/components/action/Button/ContainerText.tsx`

#### Props
| Name            | Type                               | Required | Default     | Note              |
| :-------------- | :--------------------------------- | :------: | :---------- | :--------------   |
|  `text`         | `string`                           |    O     | -           |  텍스트 내용  |
| `active`        | `boolean`                          |    X     | `false`     | 활성화/비활성화 여부      |

#### Usage
```tsx
  //비활성화
   <ContainerText text="Text" />

  //활성화
  <ContainerText text="Text" active />
```

### [ Emotion ]

#### Path
`src/components/Chip/Emotion.tsx`

#### Props
| Name            | Type                               | Required | Default     | Note              |
| :-------------- | :--------------------------------- | :------: | :---------- | :--------------   |
| `size`          | `string => "s" or "m"`             |     O    | -           | chip의 사이즈       |
| `emoji`         | `string`                           |     O    | -           | emoji 문자       |
| `text`          | `string`                           |     X    | -           | emoji 옆 텍스트   |
| `variant`       | `"yellow" \| "pink" \| "green" \| "blue" \| "red" \| "none"` |     X    | `"default"` | 탭 스타일 variant |
| `active`        | `boolean`          |     O    | `"true"`          | chip의 비활성화/활성화 여부      |

#### Usage
```tsx
//size = s 
<Emotion size="s" emoji="(^_^)" variant="yellow" active />

//size = m 
<Emotion size="m" emoji="(^_^)" text="재밌어요" variant="yellow" active />

//active 비활성화"
<Emotion size="m" emoji="(• o •)" text="유익해요" variant="yellow" active={false} />
```

## 5. Content

### [ SectionHeader ]

#### Path

`src/components/content/InformationText/SectionHeader.tsx`

#### Props

| Name          | Type                                | Required | Default | Note                    |
| :------------ | :---------------------------------- | :------: | :------ | :---------------------- |
| `size`        | `"13" \| "14" \| "16" \| "20" \|`   |     O    | -       | 컴포넌트 사이즈             |
| `title`       | `string`                            |     O    | -       | 기본 텍스트 내용이자 윗 텍스트   |
| `description` | `string`                            |     X    | `false` | 아래 텍스트                |
| `onToggle`    | `(open: boolean) => void`           |     X    | -       | 토글 내렸을 때의 함수         |
| `onClick`     | `() => void`                        |     X    | -       | 해당 컴포넌트 눌럿을 때의 함수  |

#### Usage

```tsx
//size 13 (토글 없음, 원하면 onClick 추가 가능)
 <SectionHeader
  size="13"
  title="Text"
  description="한 줄로 말줄임 처리되는 설명 텍스트입니다."
/>

//size 14 (토글 잇음, 밑 설명단 없음)
<SectionHeader
  size="14"
  title="Text"=
  onClick={() => {console.log("size 14 click");}}
  onToggle={(open) => { console.log("size 14 toggle:", open);}}
/>

//size 16 (토글 있음, 밑 설명단 있음)
<SectionHeader
  size="16"
  title="Text"
  description="한 줄로 잘리는 설명 텍스트입니다."
  onClick={() => { console.log("size 16 click"); }}
  onToggle={(open) => { console.log("size 16 toggle:", open);}}
/>

//size 20 (토글 없음, 밑 설명단 있음)
<SectionHeader
 size="20"
 title="Text"
 description="조금 더 큰 제목 아래 설명 텍스트가 들어갑니다."
/>
```

### [ Information Section ]

#### Path

`src/components/content/InformationText/InformationSection.tsx`

#### Props

| Name          | Type                                | Required | Default | Note                    |
| :------------ | :---------------------------------- | :------: | :------ | :---------------------- |
| `flow`        | `"vertical" \| "horizontal" `       |     O    | -       | 수직/수평 선택             |
| `title`       | `string`                            |     O    | -       | 위 또는 왼쪽 텍스트   |
| `description` | `string`                            |     O    | -       | 아래 또는 오른쪽 테스트               |
| `onToggle`    | `(open: boolean) => void`           |     X    | -       | 토글 내렸을 때의 함수         |
| `onClick`     | `() => void`                        |     X    | -       | 해당 컴포넌트 눌럿을 때의 함수  |

#### Usage

```tsx
//vertical
 <InformationSection
  flow="vertical"
  title="Text"
  description="세로형 설명 텍스트입니다."
  onClick={() => { console.log("vertical click");}}
  onToggle={(open) => { console.log("vertical toggle:", open); }}
/>

//horizontal
<InformationSection
  flow="horizontal"
  title="Text"
  description="가로형 설명 텍스트입니다."
/>
```

#### Props
| Name            | Type                               | Required | Default     | Note              |
| :-------------- | :--------------------------------- | :------: | :---------- | :--------------   |
|  `icon`         | `ReactNode`                        |     O    | -           |  내부에 들어갈 icon svg    |
| `onClick`       | `() => void`                       |    X     | -           | 눌럿을 때의 기능 함수      |

#### Usage
```tsx
//svg 파일이라서 이렇게 <img 태그에 묶어서 진행했습니다.>
  <FAB icon={<img src={PlusIcon}/>}/>
```


## 6. Navigation

> * **Design**:
> * **Author**: 박수지

### [ Tab Bar ]

#### Path

`src/components/navigation/tabs/TabBar.tsx`

#### Props

| Name            | Type                               | Required | Default     | Note          |
| :-------------- | :--------------------------------- | :------: | :---------- | :------------ |
| `options`       | `readonly TabOption<T>[]`          |     O    | -           | 탭 옵션 목록       |
| `value`         | `T`                                |     O    | -           | 현재 선택된 탭 값    |
| `onChange`      | `(v: T) => void`                   |     O    | -           | 탭 변경 핸들러      |
| `buttonWidthPx` | `number`                           |     X    | -           | 탭 버튼 고정 너비    |
| `variant`       | `"default" \| "underlineGradient"` |     X    | `"default"` | 탭 스타일 variant |
| `className`     | `string`                           |     X    | `""`        | 추가 클래스명       |

#### Usage

```tsx
const tabOptions = [
  { value: "all", label: "전체" },
  { value: "popular", label: "인기" },
] as const;

<TabBar
  options={tabOptions}
  value={tab}
  onChange={setTab}
  variant="underlineGradient"
/>
```

### [ Text ]

#### Path

`src/components/navigation/tabs/Text.tsx`

#### Props

| Name            | Type                            | Required | Default               | Note         |
| :-------------- | :------------------------------ | :------: | :-------------------- | :----------- |
| `options`       | `readonly SegmentedOption<T>[]` |     O    | -                     | 세그먼트 옵션 목록   |
| `value`         | `T`                             |     O    | -                     | 현재 선택된 값     |
| `onChange`      | `(v: T) => void`                |     O    | -                     | 값 변경 핸들러     |
| `className`     | `string`                        |     X    | `""`                  | 추가 클래스명      |
| `ariaLabel`     | `string`                        |     X    | `"segmented control"` | 접근성용 라벨      |
| `variant`       | `"fluid" \| "fixed"`            |     X    | -                     | 레이아웃 variant |
| `buttonWidthPx` | `number`                        |     X    | -                     | 버튼 고정 너비     |

#### Usage

```tsx
const options = [
  { value: "book", label: "도서" },
  { value: "record", label: "기록" },
] as const;

<Text
  options={options}
  value={selected}
  onChange={setSelected}
  ariaLabel="콘텐츠 타입 선택"
/>
```

### [ Text Tab ]

#### Path

`src/components/navigation/tabs/TextTab.tsx`

#### Props

| Name       | Type         | Required | Default | Note        |
| :--------- | :----------- | :------: | :------ | :---------- |
| `label`    | `string`     |     O    | -       | 버튼에 표시될 텍스트 |
| `active`   | `boolean`    |     O    | -       | 활성화 여부      |
| `onClick`  | `() => void` |     O    | -       | 클릭 핸들러      |
| `widthPx`  | `number`     |     X    | -       | 버튼 고정 너비    |
| `disabled` | `boolean`    |     X    | `false` | 비활성화 여부     |

#### Usage

```tsx
<TextTab
  label="전체"
  active={activeTab === "all"}
  onClick={() => setActiveTab("all")}
/>
```

### [ Top Navigation ]

#### Path

`src/components/navigation/topnavigation/TopNavigation.tsx`

#### Props

| Name        | Type              | Required | Default | Note     |
| :---------- | :---------------- | :------: | :------ | :------- |
| `left`      | `React.ReactNode` |     X    | -       | 좌측 영역 요소 |
| `center`    | `React.ReactNode` |     X    | -       | 중앙 영역 요소 |
| `right`     | `React.ReactNode` |     X    | -       | 우측 영역 요소 |
| `className` | `string`          |     X    | `""`    | 추가 클래스명  |

#### Usage

```tsx
<TopNavigation
  left={<BackButton onClick={handleBack} />}
  center={<span>상세 페이지</span>}
  right={<button type="button">편집</button>}
/>
```

### [ Top GNB ]

#### Path

`src/components/navigation/topnavigation/TopGnb.tsx`

#### Props

| Name            | Type         | Required | Default                                           | Note          |
| :-------------- | :----------- | :------: | :------------------------------------------------ | :------------ |
| `onSearchClick` | `() => void` |     X    | -                                                 | 검색 버튼 클릭 핸들러  |
| `onMenuClick`   | `() => void` |     X    | -                                                 | 메뉴 버튼 클릭 핸들러  |
| `onLogoClick`   | `() => void` |     X    | -                                                 | 로고 클릭 핸들러     |
| `logoSrc`       | `string`     |     X    | -                                                 | 커스텀 로고 이미지 경로 |
| `logoAlt`       | `string`     |     X    | `"nook"`                                          | 로고 대체 텍스트     |
| `showSearch`    | `boolean`    |     X    | `true`                                            | 검색 아이콘 표시 여부  |
| `showMenu`      | `boolean`    |     X    | `true`                                            | 메뉴 아이콘 표시 여부  |
| `className`     | `string`     |     X    | `"w-full h-10 flex items-center justify-between"` | 추가 클래스명       |

#### Usage

```tsx
<TopGnb
  onLogoClick={() => navigate("/")}
  onSearchClick={() => navigate("/search")}
  onMenuClick={openMenu}
/>
```

### [ Progress Indicator ]

#### Path

`src/components/navigation/ProgressIndicator.tsx`

#### Props

| Name               | Type     | Required | Default         | Note       |
| :----------------- | :------- | :------: | :-------------- | :--------- |
| `step`             | `number` |     O    | -               | 현재 단계      |
| `total`            | `number` |     O    | -               | 전체 단계 수    |
| `heightClassName`  | `string` |     X    | `"h-1"`         | 진행바 높이 클래스 |
| `wrapperClassName` | `string` |     X    | `"w-full px-1"` | 바깥 래퍼 클래스  |

#### Usage

```tsx
<ProgressIndicator
  step={2}
  total={5}
  heightClassName="h-1"
  wrapperClassName="w-full px-1"
/>
```


### [ Footer ]

#### Path

`src/components/navigation/Footer.tsx`

#### Props

| Name | Type | Required | Default | Note |
| :--- | :--- | :------: | :------ | :--- |
| - | - | - | - | props 없음 |

#### Usage

```tsx
<Footer />
```

## 7. Content

> - **Design**: 
> - **Author**: 임서연

### [ List/Rank ]

#### Path

``

#### Props

| Name | Type | Required | Default | Note |
| :--- | :--- | :------: | :------ | :--- |
|      |      |          |         |      |

#### Usage

```tsx

```

---

## 8. Feedback

> - **Design**: https://www.figma.com/design/VX3WcpitSSgsYxFoXlbgcA/NOOK-UI--%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9A%A9-?node-id=1268-9814&m=dev
> - **Author**: 오은진

### [ Snackbar ]

#### Path

`components/feedback/snackbar.tsx`

#### Props

| Name          | Type   | Required | Default | Note           |
| :------------ | :----- | :------: | :------ | :------------- |
| icon          | string |    X     | -       | 아이콘 url     |
| text          | string |    O     | -       | snack bar 문구 |
| buttonText    | string |    O     | -       | 버튼 문구      |
| onButtonClick | void   |    O     | -       | 버튼 클릭 함수 |

#### Usage

```tsx
import camera from "../../assets/icons/camera-gray.svg";

<Snackbar
  icon={camera}
  text="내 서재에 도서를 등록했어요."
  buttonText="확인"
  onButtonClick={() => alert("Snackbar button clicked!")}
/>;
```

### [ Toast ]

#### Path

`components/feedback/Toast.tsx`

#### Props

| Name | Type   | Required | Default | Note           |
| :--- | :----- | :------: | :------ | :------------- |
| icon | string |    X     | -       | 아이콘 url     |
| text | string |    O     | -       | snack bar 문구 |

#### Usage

```tsx
import camera from "../../assets/icons/camera-gray.svg";

<Toast icon={camera} text="내 서재에 도서를 등록했어요." />;
```

---

## 9. Presentation

> - **Design**:
> - **Author**:

### [ Banner Action Card ]

#### Path

`src/components/presentation/modal/bottombanner/Origin.tsx`  

#### Props

| Name | Type | Required | Default | Note |
| :--- | :--- | :------: | :------ | :--- |
| `line1` | `string` | O | - | 첫 번째 문장 |
| `line2` | `string` | O | - | 두 번째 문장 |
| `iconSrc` | `string` | X | `defaultArrowRight` | 우측 아이콘 이미지 경로 |
| `iconAlt` | `string` | X | `"arrow right"` | 아이콘 대체 텍스트 |
| `useGradientOverlay` | `boolean` | X | `false` | 그라데이션 오버레이 사용 여부 |
| `onClick` | `() => void` | X | - | 클릭 핸들러 |
| `maxWidthPx` | `number` | X | `343` | 최대 너비 |
| `className` | `string` | X | `""` | 추가 클래스명 |
| `ariaLabel` | `string` | X | `"banner action card"` | 접근성 라벨 |

#### Usage

```tsx
<BannerActionCard
  line1="독서 기록을 추가해보세요"
  line2="지금 바로 시작할 수 있어요"
  onClick={handleClick}
/>
```

### [ Reading Record Banner Card ]

#### Path

`src/components/presentation/modal/bottombanner/ReadingRecord.tsx`

#### Props

| Name | Type | Required | Default | Note |
| :--- | :--- | :------: | :------ | :--- |
| `count` | `number \| string` | O | - | 독서 기록 개수 |
| `subtitle` | `string` | O | - | 하단 설명 문구 |
| `onClick` | `() => void` | X | - | 클릭 핸들러 |
| `maxWidthPx` | `number` | X | `343` | 최대 너비 |
| `iconSrc` | `string` | X | `plusIcon` | 우측 아이콘 이미지 경로 |
| `iconAlt` | `string` | X | `"plus"` | 아이콘 대체 텍스트 |
| `className` | `string` | X | `""` | 추가 클래스명 |
| `ariaLabel` | `string` | X | `"reading record banner"` | 접근성 라벨 |

#### Usage

```tsx
<ReadingRecordBannerCard
  count={12}
  subtitle="이번 달 읽은 책을 기록해보세요"
  onClick={handleClick}
/>
```

### [ Single Line Banner Card ]

#### Path

`src/components/presentation/modal/bottombanner/Small.tsx`

#### Props

| Name | Type | Required | Default | Note |
| :--- | :--- | :------: | :------ | :--- |
| `label` | `string` | O | - | 배너 문구 |
| `iconSrc` | `string` | X | `defaultArrowRight` | 우측 아이콘 이미지 경로 |
| `iconAlt` | `string` | X | `"arrow right"` | 아이콘 대체 텍스트 |
| `onClick` | `() => void` | X | - | 클릭 핸들러 |
| `maxWidthPx` | `number` | X | `343` | 최대 너비 |
| `className` | `string` | X | `""` | 추가 클래스명 |
| `ariaLabel` | `string` | X | `"single line banner card"` | 접근성 라벨 |

#### Usage

```tsx
<SingleLineBannerCard
  label="추천 도서를 확인해보세요"
  onClick={handleClick}
/>
```

### [ Bottom Sheet ] -> 이 부분은 #252 PR 공유사항 추가로 참고 

#### Path

`src/components/presentation/modal/bottomsheet/Origin.tsx` 

#### Props

| Name | Type | Required | Default | Note |
| :--- | :--- | :------: | :------ | :--- |
| `open` | `boolean` | O | - | 바텀시트 열림 여부 |
| `onClose` | `() => void` | O | - | 닫기 핸들러 |
| `title` | `string` | X | - | 헤더 제목 |
| `footer` | `BottomSheetFooterConfig` | X | - | 하단 버튼 설정 |
| `children` | `React.ReactNode` | O | - | 바디 콘텐츠 |
| `closeOnOverlayClick` | `boolean` | X | `true` | 오버레이 클릭 닫기 여부 |
| `className` | `string` | X | `""` | 추가 클래스명 |

#### Usage

```tsx
<BottomSheet
  open={open}
  onClose={() => setOpen(false)}
  title="필터 선택"
  footer={{
    layout: "double",
    sizeMode: "equal",
    leftVariant: "secondary",
    leftLabel: "취소",
    rightLabel: "적용",
    onLeftClick: () => setOpen(false),
    onRightClick: handleApply,
  }}
>
  <div>바텀시트 내용</div>
</BottomSheet>
```

### [ Popup Confirm Modal ]

#### Path

`src/components/presentation/modal/popup/Origin.tsx`

#### Props

| Name | Type | Required | Default | Note |
| :--- | :--- | :------: | :------ | :--- |
| `open` | `boolean` | O | - | 팝업 열림 여부 |
| `title` | `string` | O | - | 팝업 제목 |
| `description` | `string` | O | - | 팝업 설명 |
| `leftLabel` | `string` | O | - | 왼쪽 버튼 텍스트 |
| `rightLabel` | `string` | O | - | 오른쪽 버튼 텍스트 |
| `onLeftClick` | `() => void` | X | - | 왼쪽 버튼 클릭 핸들러 |
| `onRightClick` | `() => void` | X | - | 오른쪽 버튼 클릭 핸들러 |
| `onClose` | `() => void` | X | - | 외부 닫기 핸들러 |
| `closeOnOverlayClick` | `boolean` | X | `true` | 오버레이 클릭 닫기 여부 |
| `className` | `string` | X | `""` | 추가 클래스명 |
| `ariaLabel` | `string` | X | `"popup confirm modal"` | 접근성 라벨 |

#### Usage

```tsx
<PopupConfirmModal
  open={open}
  title="정말 삭제하시겠어요?"
  description="삭제한 내용은 되돌릴 수 없어요."
  leftLabel="취소"
  rightLabel="삭제"
  onLeftClick={() => setOpen(false)}
  onRightClick={handleDelete}
/>
```