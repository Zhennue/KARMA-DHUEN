import { LoginForm } from "./components/login-form";

export default function Page() {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-[#0a0908] p-6 md:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_30%),radial-gradient(circle_at_20%_80%,_rgba(255,255,255,0.08),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.1),_transparent_24%),linear-gradient(180deg,_#14110f_0%,_#090807_55%,_#050505_100%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/5 to-transparent" />
      <div className="relative w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
