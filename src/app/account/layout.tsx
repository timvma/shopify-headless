import Link from "next/link";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-2">
      <aside>
        <nav className="grid gap-1">
          <Link href="/account/orders">Orders</Link>
          <Link href="/account/addresses">Addresses</Link>
          <Link href="/account/profile">Profile</Link>
          <Link href="/logout">Logout</Link>
        </nav>
      </aside>
      <div>{children}</div>
    </div>
  );
}
