import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Icon } from '@/components/Icon';
import { useTranslation } from '@/i18n';
import { addStudent, getStudent, updateStudent } from '@/storage/studentStorage';
import { styles } from '@/styles/studentForm';
import { colors } from '@/styles/theme';
import { hasErrors, validateStudentForm, type ValidationError } from '@/utils/validation';

type FieldProps = TextInputProps & {
  label: string;
  error?: string;
  mono?: boolean;
};

// Ô nhập kèm nhãn phía trên và dòng báo lỗi màu đỏ bên dưới, có lỗi thì viền cũng đỏ
function Field({ label, error, mono, ...inputProps }: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, mono && styles.inputMono, !!error && styles.inputError]}
        placeholderTextColor={colors.placeholder}
        accessibilityLabel={label}
        {...inputProps}
      />
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

// Trang 3: thêm mới (không có tham số id) hoặc sửa (id của sinh viên cần sửa)
export default function StudentFormScreen() {
  const t = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  // Ảnh đại diện: dán link hoặc chọn từ máy; chọn cách nào thì cách còn lại được xóa
  const [avatarLink, setAvatarLink] = useState('');
  const [avatarFile, setAvatarFile] = useState('');
  // Chưa bấm Lưu thì chưa báo lỗi; bấm rồi thì lỗi cập nhật ngay khi gõ
  const [submitted, setSubmitted] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  // Sửa: nạp thông tin sinh viên vào form
  useEffect(() => {
    if (!id) return;
    getStudent(id).then((student) => {
      if (!student) return;
      setFullName(student.fullName);
      setStudentId(student.studentId);
      setEmail(student.email);
      if (/^https?:\/\//i.test(student.avatar)) setAvatarLink(student.avatar);
      else setAvatarFile(student.avatar);
    });
  }, [id]);

  const avatar = avatarFile || avatarLink.trim();
  const errors = submitted ? validateStudentForm({ fullName, studentId, email }) : {};
  const errorText = (error?: ValidationError) => (error ? t(`errors.${error.key}`, error.params) : undefined);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (result.canceled) return;
    setAvatarFile(result.assets[0].uri);
    setAvatarLink('');
  };

  const save = async () => {
    setSaving(true);
    const input = {
      // Gộp nhiều dấu cách liền nhau thành một
      fullName: fullName.trim().replace(/\s+/g, ' '),
      studentId: studentId.trim(),
      email: email.trim(),
      avatar,
    };
    try {
      if (id) await updateStudent(id, input);
      else await addStudent(input);
      router.back();
    } finally {
      setSaving(false);
    }
  };

  const handleSave = () => {
    setSubmitted(true);
    Keyboard.dismiss();
    if (hasErrors(validateStudentForm({ fullName, studentId, email }))) return;
    // Sửa thì phải hỏi xác nhận trước; thêm mới thì lưu luôn
    if (id) setConfirmVisible(true);
    else save();
  };

  const handleConfirm = () => {
    setConfirmVisible(false);
    save();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel={t('form.back')}
          >
            <Icon name="back" color={colors.ink} size={24} />
          </Pressable>
          <Text style={styles.title}>{t(id ? 'form.editTitle' : 'form.addTitle')}</Text>
        </View>

        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Field
            label={t('form.fullName')}
            placeholder={t('form.fullNamePlaceholder')}
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            error={errorText(errors.fullName)}
          />
          <Field
            label={t('form.studentId')}
            placeholder={t('form.studentIdPlaceholder')}
            value={studentId}
            onChangeText={setStudentId}
            autoCapitalize="characters"
            autoCorrect={false}
            mono
            error={errorText(errors.studentId)}
          />
          <Field
            label={t('form.email')}
            placeholder={t('form.emailPlaceholder')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={errorText(errors.email)}
          />

          <View style={styles.avatarGroup}>
            <Text style={styles.label}>{t('form.avatar')}</Text>
            <View style={styles.avatarRow}>
              {avatar ? (
                <Avatar uri={avatar} size={64} seed={studentId.trim()} />
              ) : (
                <View style={styles.avatarEmpty}>
                  <Icon name="user" color={colors.primary} size={28} />
                </View>
              )}
              <TextInput
                style={[styles.input, styles.avatarInput]}
                placeholder={t('form.avatarPlaceholder')}
                placeholderTextColor={colors.placeholder}
                accessibilityLabel={t('form.avatar')}
                value={avatarLink}
                onChangeText={(text) => {
                  setAvatarLink(text);
                  setAvatarFile('');
                }}
                keyboardType="url"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={styles.orRow}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>{t('form.or')}</Text>
              <View style={styles.orLine} />
            </View>
            <Pressable
              style={({ pressed }) => [styles.pickButton, pressed && styles.pressed]}
              onPress={pickImage}
              accessibilityRole="button"
            >
              <Icon name="upload" color={colors.primary} />
              <Text style={styles.pickText}>{t('form.pickImage')}</Text>
            </Pressable>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
            style={({ pressed }) => [styles.saveButton, (pressed || saving) && styles.pressed, saving && styles.disabled]}
            onPress={handleSave}
            disabled={saving}
            accessibilityRole="button"
          >
            <Text style={styles.saveText}>{t('form.save')}</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      <ConfirmDialog
        visible={confirmVisible}
        variant="edit"
        student={{ fullName: fullName.trim(), studentId: studentId.trim(), avatar }}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmVisible(false)}
      />
    </SafeAreaView>
  );
}
