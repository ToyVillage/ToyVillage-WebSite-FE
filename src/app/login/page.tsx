'use client';

import { FormEvent, JSX, useId, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { login } from '@/lib/api/auth';
import { type ApiErrorResponse } from '@/lib/api/auth/response';

const formFields = [
  {
    key: 'email',
    label: '아이디',
    placeholder: '아이디 입력',
    type: 'text',
    autoComplete: 'email',
  },
  {
    key: 'password',
    label: '비밀번호',
    placeholder: '비밀번호 입력',
    type: 'password',
    autoComplete: 'current-password',
  },
] as const;

export default function LoginPage(): JSX.Element {
  const formId = useId();
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: ({ access_token }, { email }) => {
      document.cookie = `access_token=${access_token}; path=/; max-age=${60 * 60}; SameSite=Lax`;
      localStorage.setItem("user_email", email);
      router.push('/admin');
    },
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const errorMessage = (() => {
    if (!error) return null;
    const { status, data } = (error as AxiosError<ApiErrorResponse>).response ?? {};
    if (status === 401) return data?.message ?? '아이디 또는 비밀번호가 일치하지 않습니다.';
    if (status === 400) return data?.message ?? '잘못된 요청입니다.';
    return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  })();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <main className="flex h-[437px] bg-white w-[600px] flex-col overflow-hidden rounded-2xl shadow-xl">
        <h1 className="mt-12 text-center text-xl font-bold tracking-tight text-black">
          ADMIN 로그인
        </h1>

        <form
          className="flex flex-col px-[70px]"
          aria-label="관리자 로그인 폼"
          noValidate
          onSubmit={handleSubmit}
        >
          {formFields.map((field, index) => (
            <div key={field.key} className={index === 0 ? 'mt-8' : 'mt-6'}>
              <label
                htmlFor={`${formId}-${field.key}`}
                className="mb-2 block text-body-2 font-medium text-black"
              >
                {field.label}
              </label>
              <div className="relative flex h-[43px] w-full items-center overflow-hidden rounded-xl bg-neutral-200">
                <input
                  id={`${formId}-${field.key}`}
                  name={field.key}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  aria-label={field.label}
                  value={formData[field.key]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }
                  className="w-full bg-transparent text-sm text-black outline-none placeholder:text-[#a4a4a4] px-4 py-3"
                  placeholder={field.placeholder}
                  required
                />
              </div>
            </div>
          ))}

          {errorMessage && <p className="mt-3 text-center text-xs text-red-500">{errorMessage}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="mt-8 flex h-[46px] w-full items-center justify-center rounded-lg bg-[#2a2a2a] transition-colors hover:bg-black active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="로그인"
          >
            <span className="text-sm font-bold text-white">
              {isPending ? '로그인 중...' : '로그인'}
            </span>
          </button>
        </form>
      </main>
    </div>
  );
}
