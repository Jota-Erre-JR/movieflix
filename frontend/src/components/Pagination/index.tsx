import { ReactComponent as ArrowImage } from 'assets/images/arrow.svg';
import './styles.css';
import ReactPaginate from 'react-paginate';

type Props = {
  forcePage?: number;
  pageCount: number;
  pageRange: number;
  onChange?: (pageNumber: number) => void;
};

const Pagination = ({ forcePage, pageCount, pageRange, onChange }: Props) => {
  return (
    <ReactPaginate
      forcePage={forcePage}
      pageCount={pageCount}
      pageRangeDisplayed={pageRange}
      marginPagesDisplayed={1}
      containerClassName="pagination-container"
      pageLinkClassName="pagination-item"
      breakClassName="pagination-item"
      previousClassName="arrow-previous"
      nextClassName="arrow-next"
      activeLinkClassName="pagination-link-active"
      disabledClassName="arrow-inactive"
      onPageChange={(items) => (onChange ? onChange(items.selected) : {})}
      previousLabel={
        <div className="pagination-arrow-container">
          <ArrowImage />
        </div>
      }
      nextLabel={
        <div className="pagination-arrow-container">
          <ArrowImage />
        </div>
      }
    />
  );
};

export default Pagination;
