import { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개",
  description: "토이 빌리지가 추구하는 가치와 이야기를 소개합니다.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="relative h-[60vh] min-h-[500px] w-full bg-[#1A1A1A] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/about-hero.jpg')] bg-cover bg-center opacity-40" />
        
        <div className="relative z-10 text-center space-y-4">
          <span className="text-main-green font-bold tracking-widest text-body-3 uppercase">
            Our Story
          </span>
          <h1 className="text-title-1 text-white font-title">
            동물과 사람이 함께 <br /> 
            행복한 마을, <span className="text-main-green">Toy Village</span>
          </h1>
        </div>
      </section>

      <section className="w-full bg-white py-24 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden shadow-xl">
            <div className="w-full h-full bg-[url('/images/about-story.jpg')] bg-cover bg-center" />
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-title-2 text-black font-title leading-tight">
                단순한 관람을 넘어 <br />
                교감의 가치를 전합니다.
              </h2>
              <p className="text-body-2 text-gray-600 leading-relaxed">
                토이 빌리지는 생명의 소중함을 배우고, 도심 속에서 자연을 만끽할 수 있는 
                특별한 공간입니다. 우리는 단순히 동물을 보여주는 것에 그치지 않고, 
                서로의 온기를 나누는 진정한 '교감'을 목표로 합니다.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-8">
              <div>
                <h4 className="text-title-3 text-main-forest-green font-title">120+</h4>
                <p className="text-body-3 text-gray-400">보호 중인 동물 친구들</p>
              </div>
              <div>
                <h4 className="text-title-3 text-main-forest-green font-title">50k+</h4>
                <p className="text-body-3 text-gray-400">연간 방문객 수</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}