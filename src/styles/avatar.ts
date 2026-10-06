import { StyleSheet } from 'react-native';

import { colors } from './theme';

export const styles = StyleSheet.create({
  // Nền xám nhạt hiện trong lúc ảnh đang tải
  image: {
    backgroundColor: colors.chip,
  },
  // Hình đại diện mặc định: đầu và vai vẽ bằng hai khối, bị cắt gọn trong hình tròn
  placeholder: {
    overflow: 'hidden',
  },
  part: {
    position: 'absolute',
  },
});
