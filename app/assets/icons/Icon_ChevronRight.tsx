import { cn } from '@/lib/utils';
import { SVGProps } from 'react';
import ChevronRightSvg from './svg/chevron_right.svg';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * ChevronDown 아이콘
 * @param size 아이콘 크기
 * @param props 아이콘 속성
 * @return SVG 컴포넌트
 *
 * fill 속성으로 색상 수정
 *
 * 예시)
 *
 * `<Icon_ChevronDown className="fill-gray-95" size={32} />`
 */
export default function Icon_ChevronRight({ size = 24, className, ...props }: IconProps) {
  return <ChevronRightSvg width={size} height={size} className={cn('fill-gray-95', className)} {...props} />;
}
