import Image from "next/image";
import mainAnimal from "@/shared/assets/MainAnimal.png"

export default function Home() {
  return (
    <main>
      <section className="relative w-full h-195.5 overflow-hidden">
        <Image
          src={mainAnimal}
          alt="카피바라 가족이 물가에 모여있는 모습"
          placeholder="blur"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/0 via-50% to-black/80 pointer-events-none" />
        <div className="absolute bottom-40 left-30">
          <p className="text-white text-title-2">가까이서 만나고,</p>
          <p className="text-white text-title-1">
            함께 <span className="text-main-green">교감</span>하는 경험
          </p>
        </div>
      </section>

      <section className="w-full h-[1000px] bg-white p-20">
        <h2 className="text-title-2 text-black">Content Area</h2>
      </section>
    </main>
  );
}