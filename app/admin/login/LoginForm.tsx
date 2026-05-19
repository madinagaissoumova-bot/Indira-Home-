"use client";

import { useActionState } from "react";
import { ru } from "@/lib/i18n/ru";
import { loginAdmin, type AdminActionState as LoginState } from "../actions";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(loginAdmin, {});

  return (
    <form action={formAction} className="form-panel">
      {state.error ? <p className="form-error">{state.error}</p> : null}

      <div className="field">
        <label htmlFor="username">{ru.admin.login.username}</label>
        <input
          autoComplete="username"
          className="input"
          id="username"
          name="username"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="password">{ru.admin.login.password}</label>
        <input
          autoComplete="current-password"
          className="input"
          id="password"
          name="password"
          required
          type="password"
        />
      </div>

      <button className="button" disabled={isPending} type="submit">
        {ru.admin.login.submit}
      </button>
    </form>
  );
}
