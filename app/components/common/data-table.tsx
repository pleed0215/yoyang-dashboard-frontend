import * as React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '~/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '~/components/ui/pagination';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { Button } from '~/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// 정렬 가능한 컬럼 헤더 생성 함수
function SortableHeader({ column, title }: { column: any; title: string }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="px-1 h-8"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      <span>{title}</span>
      <ArrowUpDown className="ml-1 h-3 w-3" />
    </Button>
  );
}

export function DataTable<T>({ columns, data, page, totalPages, onPageChange }: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    state: { sorting, pagination: { pageIndex: page - 1, pageSize: 10 } },
    onSortingChange: setSorting,
    onPaginationChange: up => {
      if (typeof up === 'function') {
        const next = up({ pageIndex: page - 1, pageSize: 10 });
        onPageChange(next.pageIndex + 1);
      } else {
        onPageChange(up.pageIndex + 1);
      }
    },
  });

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} className="text-center">
                  {header.isPlaceholder
                    ? null
                    : // 액션 컬럼은 정렬 버튼 없이, 나머지는 정렬 버튼
                      header.column.id === 'actions'
                        ? flexRender(header.column.columnDef.header, header.getContext()) as React.ReactNode
                        : (
                          <SortableHeader column={header.column} title={flexRender(header.column.columnDef.header, header.getContext()) as string} />
                        )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell className="text-center" colSpan={columns.length}>데이터 없음</TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className="text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext()) as React.ReactNode}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {/* PageInfo 스타일 Pagination */}
      <Pagination>
        <PaginationContent>
          {page === 1 ? null : (
            <>
              <PaginationItem>
                <PaginationLink
                  href="?page=1"
                  onClick={e => {
                    e.preventDefault();
                    onPageChange(1);
                  }}
                >
                  처음
                </PaginationLink>
              </PaginationItem>
              {page > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  href={`?page=${page - 1}`}
                  onClick={e => {
                    e.preventDefault();
                    onPageChange(page - 1);
                  }}
                >
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationLink
              href={`?page=${page}`}
              onClick={e => {
                e.preventDefault();
                onPageChange(page);
              }}
              isActive
            >
              {page}
            </PaginationLink>
          </PaginationItem>
          {page === totalPages ? null : (
            <>
              <PaginationItem>
                <PaginationLink
                  href={`?page=${page + 1}`}
                  onClick={e => {
                    e.preventDefault();
                    onPageChange(page + 1);
                  }}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
              {page < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  href={`?page=${totalPages}`}
                  onClick={e => {
                    e.preventDefault();
                    onPageChange(totalPages);
                  }}
                >
                  마지막
                </PaginationLink>
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
} 