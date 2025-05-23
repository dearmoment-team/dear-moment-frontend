import { cn } from '@/lib/utils';
import { SVGProps } from 'react';
import HomeFilledSvg from './svg/home_filled.svg';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Home_Filled 아이콘
 * @param size 아이콘 크기
 * @param props 아이콘 속성
 * @return SVG 컴포넌트
 * 
 * fill 속성으로 배경 색상 수정
 * 
 * 예시)
 *
 * `<Icon_Home_Filled className="fill-white stroke-gray-95" size={32} />`
 */
export default function Icon_Home_Filled({
  size = 24,
  className,
  ...props
}: IconProps) {
  return <HomeFilledSvg width={size} height={size} className={cn('fill-gray-95', className)} {...props} />;
}