interface NoticeItem {
  id: number;
  title: string;
  date: string;
}

const notices: NoticeItem[] = [
  { id: 1, title: "<토이빌리지> 즐거운 크리스마스는 토이빌리지에서 동물친구들과 함께 :)", date: "2025.12.24" },
  { id: 2, title: "<토이빌리지> 즐거운 크리스마스는 토이빌리지에서 동물친구들과 함께 :)", date: "2025.12.24" },
  { id: 3, title: "<토이빌리지> 즐거운 크리스마스는 토이빌리지에서 동물친구들과 함께 :)", date: "2025.12.24" },
  { id: 4, title: "<토이빌리지> 즐거운 크리스마스는 토이빌리지에서 동물친구들과 함께 :)", date: "2025.12.24" },
  { id: 5, title: "<토이빌리지> 즐거운 크리스마스는 토이빌리지에서 동물친구들과 함께 :)", date: "2025.12.24" },
];

export default function NoticeList() {
  return (
    <section aria-label="공지사항 목록">
      <ul>
        {notices.map((notice) => (
          <li
            key={notice.id}
            className="flex justify-between items-center px-6 py-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
          >
            <span className="text-body-2 text-black truncate mr-8">{notice.title}</span>
            <time
              dateTime={notice.date.replace(/\./g, "-")}
              className="text-body-3 text-gray-400 shrink-0"
            >
              {notice.date}
            </time>
          </li>
        ))}
      </ul>
    </section>
  );
}
