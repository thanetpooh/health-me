import React from 'react';

const MealCard = () => {
  return (
    <>
      <div className="card bg-base-100 shadow-sm">
        <figure>
          <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Hainanese Chicken Rice</h2>
          <p>likes: 3</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">High Protien</div>
            <div className="badge badge-outline">Breakfast</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MealCard;
