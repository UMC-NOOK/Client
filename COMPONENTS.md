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
> * **Design**:
> * **Author**: 임서연

### [ Icon ]

#### Path
`src/components/action/Button/Icon.tsx`

#### Props
| Name            | Type                               | Required | Default     | Note              |
| :-------------- | :--------------------------------- | :------: | :---------- | :--------------   |
| `size`          | `"xs" or "s" or "m`                |     O    | -           |  아이콘 사이즈     |
| `children`      | `ReactNode`                        |     O    | -           | svg 파일      |
| `className`     | `string`                           |     X    | -           | 추가적인 클래스명  |

#### Usage
```tsx
  <Icon size="xs"> 
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16 8.75C16 6.8272 15.2356 4.98267 13.876 3.62305C12.5164 2.2637 10.6726 1.50002 8.75 1.5C6.8272 1.5 4.98267 2.26342 3.62305 3.62305C2.26342 4.98267 1.5 6.8272 1.5 8.75C1.50002 10.6726 2.2637 12.5164 3.62305 13.876C4.98267 15.2356 6.8272 16 8.75 16C10.6728 16 12.5164 15.2356 13.876 13.876C15.2356 12.5164 16 10.6728 16 8.75ZM17.5 8.75C17.5 10.8192 16.7645 12.8109 15.4424 14.3818L19.2803 18.2197C19.573 18.5126 19.5731 18.9874 19.2803 19.2803C18.9874 19.5731 18.5126 19.573 18.2197 19.2803L14.3818 15.4424C12.8109 16.7645 10.8192 17.5 8.75 17.5C6.42941 17.5 4.20342 16.5784 2.5625 14.9375C0.921589 13.2966 2.04574e-05 11.0706 0 8.75C0 6.42938 0.921571 4.20343 2.5625 2.5625C4.20343 0.921571 6.42938 0 8.75 0C11.0706 2.04577e-05 13.2966 0.921589 14.9375 2.5625C16.5784 4.20342 17.5 6.42941 17.5 8.75Z" fill="#ECECEC"/> </svg> 
  </Icon>
```

### [ Text ]

#### Path
`src/components/action/Button/Text.tsx`

#### Props
| Name            | Type                               | Required | Default     | Note              |
| :-------------- | :--------------------------------- | :------: | :---------- | :--------------   |
|  `text`         | `string`                           |     O    | -           |  텍스트 내용     |
| `size`          | `"12" \| "14" \| "18"`             |     O    | -           | 텍스트 사이즈      |
| `active`        | `boolean`                          |    O     | `"false"`   | 텍스트 활성화/비활성화 여부  |
| `onClick`       | `() => void`                       |    X     |     -       | 텍스트 Click에 대한 기능  |

#### Usage
```tsx
  <TextButton text="비활성" size="18" active={false} />
  <TextButton text="활성" size="12" active={true} />
```

### [ Solid ]

#### Path
`src/components/action/Button/Solid.tsx`

#### Props
| Name            | Type                               | Required | Default     | Note              |
| :-------------- | :--------------------------------- | :------: | :---------- | :--------------   |
|  `text`         | `string`                           |     O    | -           |  텍스트 내용     |
| `variant`       | `"default" \| "dark" \| "danger"`  |     O    | `default`   | 버튼 종류      |
| `className`        | `string`                        |     X    |  -          | 추가적인 클래스 명  |

#### Usage
```tsx
  //default
  <Solid> 기본 </Solid> 
  //dark
  <Solid variant="dark">다른</Solid> 
  //danger
  <Solid variant="danger">제거</Solid>
```

### [ FAB ]

#### Path
`src/components/action/Button/FAB.tsx`

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

### [ Chip ]

#### Path

`src/components/action/Chip/Chip.tsx`

#### Props

| Name            | Type                  | Required | Default     | Note          |
| :-------------- | :---------------------| :------: | :---------- | :------------ |
| `text`          | `string`              |     O    | -           | 텍스트 내용       |
| `variant`       | `"none" \| "icon"`    |     O    | -           | 활성화/비활성화 유무    |
| `active`        | `boolean`             |     O    | `false`     | 활성화/비활성화 유무    |
| `icon`          | `ReactNode`           |     X    | -           | 아이콘    |
| `onClick`       | `()=> void`           |     X    | -           | 눌럿을 때의 기능    |

#### Usage

```tsx
const [isActive, setIsActive] = useState(false);

//icon 있는 칩
<Chip
  text="Text"
  variant="icon"
  active={isActive}
  icon={<img src={PlusIcon} alt="Plus Icon"/>}
  onClick={() => setIsActive(!isActive)}
/>

//text만 있는 칩
<Chip
  text="Text"
  variant="none"
  active={true}
/>
```


