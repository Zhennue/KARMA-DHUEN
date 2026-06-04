import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // 1. Check user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 2. If no user → redirect to login
  if (!user) {
    redirect("/login");
  }

  // 3. If logged in → fetch data
  const { data: todos } = await supabase.from("todos").select();

  return (
    <ul>
      {todos?.map((todo) => (
        <li key={todo.id}>{todo.id}</li>
      ))}
    </ul>
  );
}