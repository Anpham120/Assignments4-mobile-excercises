import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Icon } from '@/components/Icon';
import { StudentDetailDialog } from '@/components/StudentDetailDialog';
import { useTranslation } from '@/i18n';
import { deleteStudent, getStudents } from '@/storage/studentStorage';
import { styles } from '@/styles/studentList';
import { colors } from '@/styles/theme';
import type { Student } from '@/types';

function Separator() {
  return <View style={styles.separator} />;
}

type StudentRowProps = {
  student: Student;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

// Một dòng: chạm vào ảnh/tên để xem chi tiết, hai nút bên phải để sửa và xóa
function StudentRow({ student, onOpen, onEdit, onDelete }: StudentRowProps) {
  const t = useTranslation();

  return (
    <View style={styles.row}>
      <Pressable
        style={({ pressed }) => [styles.rowMain, pressed && styles.pressed]}
        onPress={onOpen}
        accessibilityRole="button"
      >
        <Avatar uri={student.avatar} size={56} seed={student.studentId} />
        <View style={styles.rowText}>
          <Text style={styles.name} numberOfLines={1}>
            {student.fullName}
          </Text>
          <Text style={styles.idChip}>{student.studentId}</Text>
        </View>
      </Pressable>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.action, pressed && styles.pressed]}
          onPress={onEdit}
          accessibilityRole="button"
          accessibilityLabel={t('list.edit', { name: student.fullName })}
        >
          <View style={[styles.actionTile, styles.editTile]}>
            <Icon name="edit" color={colors.primary} />
          </View>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.action, pressed && styles.pressed]}
          onPress={onDelete}
          accessibilityRole="button"
          accessibilityLabel={t('list.delete', { name: student.fullName })}
        >
          <View style={[styles.actionTile, styles.deleteTile]}>
            <Icon name="trash" color={colors.danger} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

// Trang 1: danh sách sinh viên
export default function StudentListScreen() {
  const t = useTranslation();
  const router = useRouter();
  // null = đang đọc dữ liệu lần đầu, tránh nháy màn hình "chưa có sinh viên"
  const [students, setStudents] = useState<Student[] | null>(null);
  // Sinh viên đang xem/xóa và hộp thoại đang mở. Giữ lại sinh viên sau khi đóng để lúc mờ dần nội dung không bị trống
  const [target, setTarget] = useState<Student | null>(null);
  const [dialog, setDialog] = useState<'detail' | 'delete' | null>(null);

  // Mỗi lần màn hình hiện lại (vd: quay về từ form Thêm/Sửa) thì đọc lại danh sách
  useFocusEffect(
    useCallback(() => {
      getStudents().then(setStudents);
    }, []),
  );

  const openDialog = (student: Student, kind: 'detail' | 'delete') => {
    setTarget(student);
    setDialog(kind);
  };

  const handleDelete = async () => {
    setDialog(null);
    if (!target) return;
    await deleteStudent(target.id);
    setStudents(await getStudents());
  };

  const isEmpty = students !== null && students.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('appName')}</Text>
        {/* Chưa đọc xong thì để trống (giữ chỗ) cho tiêu đề không bị nhảy */}
        <Text style={styles.subtitle}>{students ? t('list.count', { count: students.length }) : ' '}</Text>
      </View>

      {isEmpty && (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Icon name="users" color={colors.primary} size={40} strokeWidth={1.8} />
          </View>
          <Text style={styles.emptyTitle}>{t('list.emptyTitle')}</Text>
          <Text style={styles.emptyHint}>{t('list.emptyHint')}</Text>
        </View>
      )}
      {students && students.length > 0 && (
        <View style={styles.card}>
          <FlatList
            data={students}
            keyExtractor={(student) => student.id}
            ItemSeparatorComponent={Separator}
            renderItem={({ item }) => (
              <StudentRow
                student={item}
                onOpen={() => openDialog(item, 'detail')}
                onEdit={() => router.push({ pathname: '/student-form', params: { id: item.id } })}
                onDelete={() => openDialog(item, 'delete')}
              />
            )}
          />
        </View>
      )}
      {/* Đẩy thanh "Thêm sinh viên" xuống sát đáy khi danh sách ngắn */}
      {!isEmpty && <View style={styles.spacer} />}

      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
          onPress={() => router.push('/student-form')}
          accessibilityRole="button"
        >
          <Icon name="plus" color={colors.surface} size={22} />
          <Text style={styles.addButtonText}>{t('list.add')}</Text>
        </Pressable>
      </View>

      <StudentDetailDialog visible={dialog === 'detail'} student={target} onClose={() => setDialog(null)} />
      {target && (
        <ConfirmDialog
          visible={dialog === 'delete'}
          variant="delete"
          student={target}
          onConfirm={handleDelete}
          onCancel={() => setDialog(null)}
        />
      )}
    </SafeAreaView>
  );
}
