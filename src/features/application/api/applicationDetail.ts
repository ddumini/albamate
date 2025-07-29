import { cookies } from 'next/headers';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://fe-project-albaform.vercel.app';
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID || '15-3';
const baseURL = `${API_URL}${TEAM_ID}/`;

export async function fetchAlbaformData(formId: string) {
  const response = await fetch(`${baseURL}forms/${formId}`);

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error('알바폼 조회 실패');
  }

  return response.json();
}

export async function fetchApplicationData(formId: string) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('authjs.session-token')?.value;

  const response = await fetch(`${baseURL}forms/${formId}/my-application`, {
    headers: {
      ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('에러 응답:', errorText);

    if (response.status === 401) return null;
    if (response.status === 404) return null;

    throw new Error(`지원서 조회 실패: ${response.status}`);
  }

  return response.json();
}

export async function fetchApplicationById(applicationId: string) {
  const response = await fetch(`${baseURL}applications/${applicationId}`);

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error('지원서 조회 실패');
  }

  return response.json();
}
