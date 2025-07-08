import { useSearchParams } from 'react-router';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination';

type PageInfoProps = {
  totalPages: number;
};

export default function PageInfo({ totalPages }: PageInfoProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);
  const onClick = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams, { preventScrollReset: true });
  };
  return (
    <div>
      <Pagination>
        <PaginationContent>
          {/* 처음으로 이동 */}
          {page > 1 && (
            <PaginationItem>
              <PaginationLink
                href="?page=1"
                onClick={event => {
                  event.preventDefault();
                  onClick(1);
                }}
              >
                처음
              </PaginationLink>
            </PaginationItem>
          )}
          {page === 1 ? null : (
            <>
              <PaginationItem>
                <PaginationLink
                  href={`?page=${page - 1}`}
                  onClick={event => {
                    event.preventDefault();
                    onClick(page - 1);
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
              onClick={event => {
                event.preventDefault();
                onClick(page);
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
                  onClick={event => {
                    event.preventDefault();
                    onClick(page + 1);
                  }}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
              {page + 1 === totalPages ? null : (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}
          {/* 마지막으로 이동 */}
          {page < totalPages && (
            <PaginationItem>
              <PaginationLink
                href={`?page=${totalPages}`}
                onClick={event => {
                  event.preventDefault();
                  onClick(totalPages);
                }}
              >
                마지막
              </PaginationLink>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
