// Quy tắc nhập liệu của form sinh viên.
// Hàm chỉ trả về mã lỗi (kèm tham số nếu có); câu chữ hiển thị nằm ở src/i18n để đổi ngôn ngữ theo máy.

export type ValidationErrorKey =
  | 'fullNameRequired'
  | 'fullNameInvalid'
  | 'studentIdRequired'
  | 'studentIdLength'
  | 'studentIdPrefix'
  | 'studentIdYear'
  | 'studentIdDigits'
  | 'emailRequired'
  | 'emailInvalid'
  | 'emailDomain'
  | 'emailStudentId'
  | 'emailMismatch';

export type ValidationError = {
  key: ValidationErrorKey;
  params?: Record<string, string | number>;
};

export type StudentFormValues = {
  fullName: string;
  studentId: string;
  email: string;
};

export type StudentFormErrors = Partial<Record<keyof StudentFormValues, ValidationError>>;

// Đuôi email của trường: <MSSV>@st.cmcu.edu.vn
export const EMAIL_DOMAIN = 'st.cmcu.edu.vn';

// Họ tên: chỉ gồm chữ cái (có dấu tiếng Việt) và dấu cách; \p{M} để nhận cả dấu gõ rời (NFD)
const FULL_NAME_PATTERN = /^[\p{L}\p{M}]+(?:\s+[\p{L}\p{M}]+)*$/u;

export function validateFullName(value: string): ValidationError | undefined {
  const name = value.trim();
  if (name.length === 0) return { key: 'fullNameRequired' };
  if (!FULL_NAME_PATTERN.test(name)) return { key: 'fullNameInvalid' };
  return undefined;
}

// Định dạng MSSV: B hoa + 2 chữ cái a-z (hoa hoặc thường) + 2 số từ 22-26 + 4 chữ số 0-9 (vd: BIT240002)
// Kiểm tra từng phần để báo đúng chỗ sai, dễ hiểu hơn một câu chung chung
export function validateStudentId(value: string): ValidationError | undefined {
  const id = value.trim();
  if (id.length === 0) return { key: 'studentIdRequired' };
  if (id.length !== 9) return { key: 'studentIdLength', params: { count: id.length } };
  if (!/^B[A-Za-z]{2}$/.test(id.slice(0, 3))) return { key: 'studentIdPrefix' };
  if (!/^2[2-6]$/.test(id.slice(3, 5))) return { key: 'studentIdYear' };
  if (!/^[0-9]{4}$/.test(id.slice(5))) return { key: 'studentIdDigits' };
  return undefined;
}

// Email phải đúng dạng <MSSV>@st.cmcu.edu.vn, trong đó phần trước @ đúng định dạng MSSV và trùng ô MSSV đã nhập
export function validateEmail(value: string, studentId: string): ValidationError | undefined {
  const email = value.trim();
  if (email.length === 0) return { key: 'emailRequired' };
  // Dạng chung: đúng một dấu @, hai bên không rỗng, không có dấu cách
  if (!/^[^\s@]+@[^\s@]+$/.test(email)) return { key: 'emailInvalid' };

  const [local, domain] = email.split('@');
  if (domain.toLowerCase() !== EMAIL_DOMAIN) return { key: 'emailDomain' };
  if (validateStudentId(local)) return { key: 'emailStudentId' };

  // MSSV chưa hợp lệ thì lỗi đã báo ở ô MSSV, không báo thêm lỗi "khác MSSV" ở đây
  const id = studentId.trim();
  if (!validateStudentId(id) && local.toLowerCase() !== id.toLowerCase()) {
    return { key: 'emailMismatch', params: { email: `${id}@${EMAIL_DOMAIN}` } };
  }
  return undefined;
}

export function validateStudentForm(values: StudentFormValues): StudentFormErrors {
  return {
    fullName: validateFullName(values.fullName),
    studentId: validateStudentId(values.studentId),
    email: validateEmail(values.email, values.studentId),
  };
}

export function hasErrors(errors: StudentFormErrors): boolean {
  return Object.values(errors).some(Boolean);
}
