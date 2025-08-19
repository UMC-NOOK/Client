import instance from '../../../../apis/instance';

export interface RoomInfoPatchProps {
  roomId: number;
  themeName: 'LIBRARY' | 'SUBWAY' | 'CAMPFIRE';
  hashtags: string[];
  requestBody: {
    name: string;
    description: string;
  };
}

const roomInfoPatch = async ({
  roomId,
  themeName,
  hashtags,
  requestBody,
}: RoomInfoPatchProps) => {
  try {
    const params = new URLSearchParams();
    params.append('themeName', themeName);
    hashtags.forEach((hashtag) => {
      params.append('hashtags', hashtag);
    });

    const res = await instance.patch(
      `api/reading-rooms/${roomId}?${params.toString()}`,
      requestBody,
    );

    console.log('독서방 정보 수정', res.data.result);
    return res.data.result;
  } catch (err) {
    console.log('독서방 정보 수정 에러', err);
    throw err;
  }
};

export default roomInfoPatch;
