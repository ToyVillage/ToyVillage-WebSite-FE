import { Logo } from "@/components/Logo";
import FooterFence from "@/assets/FooterFence.svg";

export default function Footer() {
  return (
    <>
      <div className="overflow-hidden flex justify-center" aria-hidden="true">
        <img src={FooterFence.src} alt="" className="shrink-0" />
      </div>
      <footer
        className="w-full bg-main-forest-green text-white/90 py-[35] px-[60]"
        aria-label="사이트 푸터"
      >
        <div className="max-w-[1200] mt-[5]">

          <div className="mb-6">
            <Logo className="text-white w-[180] h-auto mb-2" />
            <p className="text-body-3 text-main-light-green">교감하며 즐기는 테마파크</p>
          </div>

          <address className="not-italic flex justify-between md:flex-row items-end gap-6">

            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span className="text-body-3 text-main-light-green">상호 : 주식회사 토이빌리지</span>
              <span className="text-body-3 text-main-light-green hidden md:inline" aria-hidden="true">|</span>
              <span className="text-body-3 text-main-light-green">대표자 : 조국진</span>
              <span className="text-body-3 text-main-light-green hidden md:inline" aria-hidden="true">|</span>
              <span className="text-body-3 text-main-light-green">주소 : 대구광역시 동구 혁신대로 468 (대림동)</span>
            </div>

            <div className="text-right">
              <p className="text-body-3 text-main-light-green">
                TEL : <a href="tel:053-964-0099" className="hover:underline">053-964-0099</a>
              </p>
              <p className="text-body-3 text-main-light-green">FAX : 053-962-3344</p>
            </div>

          </address>
        </div>
      </footer>
    </>
  );
}
