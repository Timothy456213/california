import Link from "next/link";
export default function AccessDenied({ need }: { need: string }) {
  return (
    <section className="wrap center">
      <h1>Access denied</h1>
      <div className="card"><p>Your Discord roles do not allow access to {need}. If you think this is a mistake, ask a member of the Directive Team.</p>
        <Link className="btn" href="/dashboard">Back to my dashboard</Link></div>
    </section>
  );
}