### [ Emotion ]

#### Path
`src/components/Chip/Emotion.tsx`

#### Props
| Name            | Type                               | Required | Default     | Note              |
| :-------------- | :--------------------------------- | :------: | :---------- | :--------------   |
| `size`          | `string => "s" or "m"`             |     O    | -           | chip의 사이즈       |
| `emojiKey`      | `"Fun" | "EMPATHIZING" | "USEFUL" | "SAD" | "COMPLICATED" | "UNCOMFORTABLE"`                           |     O    | -           | emoji 종류       |
| `active`        | `boolean`          |     O    | `"false"`          | chip의 비활성화/활성화 여부      |

#### Usage
```tsx
//size = s 
 <Emotion size="s" emojiKey={key} active={false}/>

//size = m 
<Emotion size="m" emojiKey={key} active={true}/>
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

### [ Rank ]

#### Path

`components/content/list/Rank`

#### Props

| Name       | Type       | Required  | Default | Note    |
| :--------- | :--------- | :-------: | :------ | :------ |
| rank       | number     |     O     |   -     |   등수   |
| title      | string     |     O     |   -     |  책 제목  |

#### Usage

```tsx
const MOCK_RANKS = [
  { rank: 0, title: 'The Pragmatic Programmer' },
  { rank: 1, title: 'Clean Code: A Handbook of Agile Software Craftsmanship' },
  { rank: 2, title: 'Refactoring: Improving the Design of Existing Code' },
  {
    rank: 3,
    title: '아주아주아주 긴 제목 테스트용 — 한 줄 말줄임이 제대로 적용되는지 확인하는 텍스트입니다',
  },
];

<div className="space-y-3">
  {MOCK_RANKS.map((item) => (
   <Rank
    key={item.rank}
    rank={item.rank}
    title={item.title}
  />))}
</div>

```

### [ History ]

#### Path

`components/content/list/History`

#### Props

| Name       | Type                        | Required  | Default | Note                         |
| :--------- | :-------------------------- | :-------: | :------ | :--------------------------  |
| variant    |  `"history" \| "time"`      |     O     |   -     |   독서 기록 / 시간 컴포넌트 기록    |
| time       | string                      |     O     |   -     |  타이머 시간  |
| title      | string                      |     X     |   -     |  시간 기록일 때의 제목  |

#### Usage

```tsx
//history (독서기록)
<HistoryInfoCard
 variant="history"
 time="2025.09.11"
/>

//time 
 <HistoryInfoCard
  variant="time"
  title="집중 시간"
  time="01:24:12"
/>

```

### [ Date ]

#### Path

`components/content/list/Resource/Date`

#### Props

| Name       | Type       | Required  | Default | Note    |
| :--------- | :--------- | :-------: | :------ | :------ |
| topText    | string     |     O     |   -     |   월.일    |
| bottomText | string     |     O     |   -     |  해당 년도 4자리  |

#### Usage

```tsx
<ResourceDate topText="01.12" bottomText="2026" />

```


### [ Book Goal ]

#### Path

`src/components/content/Card/BookGoal/BookGoal.tsx`

#### Props

| Name          | Type                                                | Required | Default | Note |
| :------------ | :---------------------------------------------------| :------: | :------ | :---------------------- |
| `percent`     | `"ZERO" \| "PCT_1_9" \|"PCT_10_19"\|"PCT_20_29" \|` |     O    | -       | 도서 읽은 퍼센트            |
|               |`"PCT_30_39" \| "PCT_40_49" \| "PCT_50_59" \| "PCT_60_69"`|
|               |`"PCT_70_79" \| "PCT_80_89" \| "PCT_90_99" \| "PCT_100"`|
| `message`     | `string`                                            |     O    | -       | 텍스트   |

#### Usage

```tsx
//zero => mesage가 독서 목표를 설정하세요 라고 정해져있음
<BookGoal percent="ZERO" />

//zero 가 아닌 경우 message를 받아와야함
<BookGoal
 percent="PCT_1_9"
 message="100권까지 99권 남았어요."
