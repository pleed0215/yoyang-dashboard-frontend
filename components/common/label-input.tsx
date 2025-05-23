// 파일: src/components/LabelInput.tsx
'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/common/input-error';

export interface LabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * 화면에 표시할 레이블 텍스트
   */
  label: string;
  /**
   * input의 id 및 label의 htmlFor 속성
   */
  /**
   * 오류 메시지 배열
   */
  errors?: string[];
}

const LabelInput = React.forwardRef<HTMLInputElement, LabelInputProps>(
  ({ label, id, errors, className, ...inputProps }, ref) => (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-foreground">
        {label}
      </Label>
      <Input
        id={id}
        className={`focus:!ring-0 ${className ?? ''}`}
        ref={ref}
        {...inputProps}
      />
      <InputError errors={errors} />
    </div>
  )
);

LabelInput.displayName = 'LabelInput';

export default LabelInput;
