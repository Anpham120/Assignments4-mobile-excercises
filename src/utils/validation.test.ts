import {
  hasErrors,
  validateEmail,
  validateFullName,
  validateStudentForm,
  validateStudentId,
} from './validation';

describe('validateFullName', () => {
  it.each(['Phạm Duy An', 'Nguyễn Thị Thu Hà', 'Nguyen Van A', '  Lê   Văn Tám  '])(
    'chấp nhận "%s"',
    (name) => {
      expect(validateFullName(name)).toBeUndefined();
    },
  );

  it('chấp nhận chữ có dấu gõ rời (NFD)', () => {
    expect(validateFullName('Nguyễn Văn An')).toBeUndefined();
  });

  it.each(['', '   '])('báo thiếu khi "%s" là rỗng hoặc toàn dấu cách', (name) => {
    expect(validateFullName(name)).toEqual({ key: 'fullNameRequired' });
  });

  it.each(['1234', 'Nguyễn Văn 2', 'An@', 'Trần_Bình', 'An.'])('từ chối "%s" vì có số/ký tự lạ', (name) => {
    expect(validateFullName(name)).toEqual({ key: 'fullNameInvalid' });
  });
});

describe('validateStudentId', () => {
  it.each(['BIT240002', 'Bit240002', 'BCS231234', 'BAB220000', 'BZZ269999', ' BIT240002 '])(
    'chấp nhận "%s"',
    (id) => {
      expect(validateStudentId(id)).toBeUndefined();
    },
  );

  it.each(['', '   '])('báo thiếu khi "%s" là rỗng hoặc toàn dấu cách', (id) => {
    expect(validateStudentId(id)).toEqual({ key: 'studentIdRequired' });
  });

  it.each([
    ['BIT24000', 8],
    ['BIT2400022', 10],
    ['B', 1],
  ])('"%s" sai độ dài (%i ký tự)', (id, count) => {
    expect(validateStudentId(id)).toEqual({ key: 'studentIdLength', params: { count } });
  });

  // 3 ký tự đầu: chữ B hoa + 2 chữ cái a-z
  it.each(['bIT240002', 'AIT240002', 'B1T240002', 'BI2240002', 'B-T240002'])(
    '"%s" sai 3 ký tự đầu',
    (id) => {
      expect(validateStudentId(id)).toEqual({ key: 'studentIdPrefix' });
    },
  );

  // Ký tự 4-5: số từ 22 đến 26
  it.each(['BIT210002', 'BIT270002', 'BIT990002', 'BIT000002', 'BITA40002', 'BIT2A0002'])(
    '"%s" sai năm (ký tự 4-5)',
    (id) => {
      expect(validateStudentId(id)).toEqual({ key: 'studentIdYear' });
    },
  );

  // 4 ký tự cuối: chữ số 0-9
  it.each(['BIT24000A', 'BIT2400 2', 'BIT24ABCD', 'BIT24-002'])('"%s" sai 4 ký tự cuối', (id) => {
    expect(validateStudentId(id)).toEqual({ key: 'studentIdDigits' });
  });
});

describe('validateEmail', () => {
  const id = 'BIT240002';

  it.each([
    'BIT240002@st.cmcu.edu.vn',
    'Bit240002@st.cmcu.edu.vn',
    'BIT240002@ST.CMCU.EDU.VN',
    ' BIT240002@st.cmcu.edu.vn ',
  ])('chấp nhận "%s" khi MSSV là BIT240002', (email) => {
    expect(validateEmail(email, id)).toBeUndefined();
  });

  it.each(['', '   '])('báo thiếu khi "%s" là rỗng hoặc toàn dấu cách', (email) => {
    expect(validateEmail(email, id)).toEqual({ key: 'emailRequired' });
  });

  it.each([
    'abc',
    'BIT240002',
    'BIT240002@',
    '@st.cmcu.edu.vn',
    'BIT240002 @st.cmcu.edu.vn',
    'BIT240002@@st.cmcu.edu.vn',
    'BIT240002@st.cmcu.edu.vn@x',
  ])('"%s" sai dạng email', (email) => {
    expect(validateEmail(email, id)).toEqual({ key: 'emailInvalid' });
  });

  it.each([
    'BIT240002@gmail.com',
    'BIT240002@cmcu.edu.vn',
    'BIT240002@st.cmcu.edu.vn.com',
    'BIT240002@st.cmcu.edu',
  ])('"%s" sai đuôi email', (email) => {
    expect(validateEmail(email, id)).toEqual({ key: 'emailDomain' });
  });

  it.each(['abc@st.cmcu.edu.vn', 'BIT24@st.cmcu.edu.vn', 'bit240002@st.cmcu.edu.vn', 'BIT210002@st.cmcu.edu.vn'])(
    '"%s" có phần trước @ không đúng định dạng MSSV',
    (email) => {
      expect(validateEmail(email, id)).toEqual({ key: 'emailStudentId' });
    },
  );

  it('báo khi phần trước @ khác MSSV đã nhập, kèm email đúng để gợi ý', () => {
    expect(validateEmail('BIT240003@st.cmcu.edu.vn', id)).toEqual({
      key: 'emailMismatch',
      params: { email: 'BIT240002@st.cmcu.edu.vn' },
    });
  });

  it('so khớp MSSV không phân biệt hoa thường', () => {
    expect(validateEmail('BIT240002@st.cmcu.edu.vn', 'Bit240002')).toBeUndefined();
  });

  // MSSV chưa hợp lệ thì lỗi nằm ở ô MSSV, ô email không báo thêm lỗi "khác MSSV"
  it.each(['', 'BIT2400', 'XYZ'])('không báo lệch MSSV khi MSSV "%s" chưa hợp lệ', (badId) => {
    expect(validateEmail('BIT240002@st.cmcu.edu.vn', badId)).toBeUndefined();
  });
});

describe('validateStudentForm / hasErrors', () => {
  it('không có lỗi khi cả ba ô đúng', () => {
    const errors = validateStudentForm({
      fullName: 'Phạm Duy An',
      studentId: 'BIT240002',
      email: 'BIT240002@st.cmcu.edu.vn',
    });
    expect(errors).toEqual({});
    expect(hasErrors(errors)).toBe(false);
  });

  it('báo lỗi đúng từng ô', () => {
    const errors = validateStudentForm({
      fullName: '',
      studentId: 'BIT270002',
      email: 'BIT240002@gmail.com',
    });
    expect(errors).toEqual({
      fullName: { key: 'fullNameRequired' },
      studentId: { key: 'studentIdYear' },
      email: { key: 'emailDomain' },
    });
    expect(hasErrors(errors)).toBe(true);
  });
});