/>
```

### [ Normal ]

#### Path

`src/components/content/Card/Book/Normal.tsx`

#### Props

| Name          | Type           | Required | Default                 | Note |
| :------------ | :--------------| :------: | :---------------------- | :-------------|
| `imageUrl`    | `string`       |     O    | -                       | 이미지 Url      |
| `title`       | `string`       |     O    | -                       | 제목           |
| `author`      | `string`       |     O    | -                       | 저자           |
| `imageAlt`     | `string`      |     X    | `"card thumbnail"`      | 이미지 이름      |
| `onClick`     | `() => void`   |     X    | -       | 클릭할 때의 기능   |

#### Usage

```tsx
<Normal
  imageUrl={sampleBook}
  title="아주 보통의 하루"
  author="작가 이름"
/>

<Normal
 imageUrl="https://covers.openlibrary.org/b/isbn/9780156012195-M.jpg"
 title="The Little Prince"
 author="Antoine de Saint-Exupéry"
/>

 <Normal
  imageUrl="https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg"
  title="아주 긴 제목이 들어갔을 때 두 줄까지 말줄임 처리가 잘 되는지 확인하기 위한 테스트용 제목입니다"
  author="아주 긴 저자명 테스트용"
  onClick={() => { console.log("normal clicked");}}
/>
```

### [ Book/List ]

#### Path

`src/components/content/Card/Book/List.tsx`

#### Props

| Name       | Type                                       | Required | Default | Note |
| :----------| :---------------------------------------------| :------: | :------ | :---------------------- |
| `imageUrl` | `string`                                      |     O    | -       | 이미지 url   |
| `title`    | `string`                                      |     O    | -       | 제목   |
| `author`   | `string`                                      |     O    | -       | 저자   |
| `type`     | `"NONE" \| "SEARCH" \| "LIBRARY" \| "REPORT"` |     O    | -       | 제목 리스트에서 사용하는 종류 |
| `typeLabel`| `string`                                      |     X    | `null`  | 기록에서 도서 선택 페이지에서 독서 전 / 독서 중 / 완독 |
| `imageAlt` | `string`                                      |     X    | -       | 이미지 이름   |
| `onClick`  | `() => void`                                  |     X    | -       | 클릭했을 때의 기능   |

#### Usage

```tsx
<BookList
  imageUrl={sampleBook}
  title="검색 결과 도서"
  author="저자 이름"
  type="SEARCH"
/>

<BookList
  imageUrl="https://covers.openlibrary.org/b/isbn/9780156012195-M.jpg"
  title="서재 도서"
  author="Antoine de Saint-Exupéry"
  type="LIBRARY"
  typeLabel="01:00:30"
/>

<BookList
  imageUrl="https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg"
  title="아이콘 없이 라벨만 있는 경우"
  author="Yuval Noah Harari"
  type="REPORT"
  typeLabel="완독"
/>

<BookList
  imageUrl="https://covers.openlibrary.org/b/isbn/9780439554930-M.jpg"
  title="아이콘도 라벨도 없는 경우"
  author="J.K. Rowling"
  type="NONE"
/>

<BookList
  imageUrl={sampleBook}
  title="아주 긴 제목이 들어갔을 때 한 줄 말줄임 처리가 잘 되는지 확인하기 위한 테스트용 제목입니다"
  author="아주 긴 저자명 테스트"
  type="SEARCH"
  typeLabel="읽는 중"
  onClick={() => {console.log("book list clicked");}}
/>
```

### [ Focus ]

#### Path

`src/components/content/Card/Book/List/Focus.tsx`

#### Props

| Name       | Type              | Required | Default     | Note |
| :----------| :-----------------| :------: | :---------- | :---------------------- |
| `imageUrl` | `string`          |     O    | -           | 이미지 url   |
| `imageAlt` | `string`          |     X    | -           | 이미지 이름   |
| `timeText` | `string`          |     O    | -           | 시간   |
| `title`    | `string`          |     O    | -           | 제목 |
| `author`   | `string`          |     O    | -           | 저자 |
| `onClick`  | `() => void`      |     X    | -           | 클릭했을 때의 기능   |

#### Usage

```tsx
<Focus
  imageUrl="https://covers.openlibrary.org/b/isbn/9780156012195-M.jpg"
  timeText="01:24:12"
  title="The Little Prince"
  author="Antoine de Saint-Exupéry"
/>

<Focus
  imageUrl="https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg"
  timeText="12:59:59"
  title="아주 긴 제목이 들어갔을 때 한 줄 말줄임 처리가 잘 되는지 확인하기 위한 테스트용 제목입니다"
  author="아주 긴 저자명 테스트"
  onClick={() => { console.log("media info card clicked");}}
