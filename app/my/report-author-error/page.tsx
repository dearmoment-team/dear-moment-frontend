'use client';

import { Icon_ChevronDown, Icon_Write } from '@/assets/icons';
import { Appbar } from '@/components/Appbar';
import Link from 'next/link';
import { useState } from 'react';

interface ReportItem {
  id: number;
  date: string;
  title: string;
  content: string;
}

export default function MyReportAuthorErrorPage() {
  // 작가 정보 오류 제보 더미 데이터
  const reportListData: ReportItem[] = [
    {
      id: 1,
      date: '2024-12-15',
      title: '작가 정보에 오류가 존재합니다.',
      content:
        'text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text',
    },
    {
      id: 2,
      date: '2024-12-15',
      title: '작가 정보에 오류가 존재합니다.',
      content:
        'text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text',
    },
  ];

  // 펼쳐진 항목 ID를 관리하는 상태
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  // 항목 펼침/닫힘 토글 함수
  const toggleExpand = (id: number) => {
    setExpandedIds(prevIds => (prevIds.includes(id) ? prevIds.filter(itemId => itemId !== id) : [...prevIds, id]));
  };

  // 항목이 펼쳐져 있는지 확인하는 함수
  const isExpanded = (id: number) => expandedIds.includes(id);

  return (
    <div className="container min-h-screen flex flex-col">
      <Appbar
        leftIcon={
          <Link href="/my">
            <Icon_ChevronDown className="rotate-90 cursor-pointer" />
          </Link>
        }
        title="작가 정보 오류 제보 내역"
        rightIcon={
          <Link href="/my/report-author-error/edit">
            <Icon_Write className="cursor-pointer" />
          </Link>
        }
      />
      <main className="flex-1 px-[2rem]">
        <ul className="space-y-[4rem] mt-[4.2rem]">
          {reportListData.map(item => (
            <li key={item.id} className="border-b border-gray-200 pb-[2rem]">
              <div className="flex justify-between items-center mb-[2.4rem]">
                <span className="text-body3Normal font-regular text-gray-60">{item.date}</span>
                <span className="text-label1Normal font-medium text-red-40">답변완료</span>
              </div>

              <h3 className="text-body2Normal font-bold text-gray-90 mb-[1.5rem]">{item.title}</h3>

              <details
                className="group transition-all duration-300 ease-in-out"
                open={isExpanded(item.id)}
                onClick={e => {
                  e.preventDefault();
                  toggleExpand(item.id);
                }}
              >
                <summary className="list-none cursor-pointer flex items-start justify-between">
                  <p
                    className={`text-body3Normal text-gray-70 overflow-hidden text-ellipsis mr-[1.5rem] flex-1 pt-[0.2rem] ${
                      isExpanded(item.id) ? 'whitespace-pre-line' : 'whitespace-nowrap'
                    }`}
                  >
                    {item.content}
                  </p>
                  <Icon_ChevronDown
                    className={`w-[1.8rem] h-[1.8rem] transition-transform duration-300 ease-in-out ${
                      isExpanded(item.id) ? 'rotate-180' : ''
                    }`}
                  />
                </summary>
              </details>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
