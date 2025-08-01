import MyReadingRoomCardList from '../components/views/MyReadingRoomCardList';
//import CreateReadingRoom from '../components/views/CreateReadingRoom';

const ReadingRoom = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex items-center justify-center">
        <MyReadingRoomCardList />
      </div>
    </div>
  );
};

export default ReadingRoom;
