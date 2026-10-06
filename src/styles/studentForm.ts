import { StyleSheet } from 'react-native';

import { colors, monoFont } from './theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingLeft: 12,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700',
    color: colors.ink,
  },
  // flexGrow: nội dung cao ít nhất bằng vùng cuộn; gap giữa các ô nhập
  content: {
    flexGrow: 1,
    gap: 18,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },

  field: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: colors.label,
  },
  input: {
    height: 52,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.surface,
    fontSize: 16,
    color: colors.ink,
  },
  // MSSV dùng font đơn cách giống chip MSSV trong danh sách
  inputMono: {
    fontFamily: monoFont,
    fontWeight: '500',
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.danger,
  },

  // Ảnh đại diện: xem trước + ô dán link, hoặc chọn ảnh từ máy
  avatarGroup: {
    gap: 10,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarEmpty: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.primaryMuted,
    borderRadius: 32,
    backgroundColor: colors.primarySoft,
  },
  avatarInput: {
    flex: 1,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.line,
  },
  orText: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.muted,
  },
  pickButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 50,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 14,
    backgroundColor: colors.surface,
  },
  pickText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },

  // Thanh dưới cùng chứa nút Lưu
  footer: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: colors.background,
  },
  saveButton: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: colors.primary,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
});
