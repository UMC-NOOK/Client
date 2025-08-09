import { useState } from 'react';
import GridView from '../components/library-items/GridView';
import VerticalView from '../components/library-items/VerticalView';
import TopBar from '../components/library-items/topbar/TopBar';
import useLoginStore from '../../../store/sign-in/useLoginStore';

type LibraryView = 'grid' | 'vertical';
type UserNameProps = string;

const Library = () => {
  const [view, setView] = useState<LibraryView>('grid');
  const [userName] = useState<UserNameProps>('경민');

  const handleChangeGrid = () => {
    setView((prev) => (prev = 'grid'));
  };

  const handleChangeVertical = () => {
    setView((prev) => (prev = 'vertical'));
  };

  // console.log(view);

  return (
    <>
      <div className="flex justify-center min-h-full mt-9">
        <div className="flex flex-col w-[106rem] justify-center items-center mt-5 mb-40 gap-10">
          <TopBar
            userName={userName}
            onChangeGrid={handleChangeGrid}
            onChangeVertical={handleChangeVertical}
            activeView={view}
          />
          {view === 'grid' ? <GridView /> : <VerticalView />}
        </div>
      </div>
    </>
  );
};

export default Library;
