import Svg, { Circle, Line, Path, Polyline, Rect } from 'react-native-svg';

// Bộ icon nét (kiểu Feather) vẽ bằng SVG, đúng các hình trong bản thiết kế đã duyệt
const ICONS = {
  edit: <Path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />,
  trash: (
    <>
      <Polyline points="3 6 5 6 21 6" />
      <Path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <Line x1="10" y1="11" x2="10" y2="17" />
      <Line x1="14" y1="11" x2="14" y2="17" />
    </>
  ),
  plus: (
    <>
      <Line x1="12" y1="5" x2="12" y2="19" />
      <Line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  back: (
    <>
      <Line x1="19" y1="12" x2="5" y2="12" />
      <Polyline points="12 19 5 12 12 5" />
    </>
  ),
  upload: (
    <>
      <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <Polyline points="17 8 12 3 7 8" />
      <Line x1="12" y1="3" x2="12" y2="15" />
    </>
  ),
  user: (
    <>
      <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <Circle cx="12" cy="7" r="4" />
    </>
  ),
  users: (
    <>
      <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <Circle cx="9" cy="7" r="4" />
      <Path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  mail: (
    <>
      <Path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <Polyline points="22,6 12,13 2,6" />
    </>
  ),
  idCard: (
    <>
      <Rect x="3" y="5" width="18" height="14" rx="2" />
      <Circle cx="9" cy="11" r="2" />
      <Path d="M6 16c.6-1.4 1.8-2 3-2s2.4.6 3 2" />
      <Line x1="15" y1="10" x2="18" y2="10" />
      <Line x1="15" y1="14" x2="18" y2="14" />
    </>
  ),
};

export type IconName = keyof typeof ICONS;

type IconProps = {
  name: IconName;
  color: string;
  size?: number;
  strokeWidth?: number;
};

export function Icon({ name, color, size = 20, strokeWidth = 2 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name]}
    </Svg>
  );
}
