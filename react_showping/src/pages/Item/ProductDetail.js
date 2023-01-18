import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addcart } from '../../store';

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  const propsParam = useParams();
  const id = propsParam.id;
  const [itemdata, setitemdata] = useState({});

  useEffect(() => {
    axios
      .get(
        'http://portpolio-env.eba-cbjqfceh.ap-northeast-2.elasticbeanstalk.com/iteminfo2/' +
          id,
      )
      .then((result) => {
        setitemdata(result.data);
      });
  }, []);

  const buycart = () => {
    props.history.push('/Cart');
  };

  return (
    <div className="detail_layout">
      <div className="detail_layout2">
        <div>
          <img className="detail_img" src={itemdata.filepath} />
        </div>

        <div className="detail_item">
          <div className="detail_font">
            <div>{itemdata.itemname}</div>
            <div>{itemdata.itemdetail}</div>
            <div>{itemdata.itemprice}원</div>
          </div>
          <div className="detail_button">
            <Button variant="dark" onClick={buycart}>
              구매하러 가기
            </Button>

            <Button
              variant="light"
              onClick={() => {
                dispatch(addcart(itemdata));
              }}
            >
              장바구니 추가
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
