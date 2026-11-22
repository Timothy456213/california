import Link from "next/link";
export default function NotFound() {
  return (
    <section className="wrap center">
      <h1>404</h1>
      <p>This page could not be found.</p>
      <Link className="btn" href="/">Back to home</Link>
    </section>
  );
}
