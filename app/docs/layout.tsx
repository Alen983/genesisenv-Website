export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-4xl mx-auto prose prose-invert prose-headings:text-white prose-p:text-gray-300 prose-a:text-accent prose-code:text-accent">
      {children}
    </div>
  )
}
