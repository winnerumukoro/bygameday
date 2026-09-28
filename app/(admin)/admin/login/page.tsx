import { redirect } from "next/navigation";

// Staff sign in through the shared login page; the admin layout checks the role.
export default function AdminLoginPage() {
  redirect("/login?next=/admin");
}
