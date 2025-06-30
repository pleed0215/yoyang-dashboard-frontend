import React from 'react';
import { Input } from '~/components/ui/input';

interface PhoneInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function PhoneInput({ id, value, onChange, placeholder = "010-1234-5678" }: PhoneInputProps) {
  const formatPhoneInput = (value: string) => {
    // 숫자만 입력받고 010-1234-5678 형식으로 포맷팅
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneInput(e.target.value);
    onChange(formattedValue);
  };

  return (
    <Input
      id={id}
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      maxLength={13}
    />
  );
} 