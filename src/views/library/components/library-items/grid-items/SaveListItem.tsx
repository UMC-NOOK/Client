import { useNavigate } from 'react-router-dom';

interface SaveListProps {
  coverImageUrl: string;
  title: string;
  author: string;
  className?: string;
  bookId: number;
}

const SaveListItem = ({
  coverImageUrl,
  title,
  author,
  className = '',
  bookId,
}: SaveListProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/library/${bookId}`, {
      state: {
        bookId,
        coverImageUrl,
        title,
        author,
      },
    });
  };

  return (
    <div
      className={`w-[15rem] h-[24rem] bg-[rgba(66,60,53,0.2)] rounded-[8px] flex justify-center items-start ${className} mb-5 cursor-pointer`}
      onClick={handleClick}
    >
      <div className="flex flex-col justify-start items-center gap-3 pt-12 px-12">
        <div
          className="w-[10rem] h-[15rem] bg-cover bg-center bg-no-repeat rounded-[6px]"
          style={{ backgroundImage: `url(${coverImageUrl})` }}
        />
        <div className="w-full flex flex-col items-start gap-3 pb-6">
          <p className="text-sm text-nook-100 text-center line-clamp-1">
            {title}
          </p>
          <p className="text-[1.2rem] text-nook-100 text-center line-clamp-1">
            {author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SaveListItem;
