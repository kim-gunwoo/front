import styled from "@emotion/styled";
import OrderType from "components/OrderType";
import { flexColumn } from "mixins/styles";
import { useNavigate } from "react-router-dom";

export default function OrderTypePage() {
  const navigate = useNavigate();
  const handleDeliveryBtnClick = () => {
    navigate("/food-type");
  };
  const handlePickupBtnClick = () => {
    navigate("/food-type");
  };

  return (
    <Wrapper>
      <OrderType
        handleOrderTypeClick={handleDeliveryBtnClick}
        icon="ic-delivery.png"
        orderType="delivery"
      />
      <OrderType
        handleOrderTypeClick={handlePickupBtnClick}
        icon="ic-pickup.png"
        orderType="pickup"
      />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  ${flexColumn};
  margin-top: 64px;
  padding: 24px 16px;
  row-gap: 16px;
`;
