import comingSoonImage from "../../assets/images/coming-soon.png";

export default function GroupPage() {
  return (
    <main className="flex min-h-[calc(100dvh-245px-env(safe-area-inset-top)-env(safe-area-inset-bottom))] items-center justify-center">
      <section className="flex w-full flex-col items-center gap-5 text-center">
        <img
          src={comingSoonImage}
          alt=""
          aria-hidden
          className="h-67.5 w-full object-contain"
          draggable={false}
        />
        <p className="text-label-14-sb text-gray-60">
          아직 준비 중이에요!
        </p>
      </section>
    </main>
  );
}
