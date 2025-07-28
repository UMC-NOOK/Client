import subway from '../../assets/readingRoom/bg/지하철.png';

const readingRoomData = [
    {
        id: 1,
        bgImg: subway,
        title: 'Read With Me',
        introduction: '매주 토요일 저녁 9시 집합 2시간 독서',
        tags: ['대학생', '루틴'],
        peopleOnLive: 1,
        peopleCount: 2,
        createdAt: new Date('2025-07-24T14:00:00'),
    },
    {
        id: 2,
        bgImg: subway,
        title: '한강 책 독파',
        introduction: '한강 작가님의 모든 책을 읽습니다.',
        tags: ['직장인', '20대', '30대'],
        peopleOnLive: 1,
        peopleCount: 1,
        createdAt: new Date('2025-07-24T13:00:00'),
    }
];

export default readingRoomData;