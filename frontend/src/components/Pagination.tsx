import React from 'react';

const Pagination = () => {
  return (
    <>
      <section>
        <div className="join grid grid-cols-2">
          <button className="join-item btn btn-outline">Previous page</button>
          <button className="join-item btn btn-outline">Next</button>
        </div>
        <div className="join">
          <button className="join-item btn">1</button>
          <button className="join-item btn btn-active">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">4</button>
        </div>
        <p>Result per page 5</p>
        <p>1-5 of 1,250</p>
      </section>
    </>
  );
};

export default Pagination;
