import React, { useState } from 'react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Calendar } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Calendar as CalendarComponent } from '~/components/ui/calendar';
import { DateTime } from 'luxon';

interface DateInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export default function DateInput({ id, value, onChange, placeholder = "YYYY-MM-DD", label }: DateInputProps) {
  // 날짜에서 시간 제거하고 luxon으로 파싱
  const formatDateOnly = (dateString: string | null) => {
    if (!dateString) return '';
    return dateString.split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value ? DateTime.fromISO(formatDateOnly(value)).toJSDate() : undefined
  );

  const formatDateInput = (value: string) => {
    // 숫자만 입력받고 yyyy-mm-dd 형식으로 포맷팅
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 4) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    } else {
      const year = numbers.slice(0, 4);
      const month = numbers.slice(4, 6);
      const day = numbers.slice(6, 8);
      
      // 기본 포맷팅은 항상 수행하고, 유효성 검사는 Zod에서 처리
      return `${year}-${month}-${day}`;
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    
    if (date) {
      const luxonDate = DateTime.fromJSDate(date);
      onChange(luxonDate.toFormat('yyyy-MM-dd'));
    } else {
      onChange('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatDateInput(e.target.value);
    onChange(formattedValue);
  };

  return (
    <div className="flex space-x-2">
      <Input
        id={id}
        value={formatDateOnly(value)}
        onChange={handleInputChange}
        placeholder={placeholder}
        maxLength={10}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="cursor-pointer">
            <Calendar className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <CalendarComponent
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
} 