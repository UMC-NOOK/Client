import React, { useState } from 'react';
import GridView from '../components/GridView';
import VerticalView from '../components/VerticalView';
import TopBar from '../components/topbar/TopBar';

type LibraryView = 'grid' | 'vertical';
type UserNameProps = string;

const Library = () => {
  const [view, setView] = useState<LibraryView>('grid');
  const [userName, setUserName] = useState<UserNameProps>('경민');
  return (
    <>
      <div className="flex justify-center h-full">
        <div className="flex flex-col w-[1060px] justify-center items-center mt-5 mb-40 gap-10">
          <TopBar userName={userName} />
          {view === 'grid' ? <GridView /> : <VerticalView />}
        </div>
      </div>
    </>
  );
};

export default Library;
