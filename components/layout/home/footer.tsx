export default function Footer() {
  return (
    <footer className="fixed bottom-0 z-10 w-full bg-white border-t border-gray-300">
      <div className="max-w-4xl px-4 py-4 mx-auto text-center">
        <p className="text-sm">
          Powered by{" "}
          <a
            href="https://supabase.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            Supabase
          </a>
        </p>
      </div>
    </footer>
  );
}
