'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginSchema } from '@/lib/schemas';
import { useToast } from '@/components/ui/toast-provider';

type FieldErrors = Partial<Record<'email' | 'password', string>>;

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const result = loginSchema.safeParse(values);
    if (!result.success) {
      const nextErrors: FieldErrors = {};
      result.error.issues.forEach((issue) => { nextErrors[issue.path[0] as keyof FieldErrors] = issue.message; });
      setErrors(nextErrors);
      showToast('Check the highlighted login details.', 'error');
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    window.setTimeout(() => { showToast('Welcome back. Opening your command center.', 'success'); router.push('/dashboard'); }, 350);
  }

  return <main className="login-page"><section className="login-intro"><div className="brand"><span className="helmet" aria-hidden="true"/><div><strong>Retell AI</strong><small>Construction calls</small></div></div><div><p className="eyebrow">Admin operations</p><h1>Every call, booking, and assignment—under one roof.</h1><p className="muted">A focused workspace for reviewing AI calls, managing bookings, and manually assigning the right technician.</p></div><p className="login-foot">Single-admin access · Customer and technician records stay protected.</p></section><section className="login-card"><div><p className="eyebrow">Secure sign-in</p><h2>Sign in to continue</h2><p className="muted">Use your admin email and password.</p></div><form onSubmit={signIn} noValidate><label htmlFor="email">Admin email</label><input id="email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="you@company.com"/><p id="email-error" className="field-error">{errors.email}</p><label htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="current-password" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'password-error' : undefined} placeholder="At least 8 characters"/><p id="password-error" className="field-error">{errors.password}</p><button className="button primary wide" disabled={isSubmitting}>{isSubmitting ? 'Signing in…' : 'Sign in'}</button></form><p className="form-note">No public registration. Ask the business owner if you need access.</p></section></main>;
}
