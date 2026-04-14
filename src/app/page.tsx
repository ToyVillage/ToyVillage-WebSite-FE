import Image from "next/image";
import a from "@/shared/assets/aaa.png"

export default function Home() {
  return (
    <main>
      <section className="w-full h-[782px] bg-[#1A1A1A] ">
        <div className="relative w-fit overflow-hidden">
          <Image
            src={a}
            alt="프로필 사진"
            placeholder="blur"
            className="block" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 via-50% to-black/80 pointer-events-none" />
        </div>

      </section>

      <section className="w-full h-[1000px] bg-white p-20">
        <h2 className="text-title-2 text-black">Content Area</h2>
      </section>
    </main>
  );
}