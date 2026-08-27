import ProfileMenu from "./ProfileMenu";

export default function Topbar() {
  return (
    <header className="w-full h-16 border-b border-pesa-slate/15 bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-pesa-green flex items-center justify-center text-white font-bold text-sm">
          P
        </div>
        <span className="font-semibold text-pesa-charcoal">PesaPro</span>
      </div>

      <ProfileMenu />
    </header>
  );
}