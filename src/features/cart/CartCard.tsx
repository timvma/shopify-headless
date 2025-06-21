import React from "react";

const CartCard = React.memo(({ line }) => {
  return (
    <div>
      <div>
        {line?.merchandise?.title}
        {line.quantity}
      </div>
    </div>
  );
});

export default CartCard;
