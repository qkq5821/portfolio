import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Item from '../../Components/Item';

const Home = () => {
  const [items, setitems] = useState([]);
  const [count, setcount] = useState(0);
  const [add, setadd] = useState(2);

  useEffect(() => {
    axios
      .get(
        'http://portpolio-env.eba-cbjqfceh.ap-northeast-2.elasticbeanstalk.com/itemlist',
      )
      .then((result) => {
        setitems(result.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        'http://portpolio-env.eba-cbjqfceh.ap-northeast-2.elasticbeanstalk.com/allitemlist',
      )
      .then((result) => {
        setcount(result.data.length);
      });
  }, []);

  const additem = () => {
    setadd(add + 1);
    axios
      .get(
        'http://portpolio-env.eba-cbjqfceh.ap-northeast-2.elasticbeanstalk.com/itemadd/' +
          add,
      )
      .then((result) => {
        setitems(result.data);
      });
  };

  return (
    <div>
      <div className="home_itemlist">
        {items.map((a, i) => {
          return (
            <div key={i} className="home_itemlist_item">
              <Item items={items[i]}></Item>
            </div>
          );
        })}
      </div>

      {count > items.length ? (
        <div className="home_add_item ">
          <Button variant="dark" onClick={additem}>
            더보기
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
