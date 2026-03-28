import React from 'react';

const Pagination = () => {
  return (
    <>
      <section className="flex flex-col gap-4 items-center text-center">
        <div className="join grid grid-cols-2 w-48">
          <button className="join-item btn btn-outline">Previous</button>
          <button className="join-item btn btn-outline">Next</button>
        </div>
        <div className="join">
          <button className="join-item btn">1</button>
          <button className="join-item btn btn-active">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">4</button>
        </div>
        <div>
          <p>Result per page 5</p>
          <p>1-5 of 1,250</p>
        </div>
      </section>
    </>
  );
};

export default Pagination;
