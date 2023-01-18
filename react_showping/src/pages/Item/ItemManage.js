import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const ItemManage = (props) => {
  const [items, setitems] = useState([]);

  useEffect(() => {
    axios
      .get(
        'http://portpolio-env.eba-cbjqfceh.ap-northeast-2.elasticbeanstalk.com/allitemlist',
      )
      .then((result) => {
        let copyitems = result.data;

        if (copyitems.length !== items.length) {
          setitems(copyitems);
        }
      });
  }, [items]);

  const deleteItem = (itemid) => {
    axios
      .delete(
        'http://portpolio-env.eba-cbjqfceh.ap-northeast-2.elasticbeanstalk.com/deleteitem/' +
          itemid,
      )
      .then(() => {
        setitems([...items]);
      });
  };

  const updateBook = (itemid) => {
    props.history.push('/ItemManage/updateForm/' + itemid);
  };

  const saveBook = () => {
    props.history.push('/ItemManage/ItemSaveForm');
  };

  return (
    <div>
      <div className="itemmanage_layout">
        <div className="itemmanage_layout2">
          <Table>
            <thead className="itemmanage_thead">
              <tr>
                <th>상품이미지</th>
                <th>상품명</th>
                <th>상품설명</th>
                <th>가격</th>
              </tr>
            </thead>
            {items.map((item, i) => (
              <tbody key={item.id} className="itemmanage_tbody">
                <tr>
                  <td>
                    <img className="itemmanage_img" src={item.filepath}></img>
                  </td>
                  <td>{item.itemname}</td>
                  <td>{item.itemdetail}</td>
                  <td>{item.itemprice}원</td>

                  <td>
                    <p>
                      <Button
                        variant="dark"
                        onClick={() => {
                          updateBook(item.itemid);
                        }}
                      >
                        수정하기
                      </Button>{' '}
                    </p>
                    <p>
                      <Button
                        variant="light"
                        onClick={() => {
                          deleteItem(item.itemid);
                        }}
                      >
                        삭제하기
                      </Button>
                    </p>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </div>
      <br></br>
      <div className="d-grid gap-3">
        <Button
          variant="dark"
          size="lg"
          onClick={() => {
            return saveBook();
          }}
        >
          상품등록
        </Button>
      </div>
    </div>
  );
};

export default ItemManage;
