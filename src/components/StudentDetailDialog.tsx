import { Modal, Pressable, Text, View } from 'react-native';

import { Avatar } from '@/components/Avatar';
import { Icon } from '@/components/Icon';
import { useTranslation } from '@/i18n';
import { styles } from '@/styles/dialog';
import { colors } from '@/styles/theme';
import type { Student } from '@/types';

type StudentDetailDialogProps = {
  visible: boolean;
  student: Student | null;
  onClose: () => void;
};

// Trang 2: thông tin chi tiết của sinh viên, mở ra khi chạm vào một dòng trong danh sách
export function StudentDetailDialog({ visible, student, onClose }: StudentDetailDialogProps) {
  const t = useTranslation();
  if (!student) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      // Android: để nền mờ phủ cả thanh trạng thái và thanh điều hướng
      statusBarTranslucent
      navigationBarTranslucent
      // Nút Back của Android (Esc trên web) cũng đóng hộp thoại
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Avatar uri={student.avatar} size={96} seed={student.studentId} />
          <Text style={styles.name}>{student.fullName}</Text>

          <View style={styles.info}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Icon name="idCard" color={colors.primary} />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>{t('detail.studentId')}</Text>
                <Text style={[styles.infoValue, styles.infoValueMono]}>{student.studentId}</Text>
              </View>
            </View>
            <View style={[styles.infoRow, styles.infoRowBorder]}>
              <View style={styles.infoIcon}>
                <Icon name="mail" color={colors.primary} />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>{t('detail.email')}</Text>
                <Text style={styles.infoValue}>{student.email}</Text>
              </View>
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
            onPress={onClose}
            accessibilityRole="button"
          >
            <Text style={styles.closeText}>{t('detail.close')}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
