import { Icon_ChevronDown } from '@/assets/icons';
import { Appbar } from '@/components/Appbar';
import Link from 'next/link';

interface InquiryItem {
  date: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function MyInquiryPage() {
  // 문의 내역 더미 데이터
  const inquiryList: InquiryItem[] = [
    {
      date: '2024-12-15',
      title: '오에브',
      subtitle: 'Premium',
      imageUrl: '/placeholder.png',
    },
    {
      date: '2024-12-15',
      title: '오에브',
      subtitle: 'Premium',
      imageUrl: '/placeholder.png',
    },
    {
      date: '2024-12-15',
      title: '오에브',
      subtitle: 'Premium',
      imageUrl: '/placeholder.png',
    },
    {
      date: '2024-12-15',
      title: '오에브',
      subtitle: 'Premium',
      imageUrl: '/placeholder.png',
    },
  ];

  return (
    <div className="container min-h-screen flex flex-col">
      <Appbar
        leftIcon={
          <Link href="/my">
            <Icon_ChevronDown className="rotate-90 cursor-pointer" />
          </Link>
        }
        title="나의 문의내역"
      />
      <main className="flex-1 px-[2rem] py-[2.8rem]">
        <ul className="space-y-[1.6rem] mt-[4.2rem]">
          {inquiryList.map((item, index) => (
            <li key={index} className="pb-[2rem] border-b border-gray-200">
              <div className="flex justify-between items-center mb-[0.6rem]">
                <span className="text-body3Normal font-regular text-gray-60">{item.date}</span>
                <button className="px-[0.8rem] py-[0.45rem] text-label2 font-medium text-gray-60 border border-gray-300 rounded-[0.2rem]">
                  삭제
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-body1Normal font-bold text-gray-90 mb-[1.2rem]">{item.title}</h3>
                  <p className="text-body2Normal font-medium text-gray-70">{item.subtitle}</p>
                </div>
                <div className="w-[6rem] h-[6rem] bg-gray-200 relative">
                  {/* 이미지가 실제로 있다면 아래 주석을 해제하고 사용하세요 */}
                  {/* <Image 
                      src={item.imageUrl} 
                      alt={item.title} 
                      fill 
                      className="object-cover" 
                    /> */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