/>
```

### [ Report ]

#### Path

`src/components/content/Card/Book/List/Report.tsx`

#### Props

| Name           | Type              | Required | Default         | Note |
| :--------------| :-----------------| :------: | :-------------- | :---------------------- |
| `imageUrl`     | `string`          |     O    | -               | 이미지 url   |
| `title`        | `string`          |     O    | -               | 제목 |
| `author`       | `string`          |     O    | -               | 저자 |
| `recent`       | `string`          |     O    | -               | 최근 리뷰 |
| `reviewNumber` | `number`          |     O    | -               | 리뷰 수 |
| `imageAlt`     | `string`          |     X    |`"report cover"` | 이미지 이름 |
| `onClick`      | `() => void`      |     X    | -               | 클릭했을 때의 기능   |

#### Usage

```tsx
<Report
  imageUrl="https://covers.openlibrary.org/b/isbn/9780156012195-M.jpg"
  title="아주 긴 제목이 들어갔을 때 한 줄 말줄임 처리가 잘 되는지 확인하는 테스트용 제목입니다"
  author="아주 긴 저자명 테스트"
  recent="이 문장도 최근 리포트가 길어졌을 때 두 줄까지 자연스럽게 말줄임 처리되는지 확인하기 위한 테스트용 문장입니다."
  reviewNumber={3}
/>

<Report
  imageUrl="https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg"
  title="나는 오늘 어디까지라도 달릴 수 있어"
  author="윤지한"
  recent="최근 리포트 문장입니다. 두 줄 영역 안에서 얼마나 자연스럽게 정리되는지 확인합니다."
  reviewNumber={99}
  onClick={() => {console.log("report clicked");}}/>
```

### [ Report/List ]

#### Path
`src/components/content/Card/Report/List.tsx`

#### Props
| Name            | Type                 | Required | Default     | Note              |
| :-------------- | :------------------- | :------: | :---------- | :--------------   |
| `date`          | `string`             |     O    | -           | chip의 사이즈       |
| `emoji`         | `string`             |     O    | -           | emoji 문자       |
| `variant`       | `"yellow" \| "pink" \| "green" \| "blue" \| "red" \| "none"` |     X    |  `yellow`          | emoji 색상       |
| `review`        | `string`             |     O    | -           | emoji 옆 텍스트   |
| `image`         | `string[]`           |     X    |`[]`         | chip의 비활성화/활성화 여부      |
| `onClick`       | `() => void`         |     X    | -           | 해당 컴포넌트 눌럿을 때의 함수  |

#### Usage
```tsx
<ReportList
  date="25.09.13"
  emoji="(T_T)"
  variant="blue"
  review="생각이 많아서 초반에는 잘 안 읽혔는데, 중간부터 조금씩 흐름을 탔다. 마지막 문장이 특히 오래 남았다."
  images={[sampleBook]}
/>

<ReportList
  date="25.09.14"
  emoji="(>_<)"
  variant="red"
  review="오늘 기록은 이미지 여러 장이 들어갔을 때의 레이아웃을 확인하기 위한 테스트입니다. 줄 수가 늘어나면 카드 높이도 자연스럽게 커져야 합니다."
  images={[
    sampleBook,
    "https://covers.openlibrary.org/b/isbn/9780156012195-M.jpg",
    "https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg",
    "https://covers.openlibrary.org/b/isbn/9780439554930-M.jpg",
    "https://covers.openlibrary.org/b/isbn/9780140449136-M.jpg",
  ]}
/>
```



### [ SectionHeader ]

#### Path

`src/components/content/InformationText/SectionHeader.tsx`

#### Props

| Name          | Type                               | Required | Default | Note                    |
| :------------ | :--------------------------------- | :------: | :------ | :---------------------- |
| `size`        | `"13" \| "14" \| "16" \| "20" \|`  |     O    | -       | 컴포넌트 사이즈             |
| `top`         | `ReactNode`                        |     O    | -       | 윗 칸  |
| `bottom`      | `ReactNode`                        |     X    | -       | 아래 칸                |
| `onToggle`    | `(open: boolean) => void`          |     X    | -       | 토글 내렸을 때의 함수         |
| `onClick`     | `() => void`                       |     X    | -       | 해당 컴포넌트 눌럿을 때의 함수  |

#### Usage

```tsx
//size 13 (토글 없음, 원하면 onClick 추가 가능)
<SectionHeader
  size="13"
  top={<span>Text</span>}
  bottom={<span>Text</span>}
/>

//size 14 (토글 잇음, 밑 설명단 없음)
<SectionHeader
  size="14"
  top={<CustomTitle />}
 />

