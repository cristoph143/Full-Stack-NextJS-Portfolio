export default function Main({ children }) {
  return (
    <div className="min-h-screen overflow-y-auto">
      <main className="flex flex-col flex-1 gap-6">{children}</main>
    </div>
  );
}
