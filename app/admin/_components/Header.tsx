import clsx from 'clsx';

interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
}

const Header = ({ className, children }: HeaderProps) => {
  return (
    <header className={clsx('cursor-default', className)}>
      {/* TODO : 스튜디오 or 상품 수정 시 헤더 명을 ~~수정으로 바꿔줘야 함. 쿼리 스트링 사용해서 등록인지 수정인지 구분 필요. (정보 id 같은 걸 쿼리 스트링으로 넣으면 될듯) */}
      {children}
    </header>
  );
};

export default Header;
