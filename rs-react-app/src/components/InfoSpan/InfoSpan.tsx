interface InfoSpanProps {
  text: string;
}
export default function InfoSpan({ text }: InfoSpanProps) {
  return (
    <span className="inline-block bg-purple-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      {text}
    </span>
  );
}
