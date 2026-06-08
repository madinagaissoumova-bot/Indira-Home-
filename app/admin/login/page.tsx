import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminAuth";
import { ru } from "@/lib/i18n/ru";
import { LoginForm } from "./LoginForm";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin");

  return (
    <main className="page admin-page">
      <div className="admin-login-shell">
        <section className="admin-login-intro">
          <span className="eyebrow">{ru.admin.login.eyebrow}</span>
          <h1>{ru.admin.login.title}</h1>
          <p>{ru.admin.login.text}</p>
        </section>

        <div className="admin-login-form-wrap">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
