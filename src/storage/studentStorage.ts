import AsyncStorage from '@react-native-async-storage/async-storage';
import { Directory, File, Paths } from 'expo-file-system';

import type { Student, StudentInput } from '@/types';

// Cả danh sách sinh viên lưu thành một chuỗi JSON dưới khóa này
const STORAGE_KEY = 'students';

// Ảnh chọn từ máy được chép vào đây vì thư mục cache của ImagePicker có thể bị hệ điều hành dọn mất.
// Tạo khi cần (không tạo ngay lúc nạp file) để bản web, vốn không có hệ thống file này, vẫn chạy được
const getAvatarDir = () => new Directory(Paths.document, 'avatars');

export async function getStudents(): Promise<Student[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as Student[]) : [];
}

export async function getStudent(id: string): Promise<Student | undefined> {
  const students = await getStudents();
  return students.find((student) => student.id === id);
}

async function saveStudents(students: Student[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

// Link ảnh giữ nguyên; ảnh vừa chọn từ máy (file trong cache) được chép sang thư mục của app
async function keepAvatar(uri: string): Promise<string> {
  if (!uri.startsWith('file:')) return uri;
  const avatarDir = getAvatarDir();
  if (uri.startsWith(avatarDir.uri)) return uri;

  avatarDir.create({ idempotent: true });
  const source = new File(uri);
  const copy = new File(avatarDir, `${Date.now()}${source.extension}`);
  await source.copy(copy);
  return copy.uri;
}

// Chỉ xóa file nằm trong thư mục avatars của app, không đụng tới link hay file ở nơi khác
function removeAvatar(uri: string) {
  if (!uri.startsWith('file:') || !uri.startsWith(getAvatarDir().uri)) return;
  const file = new File(uri);
  if (file.exists) file.delete();
}

export async function addStudent(input: StudentInput): Promise<void> {
  const students = await getStudents();
  const avatar = await keepAvatar(input.avatar);
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  await saveStudents([...students, { ...input, avatar, id }]);
}

export async function updateStudent(id: string, input: StudentInput): Promise<void> {
  const students = await getStudents();
  const current = students.find((student) => student.id === id);
  if (!current) return;

  const avatar = await keepAvatar(input.avatar);
  await saveStudents(students.map((student) => (student.id === id ? { ...input, avatar, id } : student)));
  // Đổi sang ảnh khác thì ảnh cũ trong máy không còn dùng nữa
  if (avatar !== current.avatar) removeAvatar(current.avatar);
}

export async function deleteStudent(id: string): Promise<void> {
  const students = await getStudents();
  const current = students.find((student) => student.id === id);
  await saveStudents(students.filter((student) => student.id !== id));
  if (current) removeAvatar(current.avatar);
}
