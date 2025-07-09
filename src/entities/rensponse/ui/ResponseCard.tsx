interface Props {
  response: AIResponse;
}

export const ResponseItem = ({ response }: Props) => (
  <div className="p-4 border rounded shadow-sm bg-white">
    <h3 className="font-semibold">{response.jobDescription?.slice(0, 50) || 'No Title'}</h3>
    <p className="text-sm text-gray-500">{response.jobLink}</p>
  </div>
);
