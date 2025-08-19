import { useState } from 'react';
import GridView from '../components/library-items/GridView';
import VerticalView from '../components/library-items/VerticalView';
import TopBar from '../components/library-items/topbar/TopBar';

type LibraryView = 'grid' | 'vertical';

const Library = () => {
  const [view, setView] = useState<LibraryView>('grid');

  const handleChangeGrid = () => {
    setView('grid');
  };

  const handleChangeVertical = () => {
    setView('vertical');
  };

  return (
    <>
      <div className="flex justify-center min-h-full mt-9">
        <div className="flex flex-col w-[1060px] justify-center items-center mt-5 mb-40 gap-21">
          <TopBar
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
