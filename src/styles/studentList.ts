import { StyleSheet } from 'react-native';

import { colors, monoFont } from './theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 18,
  },
  title: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: colors.ink,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: colors.muted,
  },

  // Danh sách nằm trong một thẻ bo góc; flexShrink để thẻ co lại và các dòng cuộn bên trong khi quá dài
  card: {
    flexShrink: 1,
    marginHorizontal: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 22,
    backgroundColor: colors.surface,
  },
  separator: {
    height: 1,
    backgroundColor: colors.line,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Vùng chạm để mở chi tiết: ảnh + họ tên + MSSV
  rowMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 4,
  },
  rowText: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 4,
  },
  name: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.ink,
  },
  idChip: {
    paddingHorizontal: 8,
    paddingVertical: 1,
    overflow: 'hidden',
    borderRadius: 6,
    backgroundColor: colors.chip,
    fontFamily: monoFont,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
    color: colors.label,
  },
  // Hai nút sửa/xóa xếp dọc, mỗi nút vùng chạm 44x44
  actions: {
    paddingRight: 8,
  },
  action: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTile: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  editTile: {
    backgroundColor: colors.primarySoft,
  },
  deleteTile: {
    backgroundColor: colors.dangerSoft,
  },

  // Chưa có sinh viên nào
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 48,
    paddingBottom: 48,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 48,
    backgroundColor: colors.primarySoft,
  },
  emptyTitle: {
    marginTop: 24,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.ink,
  },
  emptyHint: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    color: colors.muted,
  },

  // Thanh dưới cùng chứa nút "Thêm sinh viên"
  spacer: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: colors.background,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.primary,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
  },
  pressed: {
    opacity: 0.7,
  },
});