//size 16 (토글 있음, 밑 설명단 있음)
<SectionHeader
  size="16"
  top={<span>제목</span>}
  bottom={<CustomDescription />}
/> 
```

### [ Information Section ]

#### Path

`src/components/content/InformationText/InformationSection.tsx`

#### Props

| Name          | Type                                | Required | Default | Note                    |
| :------------ | :---------------------------------- | :------: | :------ | :---------------------- |
| `flow`        | `"vertical" \| "horizontal" `       |     O    | -       | 수직/수평 선택             |
| `top`         | `string`                            |     O    | -       | 위 또는 왼쪽 텍스트   |
| `bottom`      | `string`                            |     O    | -       | 아래 또는 오른쪽 테스트               |
| `onToggle`    | `(open: boolean) => void`           |     X    | -       | 토글 내렸을 때의 함수         |
| `onClick`     | `() => void`                        |     X    | -       | 해당 컴포넌트 눌럿을 때의 함수  |

#### Usage

```tsx
//vertical
 <InformationSection
  flow="vertical"
  top="Text"
  bottom="세로형 설명 텍스트입니다."
  onClick={() => { console.log("vertical click");}}
  onToggle={(open) => { console.log("vertical toggle:", open); }}
/>

//horizontal
<InformationSection
  flow="horizontal"
  top="Text"
  bottom="가로형 설명 텍스트입니다."
/>
```



### [ DayOfTheWeek ]

#### Path

`components/content/Calendar/Resource/DayOfTheWeek.tsx`

#### Props

| Name    | Type       | Required  | Default | Note    |
| :------ | :--------- | :-------: | :------ | :------ |
| text    | `string`   |     O     |   -     |   요일   |

#### Usage

```tsx
<DayOfTheWeek text="T" />
```

### [ Day ]

#### Path

`components/content/Calendar/Resource/Day.tsx`

#### Props

| Name    | Type       | Required  | Default | Note    |
| :------ | :--------- | :-------: | :------ | :------ |
| text    | `string`   |     O     |   -     |   요일   |
| disable | `boolean`  |     X     | `true`  |   활성화 유무 (비활성화 = true)   |

#### Usage

```tsx
<Day text="1" />
<Day text="M" disable={false} />
```

### [ Indicator ]

#### Path

`components/content/Calendar/Resource/Indicator.tsx`

#### Props

| Name    | Type                                               | Required  | Default | Note    |
| :------ | :------------------------------------------------- | :-------: | :------ | :------ |
| percent | `"none" \| "0" \| "25" \| "50" \| "75" \| "100"`   |     O     |   -     |  퍼센트   |

#### Usage

```tsx
<Indicator percent="0" />
```

### [ IndicatorSet ]

#### Path

`components/content/Calendar/Resource/IndicatorSet.tsx`

#### Props

| Name    | Type                                               | Required  | Default | Note    |
| :------ | :------------------------------------------------- | :-------: | :------ | :------ |
| day     | `string`                                           |     O     |   -     |  퍼센트   |
| disble  | `boolean`                                          |     X     |  `true` |  활성화 유무   |
| percent | `"none" \| "0" \| "25" \| "50" \| "75" \| "100"`   |     X     |  `none` |  퍼센트   |

#### Usage

```tsx
<IndicatorSet day="TT"/>
<IndicatorSet day="TT" disable={false}  percent="0" />

```

### [ BookSet ]

#### Path

`components/content/Calendar/Resource/BookSet.tsx`

#### Props

| Name     | Type                      | Required  | Default   | Note    |
| :------- | :-------------------------| :-------: | :-------- | :------ |
| day      | `string`                  |     O     |   -       |  퍼센트   |
| visible  | `boolean`                 |     X     |  `false`  |   시각화 유무   |
| disble   | `boolean`                 |     X     |  `false`  |  활성화 유무   |
| count    | `"single" \| "multiple"`  |     X     |  `single` |  도서 수 여러 개 유무   |
| imageUrl | `string`                  |     X     |  -        |  도서 이미지   |
| bookNum  | `number`                  |     X     |   `0`     |  도서 개수   |

#### Usage

```tsx
<BookSet day="TT" visible={false} />

<BookSet
  day="TT"
  visible
  disable
  imageUrl="https://picsum.photos/44/64?random=1"
/>

<BookSet
  day="TT"
  visible
  disable={false}
  count="single"
  imageUrl="https://picsum.photos/44/64?random=3"
/>

<BookSet
  day="TT"
  visible
  disable={false}
  count="multiple"
  bookNum={2}
  imageUrl="https://picsum.photos/44/64?random=5"
/>
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
