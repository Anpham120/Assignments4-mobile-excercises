import { useState } from 'react';
import { Image, View } from 'react-native';

import { styles } from '@/styles/avatar';

// Màu của hình đại diện mặc định (nền, hình người); mỗi sinh viên một màu cố định theo seed
const PALETTE = [
  { background: '#CFD8FF', figure: '#7F8EE6' },
  { background: '#FFD9C7', figure: '#E2865F' },
  { background: '#D3EFDD', figure: '#56B084' },
  { background: '#FBE9AE', figure: '#D2A02E' },
  { background: '#E6D6F8', figure: '#9A71D6' },
  { background: '#CDEBF2', figure: '#4FA9C2' },
];

type AvatarProps = {
  // Link ảnh hoặc đường dẫn file; rỗng hoặc tải lỗi thì vẽ hình mặc định
  uri?: string;
  size: number;
  // Chuỗi dùng để chọn màu mặc định (vd: MSSV)
  seed: string;
};

export function Avatar({ uri, size, seed }: AvatarProps) {
  // Nhớ link đã tải lỗi; đổi sang link khác thì thử tải lại
  const [failedUri, setFailedUri] = useState<string>();
  const circle = { width: size, height: size, borderRadius: size / 2 };

  if (uri && uri !== failedUri) {
    return <Image source={{ uri }} style={[styles.image, circle]} onError={() => setFailedUri(uri)} />;
  }

  const seedSum = [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const { background, figure } = PALETTE[seedSum % PALETTE.length];
  const head = size * 0.32;
  const shoulders = size * 0.714;

  return (
    <View style={[styles.placeholder, circle, { backgroundColor: background }]}>
      <View
        style={[
          styles.part,
          {
            top: size * 0.2,
            left: (size - head) / 2,
            width: head,
            height: head,
            borderRadius: head / 2,
            backgroundColor: figure,
          },
        ]}
      />
      <View
        style={[
          styles.part,
          {
            top: size * 0.607,
            left: (size - shoulders) / 2,
            width: shoulders,
            height: size * 0.536,
            borderTopLeftRadius: shoulders / 2,
            borderTopRightRadius: shoulders / 2,
            backgroundColor: figure,
          },
        ]}
      />
    </View>
  );
}
