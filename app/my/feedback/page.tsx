'use client';

import { Icon_ChevronDown } from '@/assets/icons';
import { Appbar } from '@/components/Appbar';
import { BaseItem, Dropbox } from '@/components/molecule/Dropbox';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MyFeedbackPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const [email, setEmail] = useState('');
  const [selectedItem, setSelectedItem] = useState<BaseItem | null>(null);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // 폼 제출 핸들러
  const handleSubmit = () => {
    setIsModalOpen(true);

    // TODO: 실제 API 호출은 여기에 추가
    // submitReport({ title, email, content });
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);

    // 성공 모달이었다면 목록 페이지로 이동
    router.push('/my');
  };
  const dropdownItems = [
    { id: '1', label: '디어모먼트 서비스 칭찬', value: '1' },
    { id: '2', label: '디어모먼트 서비스 불편/제안', value: '2' },
    { id: '3', label: '시스템 개선 의견', value: '3' },
    { id: '4', label: '시스템 오류 제보', value: '4' },
  ];
  return (
    <div className="container min-h-screen flex flex-col">
      <Appbar
        leftIcon={
          <Link href="/my">
            <Icon_ChevronDown className="rotate-90 cursor-pointer" />
          </Link>
        }
        title="고객의 소리"
      />
      <main className="flex-1 px-[2rem] py-[2.8rem]">
        <Dropbox dropdownItems={dropdownItems} selectedItem={selectedItem} onChangeProps={setSelectedItem} />
        <Textarea
          placeholder="의견을 입력해주세요"
          maxLength={1000}
          onChange={onChangeContent}
          value={content}
          className="mt-[1.2rem] h-[20rem]"
        />
        <div className="mt-[1.8rem]">
          <p className="text-body2Normal font-bold text-gray-90 mb-[1.2rem]">답변 받을 이메일을 입력해주세요</p>
          <Input
            type="email"
            placeholder="이메일을 입력해주세요"
            maxLength={50}
            onChange={onChangeEmail}
            value={email}
          />
        </div>
      </main>
      <button
        className="w-[32rem] h-[5.6rem] bg-red-40 text-body1Normal font-semibold text-gray-10 mx-auto mb-[1.2rem] rounded-[0.4rem] disabled:bg-gray-80 disabled:text-gray-50"
        disabled={!email || !content || !selectedItem}
        onClick={handleSubmit}
      >
        접수하기
      </button>
      <Modal
        isOpen={isModalOpen}
        title="접수 완료"
        description={<p className="py-[1.5rem]">오류 제보가 접수되었습니다.</p>}
        primaryButton={{
          text: '확인',
          onClick: handleCloseModal,
        }}
      />
    </div>
  );
}
