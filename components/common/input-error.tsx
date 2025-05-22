export default function InputError({
  errors,
}: {
  errors: string[] | undefined;
}) {
  if (!errors) return null;
  return (
    <div className={'text-error text-left text-sm'}>
      {errors.map((error, index) => (
        <span key={`${error}-${index}`}>{error}</span>
      ))}
    </div>
  );
}
