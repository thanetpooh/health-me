import React from 'react';

const MealCard = () => {
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Hainanese Chicken Rice</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ducimus incidunt quibusdam perspiciatis. Fuga
            numquam neque vitae vero recusandae architecto!
          </p>
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
