# 🎨 공용 컴포넌트 가이드 (Shared Component Guide)

> 이 문서는 프로젝트 내 공용 컴포넌트의 사용법, 위치, 담당자를 명시합니다.
> 디자인 구현 사항은 상단 **Design** 링크의 피그마(Figma)를 참고하세요.

## 📌 목차 (Table of Contents)

1. [Atomic](#1-atomic-elements)
2. [Layout](#2-layout)
3. [Input & Forms](#3-input--forms)

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

| Name | Type | Required | Default | Note |
| :--- | :--- | :------: | :------ | :--- |
|      |      |          |         |      |

#### Usage

```tsx

```

### [ Dim ]

#### Path

`components/layout/Dim.tsx`

#### Props

| Name | Type | Required | Default | Note |
| :--- | :--- | :------: | :------ | :--- |
|      |      |          |         |      |

#### Usage

```tsx

```

### [ Mask Gradient ]

#### Path

`components/layout/MaskGradient.tsx`

#### Props

| Name | Type | Required | Default | Note |
| :--- | :--- | :------: | :------ | :--- |
|      |      |          |         |      |

#### Usage

```tsx

```

---

## 3. Input

> - **Design**: https://www.figma.com/design/VX3WcpitSSgsYxFoXlbgcA/NOOK-UI--%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9A%A9-?node-id=1268-10175&m=dev
> - **Author**: 박수지

### [ Search Field ]

#### Path

`요기에 경로 입력`

#### Props

| Name | Type | Required | Default | Note |
| :--- | :--- | :------: | :------ | :--- |
|      |      |          |         |      |

#### Usage

```tsx

```

### [ Text Input - Text Field ]

#### Path

`요기에 경로 입력`

#### Props

| Name | Type | Required | Default | Note |
| :--- | :--- | :------: | :------ | :--- |
|      |      |          |         |      |

#### Usage

```tsx

```
