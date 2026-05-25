interface InfoSpanProps {
  text: string;
}
export default function InfoSpan({ text }: InfoSpanProps) {
  return (
    <span className="inline-block bg-purple-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 transition-colors duration-300 dark:bg-purple-900 dark:text-teal-100">
      {text}
    </span>
  );
}
