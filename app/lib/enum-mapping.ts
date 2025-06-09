import { CommonState, UserRole } from '~/graphql/types';

export const stateBadgeVariant: Record<
  CommonState,
  'default' | 'warning' | 'secondary' | 'destructive'
> = {
  [CommonState.Active]: 'default',
  [CommonState.Pending]: 'warning',
  [CommonState.Denied]: 'destructive',
  [CommonState.Inactive]: 'secondary',
  [CommonState.Accepted]: 'default',
  [CommonState.PendingDeletion]: 'destructive',
};

export const stateLabel: Record<CommonState, string> = {
  [CommonState.Active]: '활성',
  [CommonState.Pending]: '대기중',
  [CommonState.Denied]: '거절됨',
  [CommonState.Inactive]: '비활성',
  [CommonState.Accepted]: '승인됨',
  [CommonState.PendingDeletion]: '삭제대기중',
};

export const roleLabel: Record<UserRole, string> = {
  [UserRole.Super]: '슈퍼관리자',
  [UserRole.Admin]: '관리자',
  [UserRole.Staff]: '스태프',
};
