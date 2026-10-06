export type Student = {
  // Khóa nội bộ để tìm/sửa/xóa, không hiển thị
  id: string;
  fullName: string;
  // Mã số sinh viên (MSSV)
  studentId: string;
  email: string;
  // Link ảnh (http/https) hoặc đường dẫn file ảnh trong máy; rỗng = chưa có ảnh
  avatar: string;
};

export type StudentInput = Omit<Student, 'id'>;
