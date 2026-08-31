// Client/src/components/search/MyLibraryListSection.tsx

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import bookCover from "../../assets/search/mock_bookcover.svg";

import type { LibraryHomeSection } from "../../api/search";

type Props = {
  sections: LibraryHomeSection[];
};

type LibraryBook =
  LibraryHomeSection["items"][number];

const LIMIT = 5;

function SectionBlock({
  title,
  items,
}: {
  title: string;
  items: LibraryHomeSection["items"];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <span className="text-label-13-b text-gray-90">
        {title}
      </span>

      <HorizontalBookScroller
        books={items}
      />
    </div>
  );
}

function HorizontalBookScroller({
  books,
}: {
  books: LibraryHomeSection["items"];
}) {
  const navigate = useNavigate();

  const slicedBooks = useMemo(
    () => books.slice(0, LIMIT),
    [books],
  );

  const handleBookClick = (
    book: LibraryBook,
  ) => {
    console.log(
      "내 서재 도서 클릭됨:",
      book,
    );

    if (book.bookId != null) {
      const targetPath =
        `/library/${book.bookId}?type=bookId`;

      console.log(
        "상세 페이지 이동:",
        targetPath,
      );

      navigate(targetPath);

      return;
    }

    if (book.isbn13) {
      const targetPath =
        `/library/${book.isbn13}?type=isbn13`;

      console.log(
        "상세 페이지 이동:",
        targetPath,
      );

      navigate(targetPath);

      return;
    }

    console.error(
      "bookId와 isbn13이 모두 없습니다.",
      book,
    );
  };

  return (
    <div
      className={[
        "w-[calc(100%+16px)] -mr-4",
        "overflow-x-auto overflow-y-hidden",
        "overscroll-x-contain",
        "select-none",
        "[scrollbar-width:none]",
        "[-ms-overflow-style:none]",
        "[&::-webkit-scrollbar]:hidden",
      ].join(" ")}
    >
      <div className="flex w-max items-start gap-2 pr-4">
        {slicedBooks.map(
          (book, index) => (
            <button
              key={
                book.bookId ??
                book.isbn13 ??
                index
              }
              type="button"
              className="flex w-25 shrink-0 flex-col items-start text-left"
              onClick={() => {
                handleBookClick(book);
              }}
            >
              <img
                src={
                  book.coverUrl ||
                  bookCover
                }
                alt={
                  book.title ||
                  "도서 표지"
                }
                draggable={false}
                className="pointer-events-none h-36 w-25 rounded-xs object-cover"
                onError={(event) => {
                  event.currentTarget.src =
                    bookCover;
                }}
              />

              <div className="pointer-events-none mt-1 flex w-full flex-col items-start">
                <span className="line-clamp-2 w-full break-keep text-body-14-m text-gray-90">
                  {book.title}
                </span>

                <span className="mt-0.5 w-full truncate text-body-12-r text-gray-70">
                  {book.author}
                </span>
              </div>
            </button>
          ),
        )}
      </div>
    </div>
  );
}

export default function MyLibraryListSection({
  sections,
}: Props) {
  return (
    <section className="flex w-full flex-col items-start gap-8 pt-8">
      {sections.map((section) => (
        <SectionBlock
          key={section.type}
          title={section.title}
          items={section.items}
        />
      ))}
    </section>
  );
}