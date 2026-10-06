import { StyleSheet } from 'react-native';

import { colors, monoFont } from './theme';

// Dùng chung cho hộp thoại chi tiết sinh viên và hộp thoại xác nhận sửa/xóa
export const styles = StyleSheet.create({
  // Nền mờ phủ kín màn hình, hộp thoại nằm giữa
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: colors.scrim,
  },
  // maxWidth để màn hình rộng (web) hộp thoại không bị kéo giãn
  card: {
    width: '100%',
    maxWidth: 326,
    alignItems: 'center',
    paddingTop: 28,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderRadius: 28,
    backgroundColor: colors.surface,
  },
  pressed: {
    opacity: 0.7,
  },

  // Hộp thoại chi tiết
  name: {
    marginTop: 16,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.ink,
  },
  info: {
    alignSelf: 'stretch',
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 18,
    backgroundColor: colors.background,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  infoRowBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  infoIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.surface,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: colors.muted,
  },
  infoValue: {
    marginTop: 2,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    color: colors.ink,
  },
  infoValueMono: {
    fontFamily: monoFont,
  },
  closeButton: {
    alignSelf: 'stretch',
    height: 52,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: colors.primarySoft,
  },
  closeText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },

  // Hộp thoại xác nhận
  confirmIcon: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  message: {
    marginTop: 18,
    fontSize: 19,
    lineHeight: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.ink,
  },
  student: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: colors.background,
  },
  studentText: {
    flex: 1,
  },
  studentName: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.ink,
  },
  studentId: {
    fontFamily: monoFont,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: colors.muted,
  },
  buttons: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    gap: 12,
    marginTop: 22,
  },
  button: {
    flex: 1,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  cancelButton: {
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.ink,
  },
  confirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
  },
});
