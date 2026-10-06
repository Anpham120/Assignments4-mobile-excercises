import { Modal, Pressable, Text, View } from 'react-native';

import { Avatar } from '@/components/Avatar';
import { Icon } from '@/components/Icon';
import { useTranslation } from '@/i18n';
import { styles } from '@/styles/dialog';
import { colors } from '@/styles/theme';
import type { Student } from '@/types';

type ConfirmDialogProps = {
  visible: boolean;
  // edit: màu xanh, biểu tượng bút; delete: màu đỏ, biểu tượng thùng rác
  variant: 'edit' | 'delete';
  // Sinh viên đang được sửa/xóa, hiện kèm để người dùng biết mình đang xác nhận cho ai
  student: Pick<Student, 'fullName' | 'studentId' | 'avatar'>;
  onConfirm: () => void;
  onCancel: () => void;
};

// Hộp thoại hỏi lại trước khi sửa/xóa: chỉ bấm "Có" mới thực hiện
export function ConfirmDialog({ visible, variant, student, onConfirm, onCancel }: ConfirmDialogProps) {
  const t = useTranslation();
  const isDelete = variant === 'delete';
  const accent = isDelete ? colors.danger : colors.primary;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
      // Nút Back của Android tương đương bấm "Không"
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={[styles.confirmIcon, { backgroundColor: isDelete ? colors.dangerSoft : colors.primarySoft }]}>
            <Icon name={isDelete ? 'trash' : 'edit'} color={accent} size={28} />
          </View>
          <Text style={styles.message}>{t(isDelete ? 'confirm.delete' : 'confirm.edit')}</Text>

          <View style={styles.student}>
            <Avatar uri={student.avatar} size={32} seed={student.studentId} />
            <View style={styles.studentText}>
              <Text style={styles.studentName} numberOfLines={1}>
                {student.fullName}
              </Text>
              <Text style={styles.studentId}>{student.studentId}</Text>
            </View>
          </View>

          <View style={styles.buttons}>
            <Pressable
              style={({ pressed }) => [styles.button, styles.cancelButton, pressed && styles.pressed]}
              onPress={onCancel}
              accessibilityRole="button"
            >
              <Text style={styles.cancelText}>{t('confirm.no')}</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.button, { backgroundColor: accent }, pressed && styles.pressed]}
              onPress={onConfirm}
              accessibilityRole="button"
            >
              <Text style={styles.confirmText}>{t('confirm.yes')}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
