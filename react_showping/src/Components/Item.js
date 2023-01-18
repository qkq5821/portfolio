import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

function Item(props) {
  const items = props.items;

  return (
    <div className="item_layout">
      <div className="d-flex justify-content-around">
        <Card style={{ width: '18rem', height: '550px', margin: '10px' }}>
          <img className="item_img" variant="top" src={items.filepath} />
          <Card.Title style={{ fontSize: '24px' }}>{items.itemname}</Card.Title>
          <br></br>
          <Card.Title style={{ fontSize: '24px' }}>
            {items.itemprice}원
          </Card.Title>
          <Link to={'/productdetail/' + items.itemid} className="btn btn-dark ">
            구매하기
          </Link>{' '}
        </Card>
      </div>
    </div>
  );
}

export default Item;
