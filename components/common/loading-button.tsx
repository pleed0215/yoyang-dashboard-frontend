import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

export type LoadingButtonProps = {
  loading: boolean;
  loadingText?: string;
} & React.ComponentProps<'button'>;
export default function LoadingButton({
  loading = false,
  loadingText = '작업 요청 중입니다.',
  ...props
}: LoadingButtonProps) {
  return (
    <>
      {loading && (
        <Button disabled>
          <Loader2 />
          {loadingText}
        </Button>
      )}
      {!loading && <Button {...props} />}
    </>
  );
}
