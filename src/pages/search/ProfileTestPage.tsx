import Profile from "../../components/content/Profile/Profile";

export default function ProfileTestPage() {
  return (
    <main className="flex min-h-screen flex-col gap-6">
      <h1 className="text-title-20-b text-gray-90">Profile Test</h1>

      <section className="flex flex-col gap-4">
        <h2 className="text-label-14-sb text-gray-80">active = true</h2>
        <div className="flex flex-wrap gap-6">
          <Profile
            imageUrl="https://picsum.photos/56/56?random=1"
            name="수연"
            time="09:00"
          />
          <Profile
            active
            imageUrl="https://picsum.photos/56/56?random=2"
            name="김수연"
            time="10:30"
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-label-14-sb text-gray-80">active = false</h2>
        <div className="flex flex-wrap gap-6">
          <Profile
            active={false}
            imageUrl="https://picsum.photos/56/56?random=3"
            name="수연"
            time="09:00"
          />
          <Profile
            active={false}
            imageUrl="https://picsum.photos/56/56?random=4"
            name="김수연"
            time="10:30"
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-label-14-sb text-gray-80">긴 이름 테스트</h2>
        <div className="flex flex-wrap gap-6">
          <Profile
            active
            imageUrl="https://picsum.photos/56/56?random=5"
            name="아주긴이름테스트유저"
            time="12:45"
          />
          <Profile
            active={false}
            imageUrl="https://picsum.photos/56/56?random=6"
            name="아주긴이름테스트유저"
            time="18:20"
          />
        </div>
      </section>
    </main>
  );
}